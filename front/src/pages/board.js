import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPostsList, fetchPostsNotiList } from '../util/fetchBoard';
import CardComponent from '../components/card';
import Pagination from '../components/pagination';
//외부라이브러리 사용시에는 중괄호를 써주고 같은 프로젝트 내에 있으면 중괄호 안씀
import Loading from '../components/loading';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchResult } from '../redux/action';

const Board = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchResult = useSelector((state) => state.searchResult);
    const [postsList, setPostsList] = useState([]);
    const [notiList, setNotiList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [notiInfo, setNotiInfo] = useState({});
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
            fetchPostsNotiList().then((res) => {
                setNotiList(res.data);
                setNotiInfo(res);
            });
            fetchPostsList(currentPage, currentFilter).then((res) => {
                setPostsList(res.data); //리스트 배열로 들어오는거 이름 맞추기
                setPageInfo(res); //페이지 인포만 들어오는걸로 확인
                setIsUpdate(false);
                setIsPending(false);
            });
        }
    }, [isUpdate]);

    if (isPending) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <Loading />
            </div>
        );
    }

    const handleWriteButton = () => {
        navigate('/write');
    };

    return (
        <div>
            <div className="container m-3 p-3 mx-auto d-flex justify-content-between">
                <div className="filter btn-group my-4 d-flex justify-content-start">
                    <button
                        type="button"
                        value="post"
                        onClick={() => onFilterClick('post')}
                        className={`btn ${currentFilter === 'post' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                        일반게시글
                    </button>
                    <button
                        type="button"
                        value="info"
                        onClick={() => onFilterClick('info')}
                        className={`btn ${currentFilter === 'info' ? 'btn-primary' : 'btn-outline-primary'}`}
                    >
                        정보게시글
                    </button>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    {sessionStorage.getItem('memberId') && (
                        <button onClick={handleWriteButton} className="btn btn-primary my-4">
                            글쓰기
                        </button>
                    )}
                </div>
            </div>
            <div className="container mx-auto">
                {notiList && (
                    <div className="notiList">
                        {notiList.map((postsList) => (
                            <CardComponent key={postsList.contentId} item={postsList} />
                        ))}
                    </div>
                )}
            </div>
            <div className="container m-3 p-3 mx-auto">
                {postsList && (
                    <div className="postInfoList">
                        {postsList.map((postsList) => (
                            <CardComponent key={postsList.contentId} item={postsList} />
                        ))}
                    </div>
                )}
            </div>
            <div className="border-t border-soGray-light container mx-auto d-flex justify-content-center">
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
