import { useState } from 'react';
import { fetchCommentWrite } from '../util/fetchComment';
function CommentWrite(contentId) {
    const [comment, setComment] = useState('');
    const contentData = contentId;
    const num = contentData.contentId;
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (callback) => {
        if (!comment) {
            alert('내용을 입력해주세요!');
            return;
        }
        const data = {
            commentBody: comment,
            contentId: num,
        };
        console.log(data);
        let path = await fetchCommentWrite(JSON.stringify(data)).then((data) => {
            if (data) {
                console.log(data);
            }
        });
    };

    return (
        <div className="container mt-4">
            <p>댓글 쓰기</p>
            <form className="row">
                <div className="mb-3 col-md-11">
                    <textarea
                        placeholder="댓글을 작성해주세요"
                        className="form-control"
                        id="comment"
                        rows="3"
                        value={comment}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary col-md-1">
                    댓글 작성
                </button>
            </form>
        </div>
    );
}

export default CommentWrite;