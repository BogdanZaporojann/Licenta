import { useFormik } from "formik"
import style from "./AddChatMessage.module.scss"
import { useParams } from "react-router-dom";
import gallery from "../../assets/svg/gallery.svg"
import smile from "../../assets/svg/smile.svg"
import heart from "../../assets/svg/heart.svg"

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
        <div className={style.bottomContainer}>
            <div className={style.smile}>
                <img src={smile} alt="smile" />
            </div>
            <form className={style.form_chat} onSubmit={formik.handleSubmit}>
                <input placeholder="aaa" className={style.input_chat} id="message" name="message" onChange={formik.handleChange} value={formik.values.message} type="text" />
                <button className={style.form_button} onClick={getConversationHandleClick} type="submit"></button>
            </form>
            <div className={style.likeAndGallery}>
                <img src={gallery} alt="gallery" />
                <img src={heart} alt="heart" />
            </div>
        </div>
    )
}