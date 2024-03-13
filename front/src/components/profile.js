import { fetchUserDelete } from "../util/fetchUser";
import { useNavigate } from "react-router-dom";
function Profile(){

    const navigate = useNavigate();

    function handleLogout(){
        sessionStorage.clear();
    }

    function handleDelete(){
        console.log('회원정보삭제')
        userDelete()
    }

    const userDelete=()=>{
        fetchUserDelete().then((res)=>{
            navigate('/')
        })
        console.log('회원정보삭제')
    }

    return (
        <div className="container m-5 border p-3 d-flex flex-column justify-content-start align-items-center" style={{ height: '16vh' }}>
            <div className="p-2 mb-3 align-self-start font-bold" style={{ fontWeight: 'bold', fontSize:'25px' }}>
                userName
            </div>
            <div className="mb-3 d-flex justify-content-start align-self-start">
                <ul className='list-unstyled d-flex justify-content-start' style={{ fontSize: '11px' }}>
                    <li className="p-2">
                        <a href='/editProfile'>회원정보수정 </a>
                    </li>
                    <li className="p-2">
                        <p>관리자권한신청</p>
                    </li>
                    <li className="p-2">
                        <a href='/' onClick={handleLogout}>로그아웃</a>
                    </li>
                    <li className="p-2">
                        <a href='/' onClick={handleDelete}>회원탈퇴</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile