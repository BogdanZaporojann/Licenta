import React, { useState, useRef } from "react"

import QuestionPageContainer from "./components/QuestionPage/QuestionPageContainer/QuestionPageContainer";
import { Routes, Route, useNavigate, } from "react-router-dom";
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
import { useEffect } from "react"
import { SocketContext } from "./components/Socket/createSocketContext";
import Meet from "./components/Meeting/Meet";
import Modal from "react-modal"

import InvitationCall from "./components/InvitationCall/InvitationCall";



const App = ({ initialized, username, authPhotoURL, initializeApp }) => {

    //для передачи через пропс к InvitationCall для отклонения звонка
    const [userCallTacker, setUserCallTacker] = useState("")
    const [roomNameCallTacker, setRoomNameCallTacker] = useState("")
    //от isCalled зависит попап звонка
    const [isCalled, setIsCalled] = useState(false)
    // const navigate = useNavigate()
    const [callWasAccept,setCallWasAccept] = useState(false)

    const socketRef = useRef()
    const [socket, setSocket] = useState()
    const [toUser, setToUser] = useState("")

    const modalCallApeare = () => {
        setIsCalled(true)
        setTimeout(() => {
            setIsCalled(false)
            // socket.emit("declinedCall", { data: { toUserName: username } })
        }, 5000);
    }


    useEffect(() => {
        initializeApp();
    }, [])





    useEffect(() => {
        if (initialized) {
            socketRef.current = io("https://brainwaveapi.onrender.com", {
                withCredentials: true,
                query: {
                    username
                }
            })


            socketRef.current.on("callTacker", ({ roomName, fromUserName }) => {
                debugger
                // modalCallApeare()
                fromUserName && setUserCallTacker(fromUserName);

                roomName && setRoomNameCallTacker(roomName);
                //arara
                
                    (() => {
                        setIsCalled(true)
                        setTimeout(() => {
                            setIsCalled(false)
                            console.log('from root callWasAccept : ',callWasAccept)
                            (!callWasAccept) && socketRef.current.emit("declinedCall", { data: { toUserName: fromUserName } })
                        }, 5000);
                    })()
                //мы установили у чувака который получил приглашения на встречу roomName встречи в поле inviteRoomName
                // navigate(`/meet?roomNameInvite=${roomName}`)
            })

            // socketRef.current.on("responseDeclinedCall", (result) => {
            //     debugger
            // })







            setSocket(socketRef.current)

        }
    }, [initialized])





    if (!initialized) {
        return <Preloader />
    }



    return (
        <div>


            <SocketContext.Provider value={socket}>

                <Modal
                    isOpen={isCalled}
                    // isOpen={true}
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
                    <InvitationCall
                        setIsCalled={setIsCalled}
                        photoURL={authPhotoURL}
                        toUserName={username}
                        userCallTacker={userCallTacker}
                        roomNameCallTacker={roomNameCallTacker}
                        setCallWasAccept={setCallWasAccept} />
                </Modal>


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
    connect(mapStateToProps, { initializeApp })
)(App)