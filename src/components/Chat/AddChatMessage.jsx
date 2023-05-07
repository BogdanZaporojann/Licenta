import { useFormik } from "formik"
import style from "./AddChatMessage.module.scss"
import { useParams } from "react-router-dom";
import gallery from "../../assets/svg/gallery.svg"
import smile from "../../assets/svg/smile.svg"
import heart from "../../assets/svg/heart.svg"
import { connect } from "react-redux";
import { sendMessage, getRealtimeSocketMessage } from "../../redux/reducers/chatReducer";

const AddChatMessage = ({ authorName, sendMessage, getRealtimeSocketMessage }) => {

    const { username } = useParams();


    const formik = useFormik({
        initialValues: {
            toUser: username,
            message: ""
        },
        onSubmit: async values => {
            await getRealtimeSocketMessage({ message: values.message, from: authorName, to: username, date: new Date() });
            await sendMessage({ message: values.message, toUser: username });
        }
    })

    return (
        <div className={style.bottomContainer}>
            <div className={style.smile}>
                <img src={smile} alt="smile" />
            </div>
            <form className={style.form_chat} onSubmit={formik.handleSubmit}>
                <input placeholder="aaa" className={style.input_chat} id="message" name="message" onChange={formik.handleChange} value={formik.values.message} type="text" />
                <button className={style.form_button} type="submit"></button>
            </form>
            <div className={style.likeAndGallery}>
                <img src={gallery} alt="gallery" />
                <img src={heart} alt="heart" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authorName: state.auth.authUsername
})

export default connect(mapStateToProps, { sendMessage, getRealtimeSocketMessage })(AddChatMessage)
