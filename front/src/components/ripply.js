import { formatDate } from '../util/util';
import { useState, useEffect } from 'react';
import { RiCornerDownRightLine } from 'react-icons/ri';

import { fetchRipplyDelete, fetchRipplyEdit } from '../util/fetchRipple';
import { Modal, Button } from 'react-bootstrap';

function Ripply({ ripply }) {
    const [editRipIndex, setEditRipIndex] = useState(null);
    const [editRipply, setEditRipply] = useState('');
    const [showDelModal, setShowDelModal] = useState(false);

    const handleCancelRipplyEdit = () => {
        setEditRipIndex(null);
        setEditRipply('');
    };

    const handleRipplyEdit = (index) => {
        setEditRipIndex(index);
    };

    const handleChange = (e) => {
        setEditRipply(e.target.value);
    };

    const handleSucRipplyEdit = async (index) => {
        const num = ripply[index].replyId;
        if (editRipply.trim() === '') {
            alert('수정 내용을 입력해주세요');
            return;
        }
        const data = {
            replyBody: editRipply,
            contentId: ripply[index].contentId,
            commentId: ripply[index].commentId,
        };
        let path = await fetchRipplyEdit(JSON.stringify(data), num).then((data) => {
            if (data.ok) {
                window.location.reload();
            }
        });
    };

    const handleRipplyDelete = (index) => {
        setEditRipIndex(index);
        setShowDelModal(true);
    };

    const handleRipplyCancelDelete = () => {
        setShowDelModal(false);
    };

    const confirmDelete = async (index) => {
        const num = ripply[index].replyId;
        const data = {
            contentId: ripply[index].contentId,
            commentId: ripply[index].commentId,
        };
        let path = await fetchRipplyDelete(JSON.stringify(data), num).then((data) => {
            if (data.ok) {
                window.location.reload();
            }
        });
    };

    return (
        <div>
            {ripply.map((ripple, index) => (
                <div key={ripple.replyId} className="mb-1 border-top border-info">
                    <div className="card-body ms-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <RiCornerDownRightLine className="text-primary me-2" />
                                <small className="m-0 me-3">작성자: {ripple.nickname}</small>
                                <small className="text-muted">작성시간: {formatDate(ripple.created_at)}</small>
                            </div>
                            {ripple.memberId == sessionStorage.getItem('memberId') && !ripple.deleted && (
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm me-2"
                                        onClick={() => handleRipplyEdit(index)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm"
                                        onClick={() => handleRipplyDelete(index)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                        {editRipIndex === index ? (
                            <div>
                                <textarea
                                    className="form-control mb-2"
                                    defaultValue={ripple.replyBody}
                                    rows="3"
                                    onChange={handleChange}
                                ></textarea>
                                <button className="btn btn-primary btn-sm" onClick={() => handleSucRipplyEdit(index)}>
                                    수정완료
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm mx-2"
                                    onClick={() => handleCancelRipplyEdit()}
                                >
                                    수정취소
                                </button>
                            </div>
                        ) : (
                            <h6 className="card-text" style={{ fontSize: '14px' }}>
                                {ripple.replyBody}
                            </h6>
                        )}
                    </div>
                </div>
            ))}
            <Modal show={showDelModal} onHide={handleRipplyCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>댓글 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>이 댓글을 삭제하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRipplyCancelDelete}>
                        취소
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(editRipIndex)}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Ripply;
