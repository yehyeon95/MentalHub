import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/login'
import Join from './components/join'

//App.js 는 index.js에서 로드하는 파일로 각 컴포넌트에 대한 루트 즉 라우팅을 관리합니다.
function App () {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;