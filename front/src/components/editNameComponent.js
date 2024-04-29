import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserNameUpdate } from '../util/fetchUser';
function EditNameComponent() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [errorUserName, setErrorUserName] = useState(true);

    function handleUserName(e) {
        setUserName(e.target.value);
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
        if (checkUserName) {
            return true;
        }
        return false;
    }

    function onSubmit(e) {
        e.preventDefault();

        if (validation()) {
            console.log('닉네임변경완료 :' + userName);
            onUpLoad();
        }
    }

    const onUpLoad = async (callback) => {
        const data = {
            nickname: userName,
        };

        let path = await fetchUserNameUpdate(JSON.stringify(data)).then((data) => {
            console.log(data);
            if (data) {
                alert('닉네임변경완료');
                navigate('/myPage');
            }
        });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={onSubmit} className="changePasswordForm border p-5">
                <label className="form-label mb-5">회원정보 수정</label>
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
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <button type="submit" className="btn btn-primary">
                        닉네임변경하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditNameComponent;
