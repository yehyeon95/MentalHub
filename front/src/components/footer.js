import { useNavigate } from 'react-router-dom';
const Footer = () => {
    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate('/');
    };

    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="container d-flex justify-content-between align-items-center p-2">
                <div className="fs-6">
                    {/* <img src="logo.png" alt="Logo" width="15" height="15" className="me-2" /> */}
                    <button className="fs-5 fw-bold me-auto" onClick={handleClickLogo}>
                        MentalHub
                    </button>
                </div>
                <div className="">
                    <ul className="list-unstyled mb-0">
                        <li className="fs-7">김예현</li>
                        <li className="fs-7">이현수</li>
                        <li className="fs-7">김신재</li>
                    </ul>
                </div>
                <div className="fs-6">
                    <p className="m-0">© 2024 MH 프로젝트. 모든 권리 보유.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
