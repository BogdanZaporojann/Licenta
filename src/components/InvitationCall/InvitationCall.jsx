import React, { useContext } from "react"
import style from "./InvitationCall.module.scss"
import call from "../../assets/svg/phoneCall.svg"
import x from "../../assets/svg/x.svg"
import { SocketContext } from "../../components/Socket/createSocketContext";
import { useNavigate } from "react-router-dom";


const InvitationCall = ({ setIsCalled, declinedUserName, roomNameState, photoURL, username, popupInteract }) => {


    const socket = useContext(SocketContext)
    const navigate = useNavigate()

    const handleDeclineCall = () => {
        popupInteract.current = true
        setIsCalled(false)
        socket.emit("declinedCall", { data: { toUserName: declinedUserName } })
    }

    const handleAcceptCall = () => {
        popupInteract.current = true
        setIsCalled(false)
        navigate(`/meet?roomNameInvite=${roomNameState}`)
    }
    return (
        <div className={style.wrapp}>
            <img className={style.photo} src={photoURL} alt="photo" />
            <div className={style.info}>
                <span className={style.name}>{username}</span>
                <span>Incoming audio call</span>
            </div>
            <div className={style.iconBlock}>
                <span onClick={handleAcceptCall} className={style.phone}>
                    <img src={call} alt="call" />
                </span>
                <span onClick={handleDeclineCall} className={style.x}>
                    <img src={x} alt="x" />
                </span>
            </div>

        </div>
    )
}

export default InvitationCall