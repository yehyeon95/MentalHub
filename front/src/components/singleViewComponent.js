import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSinglePost, fetchSinglePostLogin, fetchPostDelete } from '../util/fetchBoard';
import { fetchUpVote, fetchDownVote } from '../util/fetchVote';
import { formatDate } from '../util/util';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import Comment from './comment';
import CommentWrite from './commentWrite';

function SingleViewComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [postData, setPostData] = useState('');
    const [contentId, setContentId] = useState('');
    const [commentData, setCommentData] = useState([]);
    const [voteBtn, setVoteBtn] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('memberId')) {
            getSingleView();
        } else {
            getSingleViewLogin();
        }
    }, []);

    const getSingleView = async (callback) => {
        let path = await fetchSinglePost(id).then((data) => {
            setPostData(data.contentResponseDto);
            //console.log(data.commentsList);
            setContentId(data.contentResponseDto.contentId);
            setCommentData(data.commentsList);
            //console.log(postData.memberId == sessionStorage.getItem('memberId'));
            console.log(data.contentResponseDto);
        });
    };

    const getSingleViewLogin = async (callback) => {
        let path = await fetchSinglePostLogin(id).then((data) => {
            setPostData(data.contentResponseDto);
            setContentId(data.contentResponseDto.contentId);
            setCommentData(data.commentsList);
            //console.log(data.contentResponseDto);
        });
    };

    const handleGoUpdate = () => {
        navigate(`/contents/edit/${id}`);
    };

    const handleGoDelete = async (callback) => {
        let path = await fetchPostDelete(id).then((data) => {
            console.log('응답확인', data); //이렇게 받아야 object가 보임
            alert('게시글이 삭제되었습니다.');
            navigate('/');
        });
    };
    const modi = postData.modified;
    const formattedModDate = formatDate(postData.modifiedAt);
    const formattedCreDate = formatDate(postData.createdAt);

    const handleUpVote = async (callback) => {
        if (!sessionStorage.getItem('memberId')) {
            alert('로그인 후에 추천해주세요!');
            return;
        }
        const data = {
            contentId: id,
        };
        let path = await fetchUpVote(JSON.stringify(data)).then((data) => {
            console.log('추천', data);
            alert('추천되었습니다.');
            window.location.reload();
        });
    };
    const handleDownVote = async (callback) => {
        if (!sessionStorage.getItem('memberId')) {
            alert('로그인 후에 이용해주세요!');
            return;
        }
        const data = {
            contentId: id,
        };
        let path = await fetchDownVote(JSON.stringify(data)).then((data) => {
            console.log('비추천', data);
            alert('추천이해제되었습니다.');
            window.location.reload();
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-4">{postData.title}</h2>
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <p>작성자 : {postData.nickname}</p>
                        <p>
                            {modi ? '수정 시간' : '생성 시간'}: {formattedModDate || formattedCreDate}
                        </p>
                        <p>조회수 : {postData.views}</p>
                        <p>
                            글종류 :
                            {postData.type === 'post'
                                ? '일반게시글'
                                : postData.type === 'info'
                                ? '정보게시글'
                                : postData.type === 'notice'
                                ? '공지게시글'
                                : ''}
                        </p>
                        {postData.memberId == sessionStorage.getItem('memberId') && (
                            <div className="mb-4">
                                <button type="button" className="btn btn-link" onClick={handleGoUpdate}>
                                    수정하기
                                </button>
                                <button type="button" className="btn btn-link mx-4" onClick={handleGoDelete}>
                                    삭제하기
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        {postData.body && (
                            <Viewer
                                initialValue={postData.body}
                                viewer="true"
                                height="500px"
                                previewStyle="vertical"
                                usageStatistics={false}
                            />
                        )}
                    </div>
                    <div className="mb-4 d-flex justify-content-center" style={{ color: '#0d6efd' }}>
                        <div className="mb-1 mx-4" style={{ color: 'black' }}>
                            추천수 : {postData.contentVotesCnt}
                        </div>
                        {!postData.voted ? (
                            <BsHandThumbsUp style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={handleUpVote} />
                        ) : (
                            <BsHandThumbsUpFill
                                style={{ fontSize: '2rem', cursor: 'pointer' }}
                                onClick={handleDownVote}
                            />
                        )}
                    </div>
                    <Comment commentData={commentData} />
                    {sessionStorage.getItem('memberId') && <CommentWrite contentId={contentId} />}
                </div>
            </div>
        </div>
    );
}

export default SingleViewComponent;
