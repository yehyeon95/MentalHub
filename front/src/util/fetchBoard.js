const url = process.env.REACT_APP_Server_IP;
const test = '';
/**
 * 글쓰기(단일게시물작성)
 */
export const fetchBoardWrite = async (data) => {
    return fetch(url + '/contents', {
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
 * 단일게시물 조회(비로그인시)
 */

export const fetchSinglePost = async (id) => {
    return fetch(url + `/contents/${id}`, {
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
 * 단일게시물 조회(로그인시)
 */

export const fetchSinglePostLogin = async (id) => {
    return fetch(url + `/contents/${id}/login`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'ngrok-skip-browser-warning': '69420',
            authorization: sessionStorage.getItem('access_token'),
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
    let filterUrl = null;
    if (filter === 'post') {
        filterUrl = `/contents?page=${page}&size=20&type=post`;
    } else if (filter === 'info') {
        filterUrl = `/contents?page=${page}&size=20&type=info`;
    } else if (filter === 'notice') {
        filterUrl = `/contents?page=${page}&size=20&type=notice`;
    }
    return fetch(url + filterUrl, {
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
                //console.log('성공:' + res);
                return res.json();
            }
        })
        .catch((err) => {
            throw Error(err.message);
        });
};
/**
 * 목록 공지 조회
 */

export const fetchPostsNotiList = async (page) => {
    return fetch(url + `/contents?page=1&size=20&type=notice`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'ngrok-skip-browser-warning': '69420',
        },
    })
        .then((res) => {
            if (!res.ok) {
                //console.log('실패:' + res);
                throw Error('유효하지 않은 요청입니다.');
            }
            if (res.ok) {
                //console.log('단일 게시물 조회 성공');
                //console.log('성공:' + res);
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
    return fetch(url + `/contents/${contentId}`, {
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
    return fetch(url + `/contents/${contentId}`, {
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

/**
 * 검색 기능(제목)
 */

export const fetchSearch = async (searchText, searchType) => {
    // console.log('여기까지오는지 확인');
    // console.log(searchText);
    // console.log(searchType);
    let searchUrl = '';
    let id = 0;
    if (sessionStorage.getItem('memberId')) {
        id = sessionStorage.getItem('memberId');
    } else {
        id = 0;
        // 굳이 없어도 될것같기는한데 추가
    }
    if (searchType === '제목') {
        searchUrl = `/contents/search?keyword=${searchText}&searchType=title&memberId=${id}`;
        console.log('title', url);
    } else if (searchType === '제목+닉네임') {
        searchUrl = `/contents/search?keyword=${searchText}&searchType=titleAndBody&memberId=${id}`;
        console.log('titleAndBody', url);
    } else if (searchType === '닉네임') {
        searchUrl = `/contents/search?keyword=${searchText}&searchType=nickname&memberId=${id}`;
        console.log('nickname', url);
    }
    return fetch(url + searchUrl, {
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
                console.log('검색중일로왔음');
                return res.json();
            }
        })
        .then((data) => {
            console.log('검색 data');
            return data;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 마이페이지(내가 쓴글) 조회
 */

export const fetchMyPost = async (id) => {
    return fetch(url + `/contents/mycontents`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지 않은 요청이다.');
            }
            if (res.ok) {
                console.log('내정보조회');
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
 * 마이페이지 요약(summary) 조회
 */

export const fetchMySummary = async (id) => {
    return fetch(url + `/members/mypage/summary`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지 않은 요청이다.');
            }
            if (res.ok) {
                console.log('내정보조회');
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
