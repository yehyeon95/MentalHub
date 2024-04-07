/**
 * 댓글작성
 */

export const fetchCommentWrite = async (data) => {
    return fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            if (res.ok) {
                //console.log(res);
                alert('댓글 작성성공');
            }
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

/**
 * 댓글수정
 */
export const fetchCommentEdit = async (data, num) => {
    return fetch(`/comments/${num}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            if (res.ok) console.log('댓글수정성공');
            alert('댓글 수정 성공');
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

/**
 * 댓글삭제
 */

export const fetchCommentDelete = async (data, num) => {
    return fetch(`/comments/${num}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            if (res.ok) console.log('댓글삭제성공');
            alert('댓글 삭제 성공');
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};
