import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPostsList } from '../util/fetchBoard';
import CardComponent from '../components/card';
import Pagination from '../components/pagination';
//외부라이브러리 사용시에는 중괄호를 써주고 같은 프로젝트 내에 있으면 중괄호 안씀
import Loading from '../components/loading';

const Board = () => {
    const navigate = useNavigate();
    const [postsList, setPostsList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('post');
    const [search, setSearch] = useState(''); //header에서 검색어를 작성하면, 이벤트를 통해서 세션에 검색어를 저장, 후에 여기서 가져와서 검색함
    const [isUpdate, setIsUpdate] = useState(true); //필터 혹은 검색 상태변화를 의미함
    const [isPending, setIsPending] = useState(true);

    const onFilterClick = (e) => {
        console.log(e);
        setCurrentFilter(e);
        setIsUpdate(true);
        console.log('currentfilter확인:' + currentFilter);
    };

    function onPageChange(e) {
        setCurrentPage(e.target);
        //console.log(setCurrentPage);
        setIsUpdate(true);
    }

    const onClickPage = (target) => {
        if (target === 'Prev') {
            setCurrentPage(currentPage - 1);
        } else if (target === 'Next') {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(+target);
        }
        setIsUpdate(true);
    };

    /**
     * 페이지, 필터가 변환될때마다 불려지는 useEffect => isUpdate 될때마다 실행
     */
    useEffect(() => {
        if (isUpdate) {
            //fetchQuestionList(currentPage, currentFilter, searchText).then((res) => {
            fetchPostsList(currentPage, currentFilter).then((res) => {
                setPostsList(res.data); //리스트 배열로 들어오는거 이름 맞추기
                setPageInfo(res); //페이지 인포만 들어오는걸로 확인
                //setSearch(searchText);
                setIsUpdate(false);
                setIsPending(false);
                console.log(res.data);
            });
        }
    }, [isUpdate]);

    if (isPending) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const handleWriteButton = () => {
        navigate('/write');
    };

    return (
        <div>
            <div className="container m-3 p-3 mx-auto d-flex justify-content-end">
                {sessionStorage.getItem('memberId') && (
                    <button onClick={handleWriteButton} className="btn btn-primary my-4 mx-4">
                        글쓰기
                    </button>
                )}
                {/* <div className="m-4">{pageInfo}</div> */}
                <div className="filter btn-group my-4">
                    <button
                        type="button"
                        value="post"
                        onClick={() => onFilterClick('post')}
                        className={`btn ${currentFilter === 'post' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                        일반
                    </button>
                    <button
                        type="button"
                        value="info"
                        onClick={() => onFilterClick('info')}
                        className={`btn ${currentFilter === 'info' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                        정보
                    </button>
                    <button
                        type="button"
                        value="notice"
                        onClick={() => onFilterClick('notice')}
                        className={`btn ${currentFilter === 'notice' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                        공지
                    </button>
                </div>
            </div>
            <div className="container m-3 p-3 mx-auto">
                {postsList && (
                    <div className="questionList">
                        {postsList.map((postsList) => (
                            <CardComponent key={postsList.contentId} item={postsList} />
                        ))}
                    </div>
                )}
            </div>
            <div className="border-t border-soGray-light">
                <div className="mt-12">
                    {pageInfo && (
                        <Pagination
                            currentPage={currentPage}
                            pageInfo={pageInfo}
                            setCurrPage={setCurrentPage}
                            setIsUpdate={setIsUpdate}
                            onPageChange={onPageChange}
                            onClickPage={onClickPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;
