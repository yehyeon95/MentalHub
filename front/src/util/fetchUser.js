/**
 * 회원가입
 */
export const fetchUserJoin  = async(data) => {
    return fetch('/members',{
        method : 'POST',
        headers: {'Content-Type': 'application/json;charset=UTF-8'},
        body:data,
    })
        .then((res)=>{
            if(!res.ok){
                if(res.status===500) console.log('이미 존재하는 이메일입니다.')
                throw Error ('could not fetch the data for that resource');
            }
            if(res.status === 200)
                console.log('회원가입이 성공했습니다.')
            return res;
        })
        .catch((error) => {
            console.log(error.message);
        });
}

/**
 * 로그인
 */
export const fetchUserLogin = async(data) =>{
    return fetch('/login',{
        method:'POST',
        headers : {'Content-Type':'application/json;charset=UTF-8'},
        body:data,
    })
        .then((res)=>{
            if(!res.ok){
                if(res.status===401)
                console.log('이메일 또는 패스워드가 틀렸습니다.')
                throw Error('could not fetch the data for that resource')
            }
            if(res.status===200){
                console.log('로그인 성공')
                const accessToken = res.headers.get('Authorization');
                const refreshToken = res.headers.get('refresh');
                sessionStorage.setItem('access_token',accessToken)
                sessionStorage.setItem('refresh_token',refreshToken)
            }
            return res
        })
        .catch((err)=>{
            console.log(err.message)
        })
};

/**
 * 회원탈퇴
 */
export const fetchUserDelete = async(data) => {
    return fetch('/members',{
        method:'DELETE',
        headers:{authorization: sessionStorage.getItem('access_token')}
    })
    .then((res)=>{
        if(!res.ok){
            throw Error('잘못된 요청입니다.')
        }
        console.log('User deletion successful.');
        return res
    })
    .catch((err)=>{
        throw Error(err.message)
    })
}

/**
 * 회원정보수정
 */
export const fetchUserUpdate = async(data) => {
    return fetch('/members',{
        method : 'PATCH',
        headers:{
            'content-type' :'application/json;charset=UTF-8',
            authorization : sessionStorage.getItem('access_token')    },
        body:data
    })
    .then((res)=>{
        if(!res.ok){
            throw Error('유효하지 않은 요청입니다.');
        }
        return res.json();
    })
    .then((res)=>{
        if(res.status===204){
            throw Error('회원탈퇴가 완료되었습니다.');
        }
        return res.json();
    })
    .then((data)=>{
        return data.data;
    })
    .catch((err)=>{
        throw Error(err.message)
    })
}

/**
 * 회원정보조회
 */

export const fetchUserInfo=async(data)=>{
    console.log('getUserInfo 함수 진입')
    return fetch('/members/4',{
        method:'GET',
        headers : {
            'content-type' :'application/json;charset=UTF-8',
            authorization : sessionStorage.getItem('access_token')    }
    })
    .then((res)=>{
        if(!res.ok){
            console.log('어디서 잘못된것인가')
            throw Error('유효하지 않은 요청입니다.');
        }
        return res.json();
    })
    .then((res)=>{
        if(res.status===200){
            console.log('유정정보를 조회했습니다.')
            return res;
        } else {
            throw Error('유저정보를 조회하지 못했습니다.')
        }
        
    })
    .catch((err)=>{
        throw Error(err.message);
    })
}