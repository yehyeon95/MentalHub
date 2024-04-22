import { formatDate } from '../util/util';
import { useState, useEffect } from 'react';
import { RiCornerDownRightLine } from 'react-icons/ri';

import { fetchReplyDelete, fetchReplyEdit } from '../util/fetchReply';
import { fetchUpVoteReply, fetchDownVoteReply } from '../util/fetchVote';
import { Modal, Button } from 'react-bootstrap';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';

function Reply({ reply }) {
    const [editReplyIndex, setEditReplyIndex] = useState(null);
    const [editReply, setEditReply] = useState('');
    const [showDelModal, setShowDelModal] = useState(false);

    const handleCancelReplyEdit = () => {
        setEditReplyIndex(null);
        setEditReply('');
    };

    const handleReplyEdit = (index) => {
        setEditReplyIndex(index);
    };

    const handleChange = (e) => {
        setEditReply(e.target.value);
    };

    const handleSucReplyEdit = async (index) => {
        const num = reply[index].replyId;
        if (editReply.trim() === '') {
            alert('수정 내용을 입력해주세요');
            return;
        }
        const data = {
            replyBody: editReply,
            contentId: reply[index].contentId,
            commentId: reply[index].commentId,
        };
        let path = await fetchReplyEdit(JSON.stringify(data), num).then((data) => {
            if (data.ok) {
                window.location.reload();
            }
        });
    };

    const handleReplyDelete = (index) => {
        setEditReplyIndex(index);
        setShowDelModal(true);
    };

    const handleReplyCancelDelete = () => {
        setShowDelModal(false);
    };

    const confirmDelete = async (index) => {
        const num = reply[index].replyId;
        const data = {
            contentId: reply[index].contentId,
            commentId: reply[index].commentId,
        };
        let path = await fetchReplyDelete(JSON.stringify(data), num).then((data) => {
            if (data.ok) {
                window.location.reload();
            }
        });
    };

    const handleUpVote = async (index) => {
        if (!sessionStorage.getItem('memberId')) {
            alert('로그인 후에 추천해주세요!');
            return;
        }
        const data = {
            replyId: reply[index].replyId,
        };
        let path = await fetchUpVoteReply(JSON.stringify(data)).then((data) => {
            console.log('추천', data);
            alert('추천되었습니다.');
            window.location.reload();
        });
    };
    const handleDownVote = async (index) => {
        if (!sessionStorage.getItem('memberId')) {
            alert('로그인 후에 이용해주세요!');
            return;
        }
        const data = {
            replyId: reply[index].replyId,
        };
        let path = await fetchDownVoteReply(JSON.stringify(data)).then((data) => {
            console.log('비추천', data);
            alert('추천이해제되었습니다.');
            window.location.reload();
        });
    };

    return (
        <div>
            {reply.map((reply, index) => (
                <div key={reply.replyId} className="mb-1 border-top border-info">
                    <div className="card-body ms-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <RiCornerDownRightLine className="text-primary me-2" />
                                <small className="m-0 me-3">작성자: {reply.nickname}</small>
                                <small className="text-muted">작성시간: {formatDate(reply.created_at)}</small>
                            </div>
                            {reply.memberId == sessionStorage.getItem('memberId') && !reply.deleted && (
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm me-2"
                                        onClick={() => handleReplyEdit(index)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm"
                                        onClick={() => handleReplyDelete(index)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                        {editReplyIndex === index ? (
                            <div>
                                <textarea
                                    className="form-control mb-2"
                                    defaultValue={reply.replyBody}
                                    rows="3"
                                    onChange={handleChange}
                                ></textarea>
                                <button className="btn btn-primary btn-sm" onClick={() => handleSucReplyEdit(index)}>
                                    수정완료
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm mx-2"
                                    onClick={() => handleCancelReplyEdit()}
                                >
                                    수정취소
                                </button>
                            </div>
                        ) : (
                            <h6 className="card-text" style={{ fontSize: '14px' }}>
                                {reply.replyBody}
                            </h6>
                        )}
                    </div>
                    <div className="mb-2 mx-4 d-flex justify-content-end" style={{ color: '#0d6efd' }}>
                        <div className="mb-1 mx-4" style={{ color: 'black' }}>
                            추천수 : {reply.replyVotesCnt}
                        </div>
                        {!reply.voted ? (
                            <BsHandThumbsUp style={{ cursor: 'pointer' }} onClick={() => handleUpVote(index)} />
                        ) : (
                            <BsHandThumbsUpFill style={{ cursor: 'pointer' }} onClick={() => handleDownVote(index)} />
                        )}
                    </div>
                </div>
            ))}
            <Modal show={showDelModal} onHide={handleReplyCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>댓글 삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>이 댓글을 삭제하시겠습니까?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReplyCancelDelete}>
                        취소
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(editReplyIndex)}>
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Reply;
