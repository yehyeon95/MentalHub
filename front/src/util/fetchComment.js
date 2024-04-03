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
            if (res.ok) console.log('댓글작성성공');
            alert('댓글 작성성공');
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};
