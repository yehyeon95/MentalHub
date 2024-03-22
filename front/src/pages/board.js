import { useNavigate } from "react-router-dom"
import CardComponent from "../components/card"

const Board = () => {
    const navigate = useNavigate()

    const handleWriteButton =()=>{
        navigate('/write')
    }
    return (
        <div>
            <div className="container m-3 p-3 mx-auto d-flex justify-content-end">
                <button onClick={handleWriteButton} className="btn btn-primary my-4">글쓰기</button>
            </div>
            <div className="container m-3 p-3 mx-auto">board 게시판입니다.
                카드 컴포넌트와 페이지네이션 컴포넌트를 만들어서 두개를 여기다 뿌려준다.
                <CardComponent />
            </div>
        </div>
    )
}

export default Board