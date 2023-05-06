import React, { useState, useRef } from "react"

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
import Crop from "./components/Crop/Crop";
import ModalEx from "./components/Pan/PanComponent";
import { getRealtimeSocketMessage } from "./redux/reducers/chatReducer";
import { useEffect } from "react"
import { SocketContext } from "./components/Socket/createSocketContext";
import { MeetingContex } from "./components/Context/MeetingContext";
import Meet from "./components/Meeting/Meet";
import Modal from "react-modal"

import { getMetteredDomain } from "./redux/reducers/meetingReducer";
import InvitationCall from "./components/InvitationCall/InvitationCall";
import Room from "./MeetSam/pages/Room/Room";
import Main from "./MeetSam/pages/Main/Main"

const meteredMeeting = new window.Metered.Meeting();


const App = ({ initialized, username, authPhotoURL, initializeApp, getRealtimeSocketMessage,
    getMetteredDomain, metteredDomain }) => {


    let roomName;


    const socket = io("https://brainwaveapi.onrender.com", {
        withCredentials: true,
        query: {
            username
        }
    })


    const [isCalled, setIsCalled] = useState(false)
    const [meetingInfo, setMeetingInfo] = useState(false)
    const [meetingJoined, setMeetingJoined] = useState(false)

    socket.on("callTacker", (roomName) => {
        console.log('magnus roomName : ',roomName)
        // setIsCalled(true)

    })

    const localMetteredDomainRef = useRef(null);


    useEffect(() => {
        if (metteredDomain) {
            localMetteredDomainRef.current = metteredDomain;
        }
    }, [metteredDomain])

    const handleJoinMeeting = async (roomName) => {



        await getMetteredDomain()
        while (!localMetteredDomainRef.current) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        const joinResponse = await meteredMeeting.join({
            name: username,
            roomURL: `${localMetteredDomainRef.current + "/" + roomName}`
        });

        // setMeetingJoined(true)
        // const joinResponse = await meteredMeeting.join({
        //   name: username,
        //   roomURL: METERED_DOMAIN + "/" + roomName,
        // });
        // setUsername(username);
        // setRoomName(roomName);
        setMeetingInfo(joinResponse);
        setMeetingJoined(true);
    }


    useEffect(() => {
        initializeApp();
    }, [])



    if (!initialized) {
        return <Preloader />
    }






    return (
        <div>
            <Modal
                isOpen={isCalled}
                style={
                    {
                        content: {
                            padding: '0',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            transform: 'translate(-50%, -50%)',
                            border: 'none',
                            borderRadius: '0  ',
                            width: `500px`,
                            height: "400px",
                            border: "1px solid black",
                            borderRadius: "20px"
                        }
                    }
                }>
                <InvitationCall photoURL={authPhotoURL} username={username} />
            </Modal>

            <SocketContext.Provider value={socket}>
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
                    <Route path="meet" element={<Meet />} />
                </Routes>
            </SocketContext.Provider>
            
        </div>
    )
}


let mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    username: state.auth.authUsername,
    authPhotoURL: state.auth.authPhotoURL,
    metteredDomain: state.meet.metteredDomain,

})

export default compose(
    connect(mapStateToProps, { initializeApp, getRealtimeSocketMessage, getMetteredDomain })
)(App)