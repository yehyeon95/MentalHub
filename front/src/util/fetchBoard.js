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

/**
 * 단일게시물 조회
 */

export const fetchSinglePost = async (id) => {
    return fetch(`/contents/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'ngrok-skip-browser-warning': '69420',
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지 않은 요청이다.');
            }
            if (res.ok) {
                //console.log('단일 게시물 조회 성공');
                return res.json();
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 게시글 목록 조회
 */

export const fetchPostsList = async (page, filter) => {
    let url = null;
    if (filter === 'post') {
        url = `/contents?page=${page}&size=20&type=post`;
    } else if (filter === 'info') {
        url = `/contents?page=${page}&size=20&type=info`;
    } else if (filter === 'notice') {
        url = `/contents?page=${page}&size=20&type=notice`;
    }
    return fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'ngrok-skip-browser-warning': '69420',
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.log('실패:' + res);
                throw Error('유효하지 않은 요청입니다.');
            }
            if (res.ok) {
                //console.log('단일 게시물 조회 성공');
                console.log('성공:' + res);
                return res.json();
            }
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 게시글 수정
 */

export const fetchPostUpdate = async (contentId, data) => {
    return fetch(`/contents/${contentId}`, {
        method: 'PATCH',
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
                //console.log('글수정 okay');
                return res.json();
            }
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 게시글 삭제
 */

export const fetchPostDelete = async (contentId) => {
    return fetch(`/contents/${contentId}`, {
        method: 'DELETE',
        headers: { authorization: sessionStorage.getItem('access_token') },
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('잘못된 요청입니다.');
            }
            if (res.ok) {
                console.log('게시글 삭제완료');
                return res;
            }
        })
        .catch((err) => {
            throw Error(err.message);
        });
};
