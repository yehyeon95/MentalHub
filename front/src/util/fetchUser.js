const url = process.env.REACT_APP_Server_IP;

/**
 * 회원가입
 */
export const fetchUserJoin = async (data) => {
    return fetch(url + '/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 500) console.log('이미 존재하는 이메일입니다.');
                throw Error('could not fetch the data for that resource');
            }
            if (res.status === 200) console.log('회원가입이 성공했습니다.');
            alert('회원가입에 성공했습니다. 로그인해주세요');
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
};

/**
 * 로그인
 */
export const fetchUserLogin = async (data) => {
    return fetch(url + '/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json;charset=UTF-8', 'ngrok-skip-browser-warning': '69420' },
        credentials: 'include',
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                if (res.status === 401) console.log('이메일 또는 패스워드가 틀렸습니다.');
                alert('로그인에 실패했습니다. 아이디와 패스워드를 확인해주세요');
                throw Error('could not fetch the data for that resource');
            }
            if (res.status === 200) {
                const accessToken = res.headers.get('Authorization');
                const refreshToken = res.headers.get('refresh');
                sessionStorage.setItem('access_token', accessToken);
                sessionStorage.setItem('refresh_token', refreshToken);
                console.log('로그인 성공');
                return res.json(); //json 데이터로 파싱하여 반환
            }
        })
        .then((data) => {
            const memberId = data.memberId;
            console.log(data);
            console.log(memberId);
            sessionStorage.setItem('memberId', memberId);
            return data;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

/**
 * 회원탈퇴
 */
export const fetchUserDelete = async (data) => {
    return fetch(url + '/members', {
        method: 'DELETE',
        headers: { authorization: sessionStorage.getItem('access_token') },
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('잘못된 요청입니다.');
            }
            console.log('User deletion successful.');
            return res;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 사용자확인(기존 비밀번호 확인)
 */
export const fetchUserPrePassword = async (data) => {
    return fetch(url + '/members/checkpassword', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지 않은 요청입니다.');
            }
            console.log(res);
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 닉네임 수정
 */
export const fetchUserNameUpdate = async (data) => {
    return fetch(url + '/members/nickname', {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
        },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('유효하지 않은 요청입니다.');
            }
            if (res.ok) {
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
 * 비밀번호 수정
 */
export const fetchUserPasswordUpdate = async (data) => {
    return fetch(url + '/members/password', {
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
 * 회원정보조회
 */
export const fetchUserInfo = async (data) => {
    //console.log('getUserInfo 함수 진입');
    return fetch(url + '/members/userinfo', {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
            'ngrok-skip-browser-warning': '69420',
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.log('어디서 잘못된것인가');
                throw Error('유효하지 않은 요청입니다.');
            }
            if (res.status === 200) {
                console.log('유정정보를 조회했습니다.');
                return res.json();
            }
        })
        .then((data) => {
            console.log(data.nickname);
            console.log(data);
            return data;
        })
        .catch((err) => {
            throw Error(err.message);
        });
};
/**
 * 로그아웃
 */
export const fetchUserLogOut = async (data) => {
    return fetch(url + '/member/logout', {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            authorization: sessionStorage.getItem('access_token'),
        },
    })
        .then((res) => {
            if (!res.ok) {
                console.log('로그아웃안됨');
                throw Error('유효하지않은 요청입니다.');
            }
            if (res.status === 200) {
                console.log('로그아웃성공');
                console.log(res);
                return res;
            }
        })
        .catch((err) => {
            throw Error(err.message);
        });
};

/**
 * 이메일중복검사
 */

export const fetchDuplicationEmail = async (data) => {
    return fetch(url + '/members/duplicate/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(err.message);
        });
};

/**
 * 닉네임중복검사
 */

export const fetchDuplicationNickName = async (data) => {
    return fetch(url + '/members/duplicate/nickname', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: data,
    })
        .then((res) => {
            if (!res.ok) {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err.message);
        });
};
