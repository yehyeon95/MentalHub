import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor as Writer } from '@toast-ui/react-editor';
import { fetchBoardWrite } from '../util/fetchBoard';
import { fetchUploadImage } from '../util/fetchFile';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //부트스트랩을 따로 npm 으로 다운받았는데 왜 이걸 다시 써야하는지 모르겠음 이걸 써야지 드롭다운 메뉴가 열림

function WriteComponent() {
    /**
     * TODO : 관리자만 공지 게시글 작성하게 하기
     */

    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [title, setTitle] = useState('');
    //const [body, setBody] = useState('');
    const [boardType, setBoardType] = useState('일반 게시글'); //드롭다운 이벤트 상태변화
    const [type, setType] = useState('일반 게시글'); //실제 요청을 보낼때의 타입상태변화
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    // const onChangeHandle = (e) => {
    //     setBody(e.target.value);
    // };

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

    const checkPostSubmit = () => {
        if (!title) {
            alert('제목을 작성해주세요');
            return false;
        } else if (!type) {
            alert('게시글 타입을 선택해주세요');
            return false;
        } else if (!editorRef.current.getInstance().getMarkdown()) {
            alert('내용을 작성해주세요');
            return false;
        }
        return true;
    };

    const onUploadImage = async (blob, callback) => {
        await fetchUploadImage(blob).then((data) => {
            console.log(data);
            //{imageUrl: 'https://mentalhub1.s3.ap-northeast-2.amazonaws.com/%EB%A1%9C%EA%B3%A0.png'}
            callback(data.imageUrl);
        });
        return false;
    };

    const onUploadWrite = async (callback) => {
        // const jsonTitle = JSON.stringify(title);
        // const jsonBody = JSON.stringify(body);
        // const type = JSON.stringify('post');
        // json으로 변환한 뒤에 객체로 만들면 배드 리퀘스트 뜸
        // 객체로 만들어서 data로 묶은 다음에 json으로 만들어야함
        if (!checkPostSubmit()) {
            return; // 조건이 충족되지 않으면 함수 종료
        }
        console.log('type확인 :' + type);
        const data = {
            title: title,
            body: editorRef.current.getInstance().getMarkdown(),
            type: type,
        };

        const goHome = () => {
            navigate('/');
        };

        let path = await fetchBoardWrite(JSON.stringify(data)).then((data) => {
            //console.log(data);
            if (data) goHome();
            // 성공적으로 응답이 오면 게시판 목록으로 이동
        });
    };

    return (
        <div>
            <div className="container">
                <div className="mb-4 editor-wrapper">
                    <h3 className="my-4">글을 작성해주세요</h3>
                    <input
                        type="text"
                        onChange={handleTitle}
                        className="form-control mb-4"
                        placeholder="제목을 입력해주세요"
                    ></input>
                    <div className="dropdown  mb-4">
                        <button
                            className={`btn dropdown-toggle ${boardType ? 'btn-primary' : 'btn-primary'}`}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {boardType ? boardType : '일반 게시글'}
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
                        initialValue="내용을 입력하세요" // 초기값 설정
                        previewStyle="vertical" // 미리보기 스타일 설정
                        height="500px" // 에디터 높이 설정
                        initialEditType="markdown" // 초기 에디터 타입 설정 (markdown 또는 wysiwyg)
                        useCommandShortcut={true} // 단축키 사용 설정
                        ref={editorRef} // 에디터 ref 설정
                        //onChange={onChangeHandle} // 변경 핸들러 설정
                        hooks={{
                            addImageBlobHook: onUploadImage,
                        }}
                        toolbarItems={[
                            ['heading', 'bold', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task'],
                            ['table', 'image', 'link'],
                        ]}
                    />
                </div>
                <div>
                    <button onClick={onUploadWrite} className="btn btn-primary">
                        제출하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WriteComponent;
