import {useState} from 'react';

function JoinComponent(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [userName, setUserName] = useState('')

    const [errorEmail, setErrorEmail] = useState(true)
    const [errorPassword, setErrorPassword] = useState(true)
    const [errorUserName, setErrorUserName] = useState(true)
    const [isValidation, setIsValidation] = useState(false)

    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value)
        //console.log(password)
        //setErrorPassword(false)
    }

    const handlePasswordMatch=(e)=>{
        setConfirmPassword(e.target.value) //두번째 비밀번호 입력 -> 여기는 값이 들어가야하고
        setPasswordMatch(e.target.value === password) //비밀번호가 일치하는지 확인 -> 여기는 boolean값이 들어가기 때문에 두개로 나누어야함
    }

    const handleUserName=(e)=>{
        setUserName(e.target.value)
    }

    function checkEmail() {
        const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!email || !emailRegExp.test(email)){
            setErrorEmail(true);
            return false;
        } else {
            setErrorEmail(false);
            return true
        }
    }

    function checkPassword(){
        const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d`~!@#$%^&*()-_=+]{8,}$/;
        if(!password || !passwordRegExp.test(password)){
            setErrorPassword(true)
            return false
        } else {
            setErrorPassword(false)
            return true
        }
    }

    function checkUserName(){
        if(!userName){
            setErrorUserName(true)
            return false
        }   else {
            setErrorUserName(false)
            return true
        }
    }

    function validation(){
        checkEmail()
        ? console.log('Email 유효')
        : console.log('Email 유효하지않음')
        checkPassword()
        ? console.log('Password 유효')
        : console.log('Password 유효하지않음')
        checkUserName()
        ? console.log('userName 유효')
        : console.log('userName 유효하지않음')

        console.log('checkEmail :'+errorEmail)
        console.log('checkPassword :'+errorPassword)
        console.log('checkUserName : ' + errorUserName)

        if (checkEmail() && checkPassword() && checkUserName){
            console.log(email + '' + password + '' + confirmPassword + '' + userName)
            console.log('join ready')
            return true
        }
        return false;
    }

    function onSubmit(event) {
        event.preventDefault();

        if(validation()) {
            console.log('제출준비완료');
            onUpLoad();
        }
    }

    const onUpLoad = async (callback) => {
        // server와 통신하하는 곳 추후 작성
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="joinForm border p-5">
                    <label htmlFor="userId" className="form-label mb-5">회원가입을 위해 정보를 입력해주세요</label>
                <div className="mb-3">
                    <input type="email" onChange={handleEmail}id="email" name="userId" className="form-control" placeholder="* 이메일"></input>
                    {errorEmail && <p className="text-danger">Email 형식으로 작성해주세요</p>}
                </div>
                <div className="mb-3">
                    <input type="password" onChange={handlePassword} id="userPassword" name="userPassword" className="form-control" placeholder="*비밀번호를 입력하세요"></input>
                    {errorPassword && <p className="text-danger">비밀번호는 영어, 숫자, 특수문자가 포함된 8자 이상이어야합니다.</p>}
                </div>
                <div className="mb-3">
                    <input type="password" onChange={handlePasswordMatch} id="checkedPassword" name="checkedPassword" className="form-control" placeholder="* 비밀번호를 한번 더 입력해주세요"></input>
                    {!passwordMatch && <p className="text-danger">비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div className="mb-3">
                    <input type="text" id="userName" onChange={handleUserName} name="userName" className="form-control" placeholder="* 닉네임"></input>
                    {errorUserName && <p className="text-danger">닉네임을 작성해주세요</p>}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    {/* <button type="submit" className="btn btn-primary" onClick={() => window.location.href='/'}>회원가입</button> */}
                    <button type="submit" className="btn btn-primary">회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default JoinComponent 