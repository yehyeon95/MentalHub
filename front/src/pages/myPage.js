import Profile from "../components/profile";
import Summary from "../components/summary";
import MyPosts from "../components/myposts";
import MyAnswers from "../components/myanswers";

const MyPage= () => {
    return (
        <div>
            <div>
                <Profile />
            </div>
            <div>
                <Summary />
                <MyPosts />
                <MyAnswers />
            </div>
        </div>
    );
}

export default MyPage;