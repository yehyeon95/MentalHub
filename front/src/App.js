import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/header"
import Footer from "./components/footer"
import Login from './pages/login'
import Join from './pages/join'
import EditProfile from './pages/editProfile'
import MyPage from './pages/myPage';

//App.js 는 index.js에서 로드하는 파일로 각 컴포넌트에 대한 루트 즉 라우팅을 관리합니다.
function App () {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/myPage" element={<MyPage />} />


            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;