import {useFormik} from "formik";
import {connect} from "react-redux";
import {login} from "../../../redux/reducers/authReducer";

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

    return (

        <div>

            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}/>

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export A = props => {
    return(
        <div>
        </div>
    )
}


export default connect(null, {login})(Login)
