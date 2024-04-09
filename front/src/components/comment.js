import { useState, useEffect } from 'react';
import { formatDate } from '../util/util';
import { fetchCommentDelete, fetchCommentEdit } from '../util/fetchComment';
import { fetchUpVoteComment, fetchDownVoteComment } from '../util/fetchVote';
import { Modal, Button } from 'react-bootstrap';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import Reply from './reply';
import ReplyWrite from './replyWrite';
function Comment({ commentData }) {
    const [editIndex, setEditIndex] = useState(null); // 수정 중인 댓글의 인덱스를 저장하는 상태
    const [editComment, setEditComment] = useState('');
    const [showDelModal, setShowDelModal] = useState(false);

    // useEffect(() => {
    //     console.log(commentData);
    //     console.log('대댓글 :', commentData[0].replies);
    // }, []);
    const handleCancelEdit = () => {
        setEditIndex(null);
        setEditComment('');
    };

    const handleGoEdit = (index) => {
        setEditIndex(index); // 해당 댓글의 인덱스를 설정하여 수정 상태로 변경
        //console.log(index);
    };

    const handleChange = (e) => {
        setEditComment(e.target.value);
    };

    const handleSucEdit = async (index) => {
        const num = commentData[index].commentId;

        if (editComment.trim() === '') {
            alert('수정 내용을 입력해주세요.');
            return;
        }

        const data = {
            commentBody: editComment,
            contentId: commentData[index].contentId,
        };
        let path = await fetchCommentEdit(JSON.stringify(data), num).then((data) => {
            if (data.ok) {
                window.location.reload();
            }
        });
    };

    const handleGoDelete = (index) => {
        setEditIndex(index);
        setShowDelModal(true);
        //console.log(showDelModal);
    };

    const handleCancelDelete = () => {
        setShowDelModal(false);
    };

    const confirmDelete = async (index) => {
        //console.log(index);
        const num = commentData[index].commentId;
        //console.log(num);

        const data = {
            contentId: commentData[index].contentId,
        };
        let path = await fetchCommentDelete(JSON.stringify(data), num).then((data) => {
            if (data.ok) {
                window.location.reload();
            }
        });
    };

    const handleUpVote = async (index) => {
        const data = {
            commentId: commentData[index].contentId,
        };
        let path = await fetchUpVoteComment(JSON.stringify(data)).then((data) => {
            console.log('추천', data);
            alert('추천되었습니다.');
            window.location.reload();
        });
    };
    const handleDownVote = async (index) => {
        const data = {
            commentId: commentData[index].contentId,
        };
        let path = await fetchDownVoteComment(JSON.stringify(data)).then((data) => {
            console.log('비추천', data);
            alert('추천이해제되었습니다.');
            window.location.reload();
        });
    };

    return (
        <div>
            <p>댓글 : {commentData.length}</p>
            {commentData.map((comment, index) => (
                <div key={comment.commentId} className="card mb-3">
                    <div className="card-body">
                        <div className="">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <small className="m-0 me-3">작성자: {comment.nickname}</small>
                                    <small className="text-muted">작성시간: {formatDate(comment.created_at)}</small>
                                </div>
                                {comment.memberId == sessionStorage.getItem('memberId') && !comment.deleted && (
                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            className="btn btn-link btn-sm me-2"
                                            onClick={() => handleGoEdit(index)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-sm"
                                            onClick={() => handleGoDelete(index)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                            {editIndex === index ? (
                                <div>
                                    <textarea
                                        className="form-control mb-2"
                                        defaultValue={comment.commentBody}
                                        rows="3"
                                        onChange={handleChange}
                                    ></textarea>
                                    <button className="btn btn-primary btn-sm" onClick={() => handleSucEdit(index)}>
                                        수정완료
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm mx-2"
                                        onClick={() => handleCancelEdit()}
                                    >
                                        수정취소
                                    </button>
                                </div>
                            ) : (
                                <h6 className="card-text mt-4" style={{ fontSize: '14px' }}>
                                    {comment.commentBody}
                                </h6>
                            )}
                        </div>
                        {sessionStorage.getItem('memberId') && (
                            <div className="mb-1 mx-4 d-flex justify-content-end" style={{ color: '#0d6efd' }}>
                                {!comment.voted ? (
                                    <BsHandThumbsUp style={{ cursor: 'pointer' }} onClick={() => handleUpVote(index)} />
                                ) : (
                                    <BsHandThumbsUpFill
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDownVote(index)}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <Reply reply={comment.replies} />
                    <ReplyWrite contentId={comment.contentId} commentId={comment.commentId} />
                </div>
            ))}
            <Modal show={showDelModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>댓글 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>이 댓글을 삭제하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        취소
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(editIndex)}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Comment;
