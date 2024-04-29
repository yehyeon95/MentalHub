import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserPasswordUpdate, fetchUserPrePassword } from '../util/fetchUser';

function EditPasswordComponent() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [errorPassword, setErrorPassword] = useState(true);
    const [preErrorPassword, setPreErrorPassword] = useState(true);
    const [prePassword, setPrePassword] = useState('');
    const [checkedPassword, setCheckedPassword] = useState(false);

    /**
     * 사용자 확인로직(기존비밀번호 확인)
     */
    function handleCheckedPassword(e) {
        setPrePassword(e.target.value);
    }
    function checkPrePassword() {
        const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d`~!@#$%^&*()-_=+]{8,}$/;
        if (!prePassword || !passwordRegExp.test(prePassword)) {
            setPreErrorPassword(true);
            return false;
        } else {
            setPreErrorPassword(false);
            return true;
        }
    }

    function preValidation() {
        if (checkPrePassword) {
            return true;
        } else {
            return false;
        }
    }

    function prePasswordOnSubmit(e) {
        e.preventDefault();
        if (!preValidation()) {
            alert('패스워드는 영어,숫자,특수문자가 포함된 8글자 이상입니다.');
            return;
        } else {
            preOnUpload();
        }
    }
    const preOnUpload = async (callback) => {
        console.log('pre패스워드', prePassword);
        const data = {
            password: prePassword,
        };
        console.log('패스워드확인');
        let path = await fetchUserPrePassword(JSON.stringify(data)).then((data) => {
            console.log(data);
            if (data === true) {
                setCheckedPassword(true);
                alert('비밀번호 확인 완료');
                //TODO : 여기다가 초기화 setPrePassword('');
                setPassword('');
            }
        });
    };
    /**
     * 비밀번호 변경로직
     */
    function handlePassword(e) {
        setPassword(e.target.value);
        checkPassword(e.target.value);
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
        if (checkPassword()) {
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

        let path = await fetchUserPasswordUpdate(JSON.stringify(data)).then((data) => {
            console.log(data);
            if (data) {
                alert('비밀번호번경이 성공했습니다. 다시 로그인해주세요');
                sessionStorage.clear();
                navigate('/login');
            }
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form
                onSubmit={checkedPassword ? onSubmit : prePasswordOnSubmit}
                className={`border p-5 ${checkedPassword ? '' : 'disabled'}`}
            >
                <div>
                    <label className="form-label mb-3">사용자 확인을 위해서 기존 비밀번호를 입력해주세요</label>
                    <div className="mb-3">
                        <input
                            type="password"
                            onChange={handleCheckedPassword}
                            id="preUserPassword"
                            name="preUserPassword"
                            className="form-control"
                            placeholder="*비밀번호를 입력하세요"
                            disabled={checkedPassword}
                        ></input>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <button
                            type="submit"
                            className={`btn btn-primary ${!checkedPassword ? '' : 'disabled'}`}
                            disabled={checkedPassword}
                        >
                            비밀번호 확인
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="userId" className="form-label mb-2 mt-5">
                        새 비밀번호를 입력해주세요
                    </label>
                    <div className="mb-3">
                        <input
                            type="password"
                            onChange={handlePassword}
                            id="userPassword"
                            name="userPassword"
                            className={`form-control ${checkedPassword ? '' : 'disabled'}`}
                            placeholder="*비밀번호를 입력하세요"
                            disabled={!checkedPassword}
                        ></input>
                        {errorPassword && (
                            <p className="text-danger">
                                비밀번호는 영어, 숫자, 특수문자가 포함된 8자 이상이어야합니다.
                            </p>
                        )}
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            onChange={handlePasswordMatch}
                            id="checkedPassword"
                            name="checkedPassword"
                            className={`form-control ${checkedPassword ? '' : 'disabled'}`}
                            placeholder="* 비밀번호를 한번 더 입력해주세요"
                            disabled={!checkedPassword}
                        ></input>
                        {!passwordMatch && <p className="text-danger">비밀번호가 일치하지 않습니다.</p>}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <button
                            type="submit"
                            className={`btn btn-primary ${checkedPassword ? '' : 'disabled'}`}
                            disabled={!checkedPassword}
                        >
                            비밀번호 제출
                        </button>
                    </div>
                </div>
            </form>
        </div>

        // <div className="container d-flex justify-content-center align-items-center vh-100">
        //     {!checkedPassword ? (
        //         <form onSubmit={prePasswordOnSubmit} className="border p-5">
        //             <label className="form-label mb-5">사용자 확인을 위해서 기존 비밀번호를 입력해주세요</label>
        //             <div className="mb-3">
        //                 <input
        //                     type="password"
        //                     onChange={handleCheckedPassword}
        //                     id="preUserPassword"
        //                     name="preUserPassword"
        //                     className="form-control"
        //                     placeholder="*비밀번호를 입력하세요"
        //                 ></input>
        //             </div>
        //             <div className="d-flex justify-content-between align-items-center mt-5">
        //                 <button type="submit" className="btn btn-primary">
        //                     비밀번호 제출
        //                 </button>
        //             </div>
        //         </form>
        //     ) : (
        //         <form onSubmit={onSubmit} className="joinForm border p-5">
        //             <label htmlFor="userId" className="form-label mb-5">
        //                 새 비밀번호를 입력해주세요
        //             </label>
        //             <div className="mb-3">
        //                 <input
        //                     type="password"
        //                     onChange={handlePassword}
        //                     id="userPassword"
        //                     name="userPassword"
        //                     className="form-control"
        //                     placeholder="*비밀번호를 입력하세요"
        //                 ></input>
        //                 {errorPassword && (
        //                     <p className="text-danger">
        //                         비밀번호는 영어, 숫자, 특수문자가 포함된 8자 이상이어야합니다.
        //                     </p>
        //                 )}
        //             </div>
        //             <div className="mb-3">
        //                 <input
        //                     type="password"
        //                     onChange={handlePasswordMatch}
        //                     id="checkedPassword"
        //                     name="checkedPassword"
        //                     className="form-control"
        //                     placeholder="* 비밀번호를 한번 더 입력해주세요"
        //                 ></input>
        //                 {!passwordMatch && <p className="text-danger">비밀번호가 일치하지 않습니다.</p>}
        //             </div>
        //             <div className="d-flex justify-content-between align-items-center mt-2">
        //                 <button type="submit" className="btn btn-primary">
        //                     비밀번호 제출
        //                 </button>
        //             </div>
        //         </form>
        //     )}
        // </div>
    );
}

export default EditPasswordComponent;
