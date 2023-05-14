import React, { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Socket/createSocketContext";
import style from "./InvitationCall.module.scss"
import call from "../../assets/svg/phoneCall.svg"
import x from "../../assets/svg/x.svg"
const InvitationCall = ({ photoURL, username, userCallTacker, roomNameCallTacker, setIsCalled, setCallWasAccept }) => {

    const navigate = useNavigate()

    const socket = useContext(SocketContext)



    const handleAccepteCall = () => {
        setCallWasAccept(true)
        navigate(`/meet?roomNameInvite=${roomNameCallTacker}`)
    }

    const handleDeclineCall = () => {
        setIsCalled(false)
        socket.emit("declinedCall", { data: { toUserName: userCallTacker } })

    }

    return (
        <div className={style.wrapp}>
            <img className={style.photo} src={photoURL} alt="photo" />
            <div className={style.info}>
                <span className={style.name}>{username}</span>
                <span>Incoming audio call</span>
            </div>
            <div className={style.iconBlock}>
                <span onClick={handleAccepteCall} className={style.phone}>
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