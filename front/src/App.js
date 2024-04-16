import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Login from './pages/login';
import Join from './pages/join';
import EditProfile from './pages/editProfile';
import EditName from './pages/editName';
import EditPassword from './pages/editPassword';
import MyPage from './pages/myPage';
import Board from './pages/board';
import Write from './pages/write';
import SingleView from './pages/singleView';
import EditWrite from './pages/editWrite';
import SearchBoard from './pages/searchBoard';
import { Provider } from 'react-redux';
import store from './redux/store';
//App.js 는 index.js에서 로드하는 파일로 각 컴포넌트에 대한 루트 즉 라우팅을 관리합니다.
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Board />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/editName" element={<EditName />} />
                    <Route path="/editPassword" element={<EditPassword />} />
                    <Route path="/editProfile" element={<EditProfile />} />
                    <Route path="/myPage" element={<MyPage />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/contents/:id" element={<SingleView />} />
                    <Route path="/contents/edit/:id" element={<EditWrite />} />
                    <Route path="/search" element={<SearchBoard />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
