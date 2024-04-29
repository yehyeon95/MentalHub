const url = process.env.REACT_APP_Server_IP;

/**
 * 게시물 추천(좋아요)
 */
export const fetchUpVote = async (data) => {
    return fetch(url + '/votes/contents', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.ok) {
                return res.json;
            }
        })
        .catch((err) => {
            throw Error(err.message);
        });
};
/**
 * 게시물 추천취소(싫어요)
 */
export const fetchDownVote = async (data) => {
    return fetch(url + '/votes/contents', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.ok) {
                return res.json;
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
 * 댓글 추천(좋아요)
 */
export const fetchUpVoteComment = async (data) => {
    return fetch(url + '/votes/comments', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.ok) {
                return res.json;
            }
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 댓글 추천취소(싫어요)
 */
export const fetchDownVoteComment = async (data) => {
    return fetch(url + '/votes/comments', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.ok) {
                return res.json;
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
 * 리플 추천(좋아요)
 */
export const fetchUpVoteReply = async (data) => {
    return fetch(url + '/votes/replies', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.ok) {
                return res.json;
            }
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 댓글 추천취소(싫어요)
 */
export const fetchDownVoteReply = async (data) => {
    return fetch(url + '/votes/replies', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.ok) {
                return res.json;
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};
