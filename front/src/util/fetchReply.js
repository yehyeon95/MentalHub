const url = process.env.REACT_APP_Server_IP;

/**
 * 리플작성
 */

export const fetchReplyWrite = async (data) => {
    return fetch(url + '/replies', {
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
                alert('대댓글 작성성공');
            }
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

/**
 * 리플수정
 */
export const fetchReplyEdit = async (data, num) => {
    return fetch(url + `/replies/${num}`, {
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
            if (res.ok) console.log('대댓글수정성공');
            alert('대댓글 수정 성공');
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

/**
 * 리플삭제
 */

export const fetchReplyDelete = async (data, num) => {
    return fetch(url + `/replies/${num}`, {
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
            if (res.ok) console.log('대댓글삭제성공');
            alert('대댓글 삭제 성공');
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};
