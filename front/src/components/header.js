import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserLogOut } from '../util/fetchUser';
import { fetchSearch } from '../util/fetchBoard';
import { useDispatch } from 'react-redux';
import { setSearchResult } from '../redux/action';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('제목');

    useEffect(() => {
        checkLoginState();
    });

    const checkLoginState = () => {
        if (sessionStorage.getItem('access_token')) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    };

    const handleItemClick = (e) => {
        setSearchType(e);
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLogin(false);
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleClickLogo = () => {
        navigate('/');
        dispatch(setSearchResult([]));
    };

    const handleSearchBtn = async () => {
        console.log('실행되나 확인');
        let path = await fetchSearch(searchText, searchType).then((data) => {
            console.log(data);
            dispatch(setSearchResult(data));
            navigate('/search');
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-text fw-bold" onClick={handleClickLogo}>
                    MentalHub
                </button>
                <div className="d-flex mx-auto">
                    <div className="dropdown mx-2">
                        <button
                            className={`btn dropdown-toggle ${searchType ? 'btn-primary' : 'btn-primary'}`}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {searchType ? searchType : '제목'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button
                                    className={`dropdown-item ${searchType === 'title' ? 'active' : ''}`}
                                    onClick={() => handleItemClick('제목')}
                                >
                                    제목
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`dropdown-item ${searchType === 'nickname' ? 'active' : ''}`}
                                    onClick={() => handleItemClick('닉네임')}
                                >
                                    닉네임
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`dropdown-item ${searchType === 'titleAndBody' ? 'active' : ''}`}
                                    onClick={() => handleItemClick('제목+닉네임')}
                                >
                                    제목+닉네임
                                </button>
                            </li>
                        </ul>
                    </div>
                    <form className="d-flex ms-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={handleSearch}
                        />
                        <button className="btn btn-outline-success" onClick={handleSearchBtn}>
                            Search
                        </button>
                    </form>
                </div>
                {isLogin ? (
                    <>
                        <button className="btn btn-primary me-2" onClick={() => (window.location.href = '/Mypage')}>
                            프로필
                        </button>
                        <button className="btn btn-secondary" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary me-2" onClick={handleLogin}>
                            로그인
                        </button>
                        <button className="btn btn-secondary" onClick={() => (window.location.href = '/join')}>
                            회원가입
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
