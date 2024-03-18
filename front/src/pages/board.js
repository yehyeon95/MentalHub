import CardComponent from "../components/card"

const Board = () => {
    return (
        <div className="container m-3 p-3 mx-auto">board 게시판입니다.
            카드 컴포넌트와 페이지네이션 컴포넌트를 만들어서 두개를 여기다 뿌려준다.
            <CardComponent />
        </div>
    )
}

export default Board