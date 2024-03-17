function MyAnswers () {
    return(
        <div className='container justify-content-center'>
            <div className="mb-4">유저의 답글 목록입니다.(최근 답글 순서대로 3개만 나옵니다.)</div>
            <div className='border p-4 mb-4 text-center'>
                <h5 className='card-title'>댓글 내용</h5>
                <div className="d-flex justify-content-end mt-3 small">
                    <div className="card-text text-muted mr-3 "> 사용자1</div>
                    <div className="mx-1">/</div>
                    <div className="card-text text-muted">관리자</div>
                    <div className="mx-1">/</div>
                    <div className="card-text text-muted">작성시간: 2024-02-20</div>
                </div>
            </div>
        </div>
    )
}

export default MyAnswers