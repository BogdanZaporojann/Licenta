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
import PersonalPage from "./components/PersonalPage/PersonalPage";
import { Friends } from "./components/Friends";
import { initializeApp } from "./redux/reducers/appReducer";
import { Preloader } from "./components/Preloader";
import MyPublication from "./components/PersonalPage/MyPublication/MyPublication";
import React from "react";
import Crop from "./components/Crop/Crop";
import ModalEx from "./components/Pan/PanComponent";
import { getRealtimeSocketMessage } from "./redux/reducers/chatReducer";
import { useEffect } from "react"




const App = ({ initialized, username, initializeApp, getRealtimeSocketMessage }) => {

    const handlerMessage = (data) => {
        debugger
        if (data.message) {
            getRealtimeSocketMessage(data)
        }
    }

    const handlerConnect = (data) => {
        console.log('connect : ', data)
    }

    const handlerDisconnect = (data) => {
        console.log('disconnect : ', data)
    }

    const socket = io("https://brainwaveapi.onrender.com", {
        withCredentials: true,
        query: {
            username
        }
    })

    useEffect(() => {



        initializeApp();

        socket.on('user connected', (data) => handlerConnect(data))
        socket.on('private message', (data) => handlerMessage(data))
        socket.on('user disconnected', (data) => handlerDisconnect(data))

        return () => {
            socket.off('user connected', handlerConnect);
            socket.off('private message', handlerMessage);
            socket.off('user disconnected', handlerDisconnect);
        };

    }, [])













    if (!initialized) {
        return <Preloader />
    }



    return (
        <div>
            <Routes>
                <Route path="/posts/:username" element={<MyPublication />} />
                <Route path="/mypost" element={<MyPublication />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/messages/:username" element={<Chat />} />
                <Route path='/post/Engineer/getQuestionByTitle' element={<QuestionsAndAnswers />} />
                <Route path='/' element={<QuestionPageContainer />} />
                <Route path='main' element={<MainPage />} />
                <Route path='registration' element={<Registration />} />
                <Route path='login' element={<Login />} />
                <Route path='personalPage' element={<PersonalPage />} />
                <Route path="crop" element={<Crop />} />
                <Route path="modal" element={<ModalEx />} />
            </Routes>
        </div>
    )
}


let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    username: state.auth.authUsername
})

export default compose(
    connect(mapStateToProps, { initializeApp, getRealtimeSocketMessage })
)(App)