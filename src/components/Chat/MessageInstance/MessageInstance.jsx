import classNames from "classnames"
import style from "./MessageInstance.module.scss"

export const MessageInstance = ({ message }) => {
    const myId = localStorage.getItem("user")
    return (
        <div>
            <div className={classNames(style.message__wrapp, style.message_right)}>
                <div className={classNames(style.message)}>
                    {message}
                </div>
            </div>
        </div>
    )
}