import { useState } from 'react';
import { fetchCommentWrite } from '../util/fetchComment';
function CommentWrite(contentId) {
    const [comment, setComment] = useState('');
    const contentData = contentId;
    const num = contentData.contentId;
    const handleChange = (e) => {
        setComment(e.target.value);
        // console.log(comment);
        // console.log(num);
        // console.log(contentId);
    };

    const handleSubmit = async (callback) => {
        if (!comment) {
            alert('내용을 입력해주세요!');
        }
        const data = {
            commentBody: comment,
            contentId: num,
        };

        let path = await fetchCommentWrite(JSON.stringify(data)).then((data) => {
            if (data) {
                console.log(data);
            }
        });
    };

    return (
        <div className="container mt-4">
            <h4>댓글 쓰기</h4>
            <form onSubmit={handleSubmit} className="row">
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
                <button type="submit" className="btn btn-primary col-md-1">
                    댓글 작성
                </button>
            </form>
        </div>
    );
}

export default CommentWrite;
