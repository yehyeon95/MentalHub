import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserUpdate } from '../util/fetchUser';

function EditPasswordComponent() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [errorPassword, setErrorPassword] = useState(true);

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handlePasswordMatch(e) {
        setConfirmPassword(e.target.value);
        setPasswordMatch(e.target.value === password);
    }

    function checkPassword() {
        const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d`~!@#$%^&*()-_=+]{8,}$/;
        if (!password || !passwordRegExp.test(password)) {
            setErrorPassword(true);
            return false;
        } else {
            setErrorPassword(false);
            return true;
        }
    }

    function validation() {
        if (checkPassword) {
            return true;
        }
        return false;
    }

    function onSubmit(event) {
        event.preventDefault();

        if (validation()) {
            console.log('제출준비완료');
            // front 단에서의 유효성검사(오류 최소화를 위해)
            onUpLoad();
        }
    }

    const onUpLoad = async (callback) => {
        const data = {
            password: password,
        };

        let path = await fetchUserUpdate(JSON.stringify(data)).then((data) => {
            console.log(data);
            if (data.status === 201) {
                navigate('/login');
            }
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="joinForm border p-5">
                <label htmlFor="userId" className="form-label mb-5">
                    새 비밀번호를 입력해주세요
                </label>
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
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <button type="submit" className="btn btn-primary">
                        비밀번호 제출
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditPasswordComponent;
