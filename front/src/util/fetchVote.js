/**
 * 추천(좋아요)
 */
export const fetchUpVote = async (data) => {
    return fetch('/votes/contents', {
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

export const fetchDownVote = async (data) => {
    return fetch('/votes/contents', {
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
