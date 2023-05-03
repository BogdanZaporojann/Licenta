import classNames from "classnames"
import style from "./MessageInstance.module.scss"

export const MessageInstance = ({ messageAuthorName, message, authName }) => {
    return (
        <div>
            <div className={messageAuthorName === authName ? style.message_right : style.message_left}>
                <div className={classNames(style.message)}>
                    {message}
                </div>
            </div>
        </div>
    )
}