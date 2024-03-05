import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/** 로그인 기능 컴포넌트입니다.
 * 1. useState를 이용해 상태 관리합니다.(아이디, 비밀번호, 아이디에러,비밀번호에러, 승인)
 * 2. 다양한 메서드 onChange, onClick 등의 이벤트 발생시 상태들이 변화하게 설정
 * 3. useEffect를 통해 화면 랜더시의 변화 감지/다만 페이지가 바로 바뀌어버리기 때문에 login에서는 미사용
*/

const Login=()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [invaild, setInvaild] = useState(false);

    const handleEmail=(e)=>{
        setEmail(e.target.value)
        //console.log("userId변화 : "+ userId)
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value)
        //console.log("password변화 : "+ password)
    }
    
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="loginForm border p-5">
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">로그인</label>
                    <input type="email" value={email} onChange={handleEmail} id="email" name="userId" className="form-control" placeholder="* 이메일"></input>
                </div>
                <div className="mb-3">
                    <input type="password" value={password} onChange={handlePassword} id="userPassword" name="userPassword" className="form-control" placeholder="*비밀번호를 입력하세요"></input>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <button type="button" id="loginBtn" className="btn btn-primary">로그인</button>
                    <button type="button" className="btn btn-secondary" onClick={() => window.location.href='/join'}>회원가입</button>
                </div>
            </form>
            
        </div>
    );
}

export default Login;