import { Link } from 'react-router-dom';

const CardComponent = () => {
    return (
        <div className="">
            <div className="container p-4 border text-md border-soGray-light">
                <div className="row"></div>
                <div className="text-[1.2rem] line-clamp-2 break-all font-weight-bold mb-2">
                    <Link to={`/question/`}>제목</Link>
                </div>
                <div className="d-flex justify-content-end text-[13px] text-soGray-darker">
                    <span className="font-weight-bold text-soGray-darker mx-1">유저네임</span>
                    <time className="mx-1">
                        <span className="text-soGray-darker">시간</span>
                    </time>
                    <span className="font-weight-bold text-soGray-darker mx-1">추천수</span>
                    <span className="font-weight-bold text-soGray-darker mx-1">유저 직책</span>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
