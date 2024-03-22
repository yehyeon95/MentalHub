import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef } from 'react';
import { Editor as Writer } from '@toast-ui/react-editor';

function WriteComponent() {
    const editorRef = useRef(null);

    const onChangeHandle = () => {
        if (editorRef.current) {
            const htmlElement = editorRef.current.getInstance().getHTML();
            console.log('html' + htmlElement);
            const json = JSON.stringify(htmlElement);
            console.log('json : ' + json);
        }
    };

    const onUploadWrite = () => {};

    return (
        <div>
            <div className="container">
                <div className="mb-4 editor-wrapper">
                    <h1>글을 작성해주세요</h1>
                    <Writer
                        initialValue="내용을 입력하세요" // 초기값 설정
                        previewStyle="vertical" // 미리보기 스타일 설정
                        height="500px" // 에디터 높이 설정
                        initialEditType="markdown" // 초기 에디터 타입 설정 (markdown 또는 wysiwyg)
                        useCommandShortcut={true} // 단축키 사용 설정
                        ref={editorRef} // 에디터 ref 설정
                        onChange={onChangeHandle} // 변경 핸들러 설정
                        toolbarItems={[
                            ['heading', 'bold', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task'],
                            ['table', 'image', 'link'],
                        ]}
                    />
                </div>
                <button onClick={onUploadWrite} className="btn btn-primary"></button>
            </div>
        </div>
    );
}

export default WriteComponent;
