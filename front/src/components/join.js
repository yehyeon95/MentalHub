import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserJoin, fetchDuplicationEmail, fetchDuplicationNickName } from '../util/fetchUser';
function JoinComponent() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [userName, setUserName] = useState('');

    const [errorEmail, setErrorEmail] = useState(true);
    const [errorPassword, setErrorPassword] = useState(true);
    const [errorUserName, setErrorUserName] = useState(true);
    const [duplicationEmail, setDuplicationEmail] = useState(false);
    const [duplicationUserName, setDuplicationUserName] = useState(false);
    const [validationButton, setValidationButton] = useState(false);

    const [emailCheckState, setEmailCheckState] = useState(false);
    const [useNameCheckState, setUserNameCheckState] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        checkEmail(e.target.value);
        console.log(errorEmail);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        checkPassword(e.target.value);
    };

    const handlePasswordMatch = (e) => {
        setConfirmPassword(e.target.value); //두번째 비밀번호 입력 -> 여기는 값이 들어가야하고
        setPasswordMatch(e.target.value === password); //비밀번호가 일치하는지 확인 -> 여기는 boolean값이 들어가기 때문에 두개로 나누어야함
    };

    const handleUserName = (e) => {
        setUserName(e.target.value);
        checkUserName(e.target.value);
    };

    function checkEmail() {
        const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!email || !emailRegExp.test(email)) {
            setErrorEmail(true);
            return false;
        } else {
            setErrorEmail(false);
            return true;
        }
    }

    function checkPassword() {
        const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d`~!@#$%^&*()-_=+]{8,}$/;
        if (!password || !passwordRegExp.test(password)) {
            console.log(errorPassword);
            setErrorPassword(true);
            return false;
        } else {
            setErrorPassword(false);
            return true;
        }
    }

    function checkUserName() {
        if (!userName) {
            setErrorUserName(true);
            return false;
        } else {
            setErrorUserName(false);
            return true;
        }
    }

    function validation() {
        if (checkEmail() && duplicationEmail === true) {
            console.log('Email 유효성 통과(중복검사포함)');
            console.log(checkEmail());
            console.log(duplicationEmail);
        } else {
            console.log('Email 유효성 통과 실패');
            return false;
        }

        if (checkPassword()) {
            console.log('password 유효성 통과');
        } else {
            console.log('password 유효성 통과 실패');
            return false;
        }

        if (checkUserName() && duplicationUserName === true) {
            console.log('닉네임 유효성 통과(중복검사포함)');
        } else {
            console.log('닉네임 유효성 통과 실패');
            return false;
        }

        console.log('checkEmail :' + errorEmail);
        console.log('checkPassword :' + errorPassword);
        console.log('checkUserName : ' + errorUserName);

        if (
            checkEmail() &&
            checkPassword() &&
            checkUserName() &&
            duplicationEmail === true &&
            duplicationUserName === true
        ) {
            console.log(email + '' + password + '' + confirmPassword + '' + userName);
            console.log('join ready');
            setValidationButton(true);
            return true;
        }
        setValidationButton(false);
        return false;
    }

    function onSubmit(event) {
        event.preventDefault();

        if (validation()) {
            console.log('제출준비완료');
            // front 단에서의 유효성검사(오류 최소화를 위해)
            onJoin();
        }
    }

    const onJoin = async (callback) => {
        const data = {
            email: email,
            password: password,
            nickname: userName,
        };

        const goLogin = () => {
            navigate('/login');
        };

        let path = await fetchUserJoin(JSON.stringify(data)).then((data) => {
            console.log(data);
            if (data.status === 200) goLogin();
        });
    };

    const handleEmailDuplicationCheck = async (callback) => {
        const data = {
            email: email,
        };

        let path = await fetchDuplicationEmail(JSON.stringify(data)).then((data) => {
            if (data === false) {
                setDuplicationEmail(true);
                setEmailCheckState(true);
                alert('이메일을 사용하실수있습니다.');
                console.log('이메일 중복 검사 통과');
            } else {
                alert('이미 사용중인 이메일입니다.');
            }
        });
    };

    const handleUserNameDuplicationCheck = async (callback) => {
        const data = {
            nickname: userName,
        };

        let path = await fetchDuplicationNickName(JSON.stringify(data)).then((data) => {
            if (data === false) {
                setDuplicationUserName(true);
                setUserNameCheckState(true);
                console.log('닉네임중복검사통과');
                alert('닉네임을 사용하실수있습니다.');
            } else {
                alert('이미 사용중인 닉네임입니다.');
            }
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="joinForm border p-5">
                <label htmlFor="userId" className="form-label mb-5">
                    회원가입을 위해 정보를 입력해주세요
                </label>
                <div className="mb-3">
                    <input
                        type="email"
                        onChange={handleEmail}
                        id="email"
                        name="userId"
                        className="form-control"
                        placeholder="* 이메일"
                    ></input>
                    {errorEmail && <p className="text-danger">Email 형식으로 작성해주세요</p>}
                    {duplicationEmail && <p className="text-success">이메일 중복 검사 통과</p>}
                    <button type="button" onClick={handleEmailDuplicationCheck} className="btn btn-secondary mb-2">
                        이메일 중복검사
                    </button>
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        onChange={handlePassword}
                        id="userPassword"
                        name="userPassword"
                        className="form-control"
                        placeholder="*비밀번호를 입력하세요"
                    ></input>
                    {errorPassword && (
                        <p className="text-danger">비밀번호는 영어, 숫자, 특수문자가 포함된 8자 이상이어야합니다.</p>
                    )}
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        onChange={handlePasswordMatch}
                        id="checkedPassword"
                        name="checkedPassword"
                        className="form-control"
                        placeholder="* 비밀번호를 한번 더 입력해주세요"
                    ></input>
                    {!passwordMatch && <p className="text-danger">비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        id="userName"
                        onChange={handleUserName}
                        name="userName"
                        className="form-control"
                        placeholder="* 닉네임"
                    ></input>
                    {errorUserName && <p className="text-danger">닉네임을 작성해주세요</p>}
                    {duplicationUserName && <p className="text-success">이메일 중복 검사 통과</p>}
                    <button
                        type="button"
                        onClick={handleUserNameDuplicationCheck}
                        className="btn btn-secondary mb-2 mt-2"
                    >
                        닉네임 중복검사
                    </button>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    {/* <button type="submit" className="btn btn-primary" onClick={() => window.location.href='/'}>회원가입</button> */}
                    <button type="submit" className="btn btn-primary">
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
}

export default JoinComponent;
