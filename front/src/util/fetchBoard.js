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

export const fetchSinglePost = async (data) => {
    //console.log('fetch 들어옴');
    return fetch('/contents/10', {
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

export const fetchBoardPosts = () => {
    return fetch('/contents?page=1&size=20&type=post', {
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
