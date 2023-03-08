import classNames from "classnames"
import { useFormik } from "formik"
import style from "./AddChatMessage.module.scss"
export const AddChatMessage = ({ sendMessage, userId }) => {



    const formik = useFormik({
        initialValues: {
            message: ""
        },
        onSubmit: values => {
            sendMessage({ message: values.message, toUser: userId })
        }
    })

    return (
        <div>
            <form className={classNames(style.none_style, style.form_padding, style.form_chat)} onSubmit={formik.handleSubmit}>
                <input placeholder="aaa" className={style.input_chat} id="message" name="message" onChange={formik.handleChange} value={formik.values.message} type="text" />
                <button className={style.form_button} type="submit"></button>
            </form>
        </div>
    )
}