import QuestionPageContainer from "./components/QuestionPage/QuestionPageContainer/QuestionPageContainer";
import { Routes, Route, } from "react-router-dom";
import Registration from "./components/Security/Registration/Registration";
import Login from "./components/Security/Login/Login";
import { MainPage } from "./components/MainPage/MainPage";
import QuestionsAndAnswers from "./components/QuestionAndAnswers/QuestionsAndAnswers";
import Chat from "./components/Chat/Chat";
import { connect } from "react-redux";
import { compose } from "redux";
import { io } from "socket.io-client"
import { PersonalPage } from "./components/PersonalPage/PersonalPage";

function App() {

    const socket = io("https://brainwaveapi.onrender.com", {
        withCredentials: true,
        query: {
            id: localStorage.getItem("user")
        }
    })


    return (
        <div>
            <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path='/post/Engineer/getQuestionByTitle' element={<QuestionsAndAnswers />} />
                <Route path='/' element={<QuestionPageContainer />} />
                <Route path='main' element={<MainPage />} />
                <Route path='registration' element={<Registration />} />
                <Route path='login' element={<Login />} />
                <Route path='personalPage' element={<PersonalPage />}/>
            </Routes>
        </div>
    )
}

const mapStateToProps = state => ({
})

export default compose(
    connect(mapStateToProps,null)
)(App)