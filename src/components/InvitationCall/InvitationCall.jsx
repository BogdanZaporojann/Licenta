import React from "react"
import style from "./InvitationCall.module.scss"
import call from "../../assets/svg/phoneCall.svg"
import x from "../../assets/svg/x.svg"
const InvitationCall = ({ photoURL, username }) => {
    return (
        <div className={style.wrapp}>
            <img className={style.photo} src={photoURL} alt="photo" />
            <div className={style.info}>
                <span className={style.name}>{username}</span>
                <span>Incoming audio call</span>
            </div>
            <div className={style.iconBlock}>
                <span className={style.phone}>
                    <img  src={call} alt="call" />
                </span>
                <span className={style.x}>
                    <img src={x} alt="x" />
                </span>
            </div>

        </div>
    )
}

export default InvitationCall