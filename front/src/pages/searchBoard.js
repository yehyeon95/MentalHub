import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/card';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchResult } from '../redux/action';

function SearchBoard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [postsList, setPostsList] = useState([]);
    const searchResult = useSelector((state) => state.searchResult);

    useEffect(() => {
        if (searchResult.length > 0) {
            // 검색 결과가 있으면 해당 결과를 포스트 리스트로 설정
            setPostsList(searchResult);
            dispatch(setSearchResult([])); // 검색 결과 초기화
        }
    }, [searchResult]);

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
        </div>
    );
}

export default SearchBoard;
