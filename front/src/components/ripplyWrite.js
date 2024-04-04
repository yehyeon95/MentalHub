import { useState } from 'react';
import { fetchRipplyWrite } from '../util/fetchRipple';
function RipplyWrite({ contentId, commentId }) {
    const [ripplyBody, setRipplyBody] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);

    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm);
    };
    const handleChange = (e) => {
        setRipplyBody(e.target.value);
    };

    const handleSubmit = async (callback) => {
        if (!ripplyBody) {
            alert('내용을 입력해주세요');
            return;
        }
        const data = {
            replyBody: ripplyBody,
            contentId: contentId,
            commentId: commentId,
        };
        console.log(data);
        let path = await fetchRipplyWrite(JSON.stringify(data)).then((data) => {
            if (data) {
                console.log(data);
            }
        });
    };
    return (
        <div className="container mt-4 ms-4 mb-4">
            <button className="btn btn-link" onClick={toggleReplyForm}>
                <small>{showReplyForm ? '대댓글 작성 숨기기' : '대댓글 작성 열기'}</small>
            </button>
            {showReplyForm && (
                <form className="row align-items-center">
                    <div className="col-md-8">
                        <textarea
                            placeholder="대댓글을 작성해주세요"
                            className="form-control"
                            id="comment"
                            rows="3"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="col-md-4">
                        <button onClick={handleSubmit} className="btn btn-primary btn-sm ">
                            <small>작성완료</small>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default RipplyWrite;
