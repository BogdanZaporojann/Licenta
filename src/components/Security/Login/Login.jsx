import { useFormik } from "formik";
import { connect } from "react-redux";
import { login } from "../../../redux/reducers/authReducer";
import style from "./Login.module.scss"
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { compose } from "redux"

const Login = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            props.login(values)
        }
    })

    const navigate = useNavigate();







    return (
        <div>
            <div className={style.headerForm}>BrainWave</div>
            <div className={style.formContainer}>
                <form className={style.form} onSubmit={formik.handleSubmit}>


                    <div>

                        <span>Email</span>
                        <input
                            className={style.border}
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email} />
                    </div>

                    <div>
                        <div className={style.spaceBetween}>
                            <span>Password</span>
                            <span>Forgot password ?</span>
                        </div>
                        <input
                            className={style.border}
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password} />
                    </div>

                    <div>
                        <input type="checkbox" checked />
                        <span>Keep me logged in</span>
                    </div>

                    <button type="submit">Log in</button>

                    <div className={style.textCenter}>
                        <span>or</span>
                    </div>
                    <div className={style.textCenter}>
                        <span className={style.googleText}>Continue with Google</span>
                    </div>
                </form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    authUsername: state.auth.authUsername
})


export default compose(
    connect(mapStateToProps, { login }),
)(Login);