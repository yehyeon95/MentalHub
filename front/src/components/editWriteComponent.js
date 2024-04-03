import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor as Writer } from '@toast-ui/react-editor';
import { fetchPostUpdate, fetchSinglePost } from '../util/fetchBoard';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //부트스트랩을 따로 npm 으로 다운받았는데 왜 이걸 다시 써야하는지 모르겠음 이걸 써야지 드롭다운 메뉴가 열림

function EditWriteComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [boardType, setBoardType] = useState(''); //드롭다운 이벤트 상태변화
    const [type, setType] = useState(''); //실제 요청을 보낼때의 타입상태변화
    const [postData, setPostData] = useState('');

    // useEffect(() => {
    //     getSingleView();
    //     //console.log(body);
    // }, []);

    // const getSingleView = async (callback) => {
    //     let path = await fetchSinglePost(id).then((data) => {
    //         setPostData(data.contentResponseDto);
    //         setTitle(data.contentResponseDto.title); // 제목 설정
    //         setBody(data.contentResponseDto.body); // 본문 설정
    //         handleChangeType(data.contentResponseDto.type); // 타입 설정
    //     });
    //     console.log(body);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSinglePost(id);
                if (data && data.contentResponseDto) {
                    const { title, body, type } = data.contentResponseDto;
                    setTitle(title);
                    setBody(body);
                    handleChangeType(type);
                    setBoardType(type === 'post' ? '일반 게시글' : type === 'info' ? '정보 게시글' : '공지 게시글');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchData();
    }, [id]);

    // body가 변경될 때마다 editor의 value를 업데이트
    useEffect(() => {
        if (editorRef.current && body !== '') {
            editorRef.current.getInstance().setMarkdown(body);
        }
    }, [body]);

    const checkPostSubmit = () => {
        if (!title) {
            alert('제목을 작성해주세요');
        } else if (!type) {
            alert('게시글 타입을 선택해주세요');
        } else if (!body) {
            alert('내용을 작성해주세요');
        }
    };

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleItemClick = (e) => {
        setBoardType(e);
        handleChangeType(e);
    };

    const handleChangeType = (e) => {
        if (e === '일반 게시글') {
            setType('post');
        } else if (e === '정보 게시글') {
            setType('info');
        } else if (e === '공지 게시글') {
            setType('notice');
        }
        console.log(type);
    };

    const onEditWrite = async (callback) => {
        checkPostSubmit();
        const data = {
            title: title,
            body: editorRef.current.getInstance().getMarkdown(),
            type: type,
        };

        const goHome = () => {
            navigate('/');
        };

        let path = await fetchPostUpdate(id, JSON.stringify(data)).then((data) => {
            //console.log(data);
            if (data) {
                alert('수정이 완료되었습니다.');
                goHome();
            }
            // 성공적으로 응답이 오면 게시판 목록으로 이동
        });
    };

    return (
        <div>
            <div className="container">
                <div className="mb-4 editor-wrapper">
                    <h3 className="my-4">글을 수정해주세요</h3>
                    <input
                        type="text"
                        onChange={handleTitle}
                        className="form-control mb-4"
                        value={title}
                        //placeholder="제목을 입력해주세요"
                    ></input>
                    <div className="dropdown  mb-4">
                        <button
                            className={`btn dropdown-toggle ${boardType ? 'btn-primary' : 'btn-secondary'}`}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {boardType ? boardType : '게시글 형식을 선택해주세요'}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <button
                                    className={`dropdown-item ${boardType === '일반 게시글' ? 'active' : ''}`}
                                    onClick={() => handleItemClick('일반 게시글')}
                                >
                                    일반 게시글
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`dropdown-item ${boardType === '정보 게시글' ? 'active' : ''}`}
                                    onClick={() => handleItemClick('정보 게시글')}
                                >
                                    정보 게시글
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`dropdown-item ${boardType === '공지 게시글' ? 'active' : ''}`}
                                    onClick={() => handleItemClick('공지 게시글')}
                                >
                                    공지 게시글
                                </button>
                            </li>
                        </ul>
                    </div>
                    <Writer
                        value={body} // 초기값 설정
                        previewStyle="vertical" // 미리보기 스타일 설정
                        height="500px" // 에디터 높이 설정
                        initialEditType="markdown" // 초기 에디터 타입 설정 (markdown 또는 wysiwyg)
                        useCommandShortcut={true} // 단축키 사용 설정
                        ref={editorRef} // 에디터 ref 설정
                        //onChange={onChangeHandle} // 변경 핸들러 설정
                        toolbarItems={[
                            ['heading', 'bold', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task'],
                            ['table', 'image', 'link'],
                        ]}
                    />
                </div>
                <div>
                    <button onClick={onEditWrite} className="btn btn-primary">
                        제출하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditWriteComponent;
