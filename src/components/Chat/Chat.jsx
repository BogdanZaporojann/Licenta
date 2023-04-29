import style from "./Chat.module.scss"
import home from "../../assets/svg/home.svg"
import React, { createRef } from "react"
import { connect } from "react-redux"
import { compose } from "redux";
import { getChats, sendMessage, getConversation } from "../../redux/reducers/chatReducer";
import { AddChatMessage } from "./AddChatMessage"
import { MessageInstance } from "./MessageInstance/MessageInstance"
import classNames from "classnames"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { io } from "socket.io-client"


const Chat = ({ messagesArray, getConversation, getChats, sendMessage }) => {

    const { username } = useParams();
    const [userName, setUserName] = useState('')




    useEffect(() => {
        setUserName(username)
        
    }, [])

    useEffect(() => {
        
        
        getConversation(userName)
        // getChats() 
    }, [userName,sendMessage])





    return (
        <div className={style.container} >
            <form className={style.form}>
                <input type="text" /><input type="submit" />
            </form>
            <div className={style.sidebar_left}>
                <div className={style.flex_sub_sidebar}>
                    <div>Logo</div>
                    <div><img className={style.icon} src={home} alt="home" /></div>
                    <div><img className={style.icon} src={home} alt="home" /></div>
                    <div><img className={style.icon} src={home} alt="home" /></div>
                    <div><img className={style.icon} src={home} alt="home" /></div>
                </div>
                <div className={style.flex_sub_sidebar}>
                    <div><img className={style.icon} src={home} alt="home" /></div>
                    <div><img className={style.icon} src={home} alt="home" /></div>
                    <div><img className={style.icon} src={home} alt="home" /></div>
                </div>
            </div>

            {/* <div className={style.chat_list}>
                    {this.props.chats.map((chat) => {

                        return <DialogInstance handleClick={this.handleClick} chat={chat} />
                    })}

                </div> */}


            <div className={style.header}>
                <div className={style.flex_sub_header}>
                    <img className={style.icon} src={home} alt="inbox" />
                    <div>Inbox</div>
                </div>
                <div className={style.flex_sub_header}>
                    <div className="a">Search</div>
                </div>
                <div>
                    <div>End</div>
                </div>
            </div>
            <div className={style.chat}>
                <div className={style.chat_first_section}>
                    <div className={style.chat_header}>
                        <div>
                            <div className={style.chat_header_main_text}>Gus Skarlis</div>
                            <div><span className={style.iconBefore} href="email.email@email.com">email.email@email.com</span></div>
                        </div>
                        <div className={style.actions_section}>
                            <div>
                                <span>Participants:</span>
                                <span className={style.participants_status}>None</span>
                                <span className={style.actions_button}>Actions...</span>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(style.black_line, style.margin_hr)}></div>
                    <div className={classNames(style.text_wrapp, style.black_line)}>
                        <span className={style.text}>
                            CURRENT DATE
                        </span>
                    </div>
                </div>
                <div className={style.chat_main_part}>
                    <div className={style.chat_input}>
                        {messagesArray.map(item => {
                            return (
                                <MessageInstance key={item._id} message={item.message} />
                            )
                        })}
                    </div>
                </div>

                <div className={style.chat_footer}>
                    <div className={style.f}>
                        <div className={style.padding_chat_footer_first}>
                            <div className={style.flex_chat_footrer_icon}>
                                <div><img className={style.icon_20} src={home} alt="home" /></div>
                                <div><img className={style.icon_20} src={home} alt="home" /></div>
                                <div><img className={style.icon_20} src={home} alt="home" /></div>
                            </div>
                            <div>
                                <span className={style.iconAfter}>Enter</span>
                            </div>
                        </div>
                        <div>
                            <AddChatMessage getConversation={getConversation} userName={userName} sendMessage={sendMessage} />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}




const mapStateToProps = (state) => ({
    chats: state.chat.chats,
    messagesArray: state.chat.messagesArray
})

export default compose(
    connect(mapStateToProps, { getChats, sendMessage, getConversation })
)(Chat)