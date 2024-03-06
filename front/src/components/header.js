import {useState} from 'react';


const Header = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleLogout =()=>{
        setIsLogin(false)
    }
    const testLogin = ()=>{
        setIsLogin(true)
    }
    

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* 로고 */}
                <a className="navbar-brand" href="#">
                    <img src="logo.png" alt="Logo" width="15" height="15" className="d-inline-block align-top" />
                </a>
                {/* 프로젝트 이름 */}
                <span className="navbar-text fw-bold">MentalHub</span>
                {/* 검색바 */}
                <div className="d-flex mx-auto">
                    <form className="d-flex ms-auto">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                {isLogin ? (
                <>
                {/* 유저프로필버튼 */}
                <button className="btn btn-primary me-2" onClick={() => window.location.href='/Mypage'}>프로필</button>
                {/* 로그아웃 버튼 */}
                <button className="btn btn-secondary" onClick={handleLogout}>로그아웃</button>
                </>
                )
                :
                (
                <>
                {/* 로그인 버튼 */}
                {/* <button className="btn btn-primary me-2" onClick={() => window.location.href='/login'}>로그인</button> */}
                <button className="btn btn-primary me-2" onClick={testLogin}>로그인</button>
                {/* 회원가입 버튼 */}
                <button className="btn btn-secondary" onClick={() => window.location.href='/join'}>회원가입</button>
                </>
                )}
                </div>
        </nav>
    );
}

export default Header;