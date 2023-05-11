import React, { useState } from "react";
import { useFormik } from "formik"
import style from "./AddChatMessage.module.scss"
import { useParams } from "react-router-dom";
import gallery from "../../assets/svg/gallery.svg"
import smile from "../../assets/svg/smile.svg"
import heart from "../../assets/svg/heart.svg"
import { connect } from "react-redux";
import { sendMessage, getRealtimeSocketMessage } from "../../redux/reducers/chatReducer";
import EmojiPicker from "emoji-picker-react";
import icon from "../../assets/svg/emoji.svg"
const AddChatMessage = ({ authorName, sendMessage, getRealtimeSocketMessage }) => {

    const { username } = useParams();


    const formik = useFormik({
        initialValues: {
            toUser: username,
            message: ""
        },
        onSubmit: (values, { resetForm }) => {
            getRealtimeSocketMessage({ message: values.message, from: authorName, to: username, date: new Date() });
            sendMessage({ message: values.message, toUser: username })
            debugger
            resetForm()
            debugger
        }
    })

    const heartImg = ('❤️')

    const sendHeart = () => {
        formik.setFieldValue("message", heartImg)
        formik.handleSubmit()

    }

    const [isOpen, setIsOpen] = useState(false)

    const onEmojiClick = ({ emoji }) => {
        console.log("emoji : ", emoji)
        formik.setFieldValue('message', `${formik.values.message} ${emoji}`)
    };


    return (
        <div className={style.bottomContainer}>
            <div className={style.smile}>
                <div className={style.emoji}>
                    <img src={icon} alt="" onClick={() => setIsOpen(!isOpen)} />

                    {isOpen && (
                        <div className={style.emojies}>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
            </div>
            <form className={style.form_chat} onSubmit={formik.handleSubmit}>
                <input placeholder="Слава Україні!" className={style.input_chat} id="message" name="message" onChange={formik.handleChange} value={formik.values.message} type="text" />
                <button className={style.form_button} type="submit"></button>
            </form>
            <div className={style.likeAndGallery}>
                <img src={gallery} alt="gallery" />
                <img onClick={sendHeart} src={heart} alt="heart" />

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authorName: state.auth.authUsername
})

export default connect(mapStateToProps, { sendMessage, getRealtimeSocketMessage })(AddChatMessage)
