import { formatDate } from '../util/util';

function Comment({ commentData }) {
    const handleGoEdit = () => {
        console.log('수정');
    };
    const handleGoDelete = () => {
        console.log('삭제');
    };
    return (
        <div>
            <p>댓글</p>
            {commentData.map((comment) => (
                <div key={comment.commentId} className="card mb-3">
                    <div className="card-body">
                        <div className="">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <small className="m-0 me-3">작성자: {comment.memberId}</small> {/* 작성자 */}
                                    <small className="text-muted">
                                        작성시간: {formatDate(comment.created_at)}
                                    </small>{' '}
                                </div>
                                {comment.memberId == sessionStorage.getItem('memberId') && (
                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={handleGoEdit}
                                        >
                                            수정
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={handleGoDelete}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* 여기에 수정 및 삭제 버튼을 추가하고 싶은 경우 추가할 수 있습니다 */}
                        </div>
                        <h6 className="card-text" style={{ fontSize: '14px' }}>
                            {comment.commentBody}
                        </h6>{' '}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Comment;
