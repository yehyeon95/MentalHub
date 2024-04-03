import { useState } from 'react';
import { formatDate } from '../util/util';
import { fetchCommentDelete, fetchCommentEdit } from '../util/fetchComment';
import { Modal, Button } from 'react-bootstrap';

function Comment({ commentData }) {
    const [editIndex, setEditIndex] = useState(null); // 수정 중인 댓글의 인덱스를 저장하는 상태
    const [editComment, setEditComment] = useState('');
    const [showDelModal, setShowDelModal] = useState(false);

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
            alert('수정할 내용을 입력해주세요.');
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

    return (
        <div>
            <p>댓글 : {commentData.length}</p>
            {commentData.map((comment, index) => (
                <div key={comment.commentId} className="card mb-3">
                    <div className="card-body">
                        <div className="">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <small className="m-0 me-3">작성자: {comment.memberId}</small>
                                    <small className="text-muted">작성시간: {formatDate(comment.created_at)}</small>
                                </div>
                                {comment.memberId == sessionStorage.getItem('memberId') && !comment.deleted && (
                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleGoEdit(index)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleGoDelete(index)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* 댓글 내용 또는 수정 폼 */}
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
                                <h6 className="card-text" style={{ fontSize: '14px' }}>
                                    {comment.commentBody}
                                </h6>
                            )}
                        </div>
                    </div>
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
