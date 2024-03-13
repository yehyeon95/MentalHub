import {useState, useEffect} from 'react'

function Summary(){
    const myPostsCount = 10;
    const myAnswersCount = 5;
    const receivedRecommendations = 100;


    return (
        <div className='container justify-content-center'>
            <div className="mb-4">내 정보 요약입니다.</div>
            <div className='border p-4 mb-4 text-center'>
                <h6>내가 작성한 글의 수: {myPostsCount}</h6>
            </div>
            <div className='border p-4 mb-4 text-center'>
                <h6>내가 작성한 답변의 수: {myAnswersCount}</h6>
            </div>
            <div className='border p-4 mb-4 text-center'>
                <h6>내가 받은 추천의 수: {receivedRecommendations}</h6>
            </div>
        </div>
    )
}

export default Summary