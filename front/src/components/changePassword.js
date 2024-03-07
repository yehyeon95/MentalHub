import {useState} from 'react'


function ChangePasswordComponent (){

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [errorPassword, setErrorPassword] = useState(true)
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const handlePasswordMatch = (e) => {
        setConfirmPassword(e.target.value)
        setPasswordMatch(e.target.value === password)
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

    function validation(){
        checkPassword()
        ? console.log('password 유효')
        : console.log('password 유효하지않음')

        if (checkPassword){
            return true
        }
        return false
    }

    function onSubmit(e){
        e.preventDefault();

        if(validation()){
            console.log('변경준비완료')
            onUpLoad();
            alert('비밀번호 변경이 완료되었습니다.')
            window.location.href='login'
        }
    }

    const onUpLoad = async (callback) => {
        //server와의 api 통신
    }



    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <form onSubmit={onSubmit} className='changePasswordForm border p-5'>
                <label className='form-label mb-5'>새로운 비밀번호를 입력해주세요</label> 
                <div className="mb-3">
                    <input type="password" onChange={handlePassword} id="password" name='password' className="form-control" placeholder="* 비밀번호를 입력하세요"></input>
                    {errorPassword &&<p className="text-danger">비밀번호는 영어, 숫자, 특수문자가 포함된 8자 이상이어야합니다.</p>}
                </div>
                <div className="mb-3">
                    <input type="password" onChange={handlePasswordMatch} id="checkPassword" name='checkPassword' className="form-control" placeholder="* 비밀번호를 한번 더 입력하세요"></input>
                    {!passwordMatch &&<p className="text-danger">비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <button type="submit" className="btn btn-primary">비밀번호 변경</button>
                </div>
            </form>
        </div>
    )

}

export default ChangePasswordComponent;