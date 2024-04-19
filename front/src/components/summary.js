import { useState, useEffect } from 'react';
import { fetchMySummary } from '../util/fetchBoard';

function Summary() {
    const [count, setCount] = useState({});
    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async (callback) => {
        //console.log('summary에서 부르는지 확인');
        let path = await fetchMySummary().then((data) => {
            //console.log(data);
            setCount(data);
        });
    };

    return (
        <div className="container justify-content-center">
            <div className="mb-4">내 정보 요약입니다.</div>
            <div className="border p-4 mb-4 text-center">
                <h6>내가 작성한 글의 수: {count.contentsCnt}</h6>
            </div>
            <div className="border p-4 mb-4 text-center">
                <h6>내가 작성한 답변의 수: {count.commentsCnt}</h6>
            </div>
            <div className="border p-4 mb-4 text-center">
                <h6>내가 받은 게시물 추천의 수: {count.contentsVoteCnt}</h6>
            </div>
            <div className="border p-4 mb-4 text-center">
                <h6>내가 받은 댓글 추천의 수: {count.commentsVoteCnt}</h6>
            </div>
        </div>
    );
}

export default Summary;
