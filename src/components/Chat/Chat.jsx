import style from "./Chat.module.scss"
import home from "../../assets/svg/home.svg"
import React, { useContext, useRef, useLayoutEffect } from "react"
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
import { useNavigate } from "react-router-dom";
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

    //прокручивание скрола по дефолду на низ в сообщениях
    const bottomRef = useRef(null);


    useLayoutEffect(() => {
        const timeout = setTimeout(() => {
            if (bottomRef.current) {
                bottomRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);


    //делаем динамическую загрузку контента в зависимости от срола вверх
    //когда условие со скролом выполниться мы будем запрашивать следующую страницу с сообжениями с сервера
    const [pageNumberMessages, setPageNumberMessages] = useState(1)
    const arrayMessageRef = useRef(null)

    const scrollHandler = (e) => {
        if ((e.target.scrollTop < 20)) {
            setPageNumberMessages(prevNumber => prevNumber + 1)
            const middlePosition = arrayMessageRef.current.scrollHeight / 2
        }
    }



    useEffect(() => {
        if (arrayMessageRef) {
            arrayMessageRef.current.addEventListener('scroll', scrollHandler)

            return function () {
                arrayMessageRef.current.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [scrollHandler])

    //синхронно ждём обновления pageNumberMessages и только после этого делаем запрос на сервер с правильными данными
    useEffect(() => {
        getConversation(userName, pageNumberMessages)
    }, [pageNumberMessages])








    const { username } = useParams();
    const [userName, setUserName] = useState('')


    const socket = useContext(SocketContext)


    useEffect(() => {
        getUserInfoByUsername(username)
        setUserName(username)

        socket.on("private message", (data) => {
            getRealtimeSocketMessage(data)
        })
    }, [username])

    useEffect(() => {
        getConversation(userName, pageNumberMessages)

        getChats()
    }, [userName])






    const navigate = useNavigate()

    const callWithoutCamera = () => {
        //при переходе пустая страница изначально, после обновленя страницы всё хорошо
        navigate(`/meet?interlocutorPhotoURL=${photoUrl}&interlocutorName=${chatUserName}&camera=${false}&toUserName=${username}`)
    }

    const callWithCamera = () => {
        navigate(`/meet?interlocutorPhotoURL=${photoUrl}&interlocutorName=${chatUserName}&camera=${true}&toUserName=${username}`)
    }





    //колбэк для переключения между диалогами 
    const handleClickChooseDialog = (username) => {
        navigate(`/messages/${username}`)
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
                        {chats?.map(({ username, name, photoURL, id }) => {
                            return <div onClick={() => { handleClickChooseDialog(username) }}>
                                <DialogInstance username={username} name={name} photoURL={photoURL} id={id} />
                            </div>
                        })}
                    </div>

                </div>


                <div className={style.header}>

                </div>
                <div className={style.chat}>
                    <div className={style.chat_first_section}>
                        <div className={style.chat_header}>
                            <div>
                                <div className={style.chat_header_main_text}>{chatUserName}</div>
                            </div>
                            <div className={style.actions_section}>
                                <img onClick={callWithoutCamera} src={phoneCall} alt="phoneCall" />
                                <img onClick={callWithCamera} src={cameraVideo} alt="cameraVideo" />
                                <img src={info} alt="info" />
                            </div>
                        </div>

                    </div>
                    <div ref={arrayMessageRef} className={style.chat_input}>
                        {messagesArray.map(item => {
                            return (
                                <MessageInstance authName={authName} messageAuthorName={item.from} key={item._id} message={item.message} />
                            )
                        })}
                        <div ref={bottomRef}></div>
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
    photoUrl: state.auth.curentUserPhotoURL,
    authPhotoUrl: state.auth.authPhotoURL,
    chatUserName: state.auth.curentUserName

})

export default compose(
    connect(mapStateToProps, { getUserInfoByUsername, getChats, sendMessage, getConversation, getRealtimeSocketMessage })
)(Chat)