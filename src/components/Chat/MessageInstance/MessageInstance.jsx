import classNames from "classnames"
import style from "./MessageInstance.module.scss"

export const MessageInstance = ({}) => {
    const myId = localStorage.getItem("user")
    // const isMyMessage = myId === 
    return (
        <div className={classNames(style.message__wrapp,style.message_right)}>
            <div className={classNames(style.message)}>
                Am vrut sa va intreb in legatura cu jobul, e in putere ?.
            </div>
        </div>
    )
}