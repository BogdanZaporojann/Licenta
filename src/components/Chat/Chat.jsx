import style from "./Chat.module.scss"
import home from "../../assets/svg/home.svg"
import React, { useContext } from "react"
import { connect } from "react-redux"
import { compose } from "redux";
import { getChats, sendMessage, getConversation, getRealtimeSocketMessage } from "../../redux/reducers/chatReducer";
import { AddChatMessage } from "./AddChatMessage"
import { MessageInstance } from "./MessageInstance/MessageInstance"
import classNames from "classnames"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { getUserInfoByUsername } from "../../redux/reducers/authReducer"
import DialogInstance from "../DialogInstance/DialogInstance"
import { LeftSidebarShortcuts } from "../PersonalPage/LeftSidebarShortcuts/LeftSidebarShortcuts";
import { SocketContext } from "../Socket/createSocketContext";
import info from "../../assets/svg/info.svg"
import cameraVideo from "../../assets/svg/cameraVideo.svg"
import phoneCall from "../../assets/svg/phoneCall.svg"


const Chat = ({
    getUserInfoByUsername,
    getRealtimeSocketMessage,
    messagesArray,
    getConversation,
    getChats,
    sendMessage,
    authName,
    photoUrl,
    authPhotoUrl,
    chats,
    chatUserName }) => {

    const { username } = useParams();
    const [userName, setUserName] = useState('')


    const socket = useContext(SocketContext)


    useEffect(() => {
        getUserInfoByUsername(username)
        setUserName(username)
        socket.on("private message", (data) => {
            getRealtimeSocketMessage(data)

        })
    }, [])

    useEffect(() => {
        getConversation(userName)

        getChats()
    }, [userName, sendMessage])




    const handleChangeChat = () => {

    }



    return (
        <div className={style.mainContainer}>


            <div className={style.container} >
                <div className={style.em}></div>
                <div className={style.sidebar_left}>
                    <LeftSidebarShortcuts authPhotoUrl={authPhotoUrl} />
                </div>

                <div className={style.chat_list_true}>
                    <div className={style.chat_list_myname}>
                        Bodea
                    </div>
                    <div className={style.chat_list}>
                        {chats?.map((chat) => {

                            return <DialogInstance name={chat.name} photoURL={chat.photoURL} id={chat._id} handleChangeChat={handleChangeChat} chat={chat} />
                        })}
                    </div>

                </div>


                <div className={style.header}>

                </div>
                <div className={style.chat}>
                    {/* <div className={style.ana}>
                        aa
                    </div> */}
                    <div className={style.chat_first_section}>
                        <div className={style.chat_header}>
                            <div>
                                <div className={style.chat_header_main_text}>{chatUserName}</div>
                            </div>
                            <div className={style.actions_section}>
                                <img src={phoneCall} alt="phoneCall" />
                                <img src={cameraVideo} alt="cameraVideo" />
                                <img src={info} alt="info" />
                            </div>
                        </div>

                    </div>
                    <div className={style.chat_input}>
                        {messagesArray.map(item => {
                            return (
                                <MessageInstance authName={authName} messageAuthorName={item.from} key={item._id} message={item.message} />
                            )
                        })}
                    </div>

                    <div className={style.chat_footer}>
                        <AddChatMessage getConversation={getConversation} userName={userName} sendMessage={sendMessage} />
                    </div>
                </div>

            </div>
        </div>
    )
}




const mapStateToProps = (state) => ({
    chats: state.chat.chats,
    messagesArray: state.chat.messagesArray,
    authName: state.auth.authUsername,
    photoUrl: state.auth.currentUserPhotoURL,
    authPhotoUrl: state.auth.authPhotoURL,
    chatUserName: state.auth.curentUserName
})

export default compose(
    connect(mapStateToProps, { getUserInfoByUsername, getChats, sendMessage, getConversation, getRealtimeSocketMessage })
)(Chat)