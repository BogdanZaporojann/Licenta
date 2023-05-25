import style from "./Chat.module.scss"
import home from "../../assets/svg/home.svg"
import React, { useContext, useRef, useLayoutEffect, useMemo } from "react"
import { connect } from "react-redux"
import { compose } from "redux";
import { getChats, sendMessage, getConversation, getRealtimeSocketMessage } from "../../redux/reducers/chatReducer";
import AddChatMessage from "./AddChatMessage"
import { MessageInstance } from "./MessageInstance/MessageInstance"
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
import { useInView } from 'react-intersection-observer';
import classNames from "classnames";

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
    chatUserName
}) => {



    const [pageNumberMessages, setPageNumberMessages] = useState(1)

    const { username } = useParams();
    const [userName, setUserName] = useState('')


    const socket = useContext(SocketContext)

    const socketMemo = useMemo(() => {
        return socket
    }, [socket])

    useEffect(() => {
        if (username) {
            getUserInfoByUsername(username);
            setUserName(username);
        }
        socket?.on("private message", (data) => {
            debugger
            getRealtimeSocketMessage(data)
        })
    }, [username, socketMemo])

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (userName) {
            if (inView) {
                setPageNumberMessages(pageNumberMessages + 1)
            }
        }
    }, [inView])

    useEffect(() => {
        if (userName) {
            getConversation(userName, pageNumberMessages)
        }
    }, [pageNumberMessages])


    useEffect(() => {
        if (userName) {
            getConversation(userName, pageNumberMessages, true)
        }
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



    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const handleScroll = () => {
            if (scrollContainer.scrollTop === 0) {
                scrollContainer.scrollTop = 200;
            }
        };

        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const dialogInstanceButton = useRef(null)











    const buttomRef = useRef(null)
    const [wasGoScrollBottom, setWasGoScrollBottom] = useState(false)

    if (!wasGoScrollBottom) {
        setTimeout(() => {
            buttomRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
            setWasGoScrollBottom(true)
        }, 1000);
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

                        <div ref={dialogInstanceButton} style={{ backgroundColor: "black", width: "100%", height: "40px" }}></div>

                    </div>

                </div>


                <div className={style.header}>

                </div>
                <div className={style.chat}>
                    <div className={style.chat_first_section}>
                        <div className={classNames(style.chat_header, !username && style.none)}>
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
                    <div ref={scrollContainerRef} className={style.chat_input}>
                        <div ref={ref} style={{ width: "100%", height: "40px" }}></div>
                        <div className={classNames(style.chooseChat, username && style.none)}>Выберите чат</div>
                        <div >
                            {messagesArray.map(item => {
                                return (
                                    <MessageInstance authName={authName} messageAuthorName={item.from} key={item._id} message={item.message} />
                                )
                            })}
                        </div>
                        <div ref={buttomRef}></div>
                    </div>

                    <div className={classNames(style.chat_footer, !username && style.none)}>
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