import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyComment } from '../util/fetchComment';
import { formatDate } from '../util/util';

function MyAnswers() {
    const navigate = useNavigate();
    const [myCommentsList, setMyCommentsList] = useState([]);
    const [myReplyList, setMyReplyList] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchMyComment().then((res) => {
            console.log('댓글확인');
            console.log(res);
            console.log(res.myComments);
            setMyCommentsList(res.myComments);
            setMyReplyList(res.myReplies);
            setCount(res.commentsCnt);
        });
    }, []);

    function handlePostClick(contentId) {
        navigate(`/contents/${contentId}`);
    }

    return (
        <div className="container justify-content-center">
            <div className="mb-4">유저의 댓글, 대댓글의 개수 : {count}</div>
            <div className="mb-4">댓글</div>
            {myCommentsList && (
                <div className="border p-4 mb-4">
                    {myCommentsList.map((myCommentsList) => (
                        <div key={myCommentsList.commentId} className="card mb-3">
                            <div className="card-body">
                                <h5
                                    className="card-title"
                                    onClick={() => handlePostClick(myCommentsList.contentId)}
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {myCommentsList.commentBody}
                                </h5>
                                <div className="d-flex justify-content-end mt-3 small">
                                    <div className="card-text text-muted mr-3 ">
                                        {' '}
                                        추천수 : {myCommentsList.commentVotesCnt}
                                    </div>
                                    <div className="mx-1">/</div>
                                    <div className="card-text text-muted">
                                        {myCommentsList.modified ? '수정 시간' : '생성 시간'}:{' '}
                                        {formatDate(
                                            myCommentsList.modified
                                                ? myCommentsList.modified_at
                                                : myCommentsList.created_at
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="mb-4">대댓글</div>
            {myReplyList && (
                <div className="border p-4 mb-4">
                    {myReplyList.map((myReplyList) => (
                        <div key={myReplyList.replyId} className="card mb-3">
                            <div className="card-body">
                                <h5
                                    className="card-title"
                                    onClick={() => handlePostClick(myReplyList.contentId)}
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {myReplyList.replyBody}
                                </h5>
                                <div className="d-flex justify-content-end mt-3 small">
                                    <div className="card-text text-muted mr-3 ">
                                        {' '}
                                        추천수 : {myReplyList.replyVotesCnt}
                                    </div>
                                    <div className="mx-1">/</div>
                                    <div className="card-text text-muted">
                                        {myReplyList.modified ? '수정 시간' : '생성 시간'}:{' '}
                                        {formatDate(
                                            myReplyList.modified ? myReplyList.modified_at : myReplyList.created_at
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyAnswers;
