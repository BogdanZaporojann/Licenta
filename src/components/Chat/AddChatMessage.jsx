import classNames from "classnames"
import { useFormik } from "formik"
import style from "./AddChatMessage.module.scss"
import { useParams } from "react-router-dom";

export const AddChatMessage = ({ getConversation, sendMessage, userName }) => {

    const { username } = useParams();

    const getConversationHandleClick = () => {
        getConversation(username)
    }

    const formik = useFormik({
        initialValues: {
            toUser: userName,
            message: ""
        },
        onSubmit: async values => {
            
            sendMessage({ message: values.message, toUser: userName })
            
            
            
        }
    })

    return (
        <div>
            <form className={classNames(style.none_style, style.form_padding, style.form_chat)} onSubmit={formik.handleSubmit}>
                <input placeholder="aaa" className={style.input_chat} id="message" name="message" onChange={formik.handleChange} value={formik.values.message} type="text" />
                <button className={style.form_button} onClick={getConversationHandleClick} type="submit"></button>
            </form>
        </div>
    )
}