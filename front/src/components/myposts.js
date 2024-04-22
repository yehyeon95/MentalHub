import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyPost } from '../util/fetchBoard';
import { formatDate } from '../util/util';

function MyPosts() {
    const navigate = useNavigate();
    const [myPostsList, setMyPostsList] = useState([]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchMyPost().then((res) => {
            console.log('여기 확인');
            console.log(res);
            setMyPostsList(res.myContents);
            setCount(res.contentsCnt);
        });
    }, []);

    function handlePostClick(contentId) {
        navigate(`/contents/${contentId}`);
    }

    return (
        <div className="container justify-content-center">
            <div className="mb-4">유저의 작성 게시물 개수 : {count}</div>
            {myPostsList && (
                <div className="border p-4 mb-4">
                    {myPostsList.map((myPostsList) => (
                        <div key={myPostsList.contentId} className="card mb-3">
                            <div className="card-body">
                                <h5
                                    className="card-title"
                                    onClick={() => handlePostClick(myPostsList.contentId)}
                                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                >
                                    {myPostsList.title}
                                </h5>
                                <div className="d-flex justify-content-end mt-3 small">
                                    <div className="card-text text-muted mr-3">
                                        추천수 : {myPostsList.contentVotesCnt}
                                    </div>
                                    <div className="mx-1"> / </div>
                                    <div className="card-text text-muted">
                                        {myPostsList.modified ? '수정 시간' : '생성 시간'}:{' '}
                                        {formatDate(
                                            myPostsList.modified ? myPostsList.modifiedAt : myPostsList.createdAt
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

export default MyPosts;
