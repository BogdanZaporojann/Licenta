import { useFormik } from "formik";
import { connect } from "react-redux";
import { registration } from "../../../redux/reducers/authReducer";
import style from "./Registration.module.scss"
const Registration = (props) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            education: '',
            email: '',
            password: ''
        },
        onSubmit: values => {
            props.registration(values)
        }
    })

    return (

        <div>

            <div className={style.headerForm}>BrainWave</div>
            <div className={style.formContainer}>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <div className={style.flex_center}>
                        <span>Name</span>
                        <input
                            className={style.border}
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name} />
                    </div>

                    <div className={style.flex_center}>
                        <span>Education</span>
                        <input
                            className={style.border}
                            id="education"
                            name="education"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.education} />
                    </div>

                    <div className={style.flex_center}>
                        <label for="email">Email</label>
                        <input
                            className={style.border}
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email} />
                    </div>

                    <div>
                        <span>Password</span>
                        <input
                            className={style.border}
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password} />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>

        </div>
    )
}


export default connect(null, { registration })(Registration)
