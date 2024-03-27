import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSinglePost } from '../util/fetchBoard';
import { formatDate } from '../util/util';

function SingleViewComponent() {
    const navigate = useNavigate();
    const [postData, setPostData] = useState('');
    useEffect(() => {
        getSingleView();
    }, []);
    const getSingleView = async (callback) => {
        let path = await fetchSinglePost().then((data) => {
            setPostData(data.contentResponseDto);
        });
    };

    const handleGoUpdate = () => {
        navigate('/update');
    };

    const formattedModDate = formatDate(postData.modifiedAt);
    const formattedCreDate = formatDate(postData.createdAt);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mb-4">{postData.title}</h2>
                    <div className="mb-4 d-flex justify-content-between align-items-center">
                        <p>작성자: {postData.username}</p>
                        <p>
                            {formattedModDate ? '수정 시간' : '생성 시간'}: {formattedModDate || formattedCreDate}
                        </p>
                        <p>조회수: {postData.views}</p>
                        <p>글종류:{postData.type}</p>
                    </div>
                    <div className="mb-4">
                        {postData.body && (
                            <Viewer
                                initialValue={postData.body}
                                viewer="true"
                                height="500px"
                                previewStyle="vertical"
                                usageStatistics={false}
                            />
                        )}
                    </div>
                    {postData.memberId === sessionStorage.getItem('memberId') && (
                        <button type="button" className="btn btn-primary" onClick={handleGoUpdate}>
                            수정하기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleViewComponent;
