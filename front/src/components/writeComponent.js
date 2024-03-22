import { Editor as Writer } from '@toast-ui/react-editor';

function WriteComponent() {
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
                        //onChange={onChangeHandle}
                        toolbarItems={[
                            ['heading', 'bold', 'strike'],
                            ['hr', 'quote'],
                            ['ul', 'ol', 'task'],
                            ['table', 'image', 'link'],
                            ['code', 'codeblock'],
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default WriteComponent;
