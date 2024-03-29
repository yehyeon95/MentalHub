import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSinglePost, fetchPostDelete } from '../util/fetchBoard';
import { formatDate } from '../util/util';

function SingleViewComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [postData, setPostData] = useState('');
    useEffect(() => {
        getSingleView();
    }, []);
    const getSingleView = async (callback) => {
        let path = await fetchSinglePost(id).then((data) => {
            setPostData(data.contentResponseDto);
            //console.log(postData.memberId == sessionStorage.getItem('memberId'));
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

    const formattedModDate = formatDate(postData.modifiedAt);
    const formattedCreDate = formatDate(postData.createdAt);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-4">{postData.title}</h2>
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <p>작성자 : {postData.username}</p>
                        <p>
                            {formattedModDate ? '수정 시간' : '생성 시간'}: {formattedModDate || formattedCreDate}
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
                    {postData.memberId == sessionStorage.getItem('memberId') && (
                        <div className="mb-4">
                            <button type="button" className="btn btn-primary" onClick={handleGoUpdate}>
                                수정하기
                            </button>
                            <button type="button" className="btn btn-secondary mx-4" onClick={handleGoDelete}>
                                삭제하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleViewComponent;
