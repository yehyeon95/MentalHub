import { fetchUserDelete, fetchUserInfo } from '../util/fetchUser';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Profile() {
    const location = useLocation();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        console.log('시작점');
        getUserInfo();
    }, [location]);

    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.clear();
        navigate('/');
    }

    function handleDelete() {
        console.log('회원정보삭제');
        userDelete();
    }

    const userDelete = () => {
        fetchUserDelete().then((res) => {
            navigate('/');
        });
        console.log('회원정보삭제');
    };

    const getUserInfo = async (callback) => {
        let path = await fetchUserInfo().then((data) => {
            setUserInfo(data);
        });
    };

    return (
        <div
            className="container m-5 border p-3 d-flex flex-column justify-content-start align-items-center"
            style={{ height: '16vh' }}
        >
            <div className="p-2 mb-3 align-self-start font-bold" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                {userInfo && userInfo.nickname}
            </div>
            <div className="mb-3 d-flex justify-content-start align-self-start">
                <ul className="list-unstyled d-flex justify-content-start" style={{ fontSize: '11px' }}>
                    <li className="p-2">
                        <a href="/editName">닉네임변경 </a>
                    </li>
                    <li className="p-2">
                        <a href="/editPassword">비밀번호수정 </a>
                    </li>
                    <li className="p-2">
                        <p>관리자권한신청</p>
                    </li>
                    <li className="p-2">
                        <a href="/" onClick={handleLogout}>
                            로그아웃
                        </a>
                    </li>
                    <li className="p-2">
                        <a href="/" onClick={handleDelete}>
                            회원탈퇴
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;
