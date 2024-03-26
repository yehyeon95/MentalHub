/**
 * 글쓰기(단일게시물작성)
 */
export const fetchBoardWrite = async (data) => {
    return fetch('/contents', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.ok) {
                //console.log('글작성 okay');
                return res.json();
            }
        })
        .then((data) => {
            //console.log(data);
            return data;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};
