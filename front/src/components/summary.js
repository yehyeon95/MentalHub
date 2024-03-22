import { useState, useEffect } from 'react';
import { fetchUserInfo } from '../util/fetchUser';

function Summary() {
    const [myPostCount, setMyPostCount] = useState(0);
    const [myAnswerCount, setMyAnswerCount] = useState(0);
    const [receivedRecommendation, setReceivedRecommendation] = useState(0);

    // useEffect(()=>{
    //     getUserInfo()
    // },[])

    // const getUserInfo = async(callback) => {
    //     console.log('summary에서 부르는지 확인')
    //     let path = await fetchUserInfo().then((data)=>{
    //         console.log(data)
    //     })
    // }
    // setMyPostCount(data.myPostCount)
    // setMyAnswerCount(data.myAnswerCount)
    // setReceivedRecommendation(data.myrecommendationCount)

    return (
        <div className="container justify-content-center">
            <div className="mb-4">내 정보 요약입니다.</div>
            <div className="border p-4 mb-4 text-center">
                <h6>내가 작성한 글의 수: {myPostCount}</h6>
            </div>
            <div className="border p-4 mb-4 text-center">
                <h6>내가 작성한 답변의 수: {myAnswerCount}</h6>
            </div>
            <div className="border p-4 mb-4 text-center">
                <h6>내가 받은 추천의 수: {receivedRecommendation}</h6>
            </div>
        </div>
    );
}

export default Summary;
