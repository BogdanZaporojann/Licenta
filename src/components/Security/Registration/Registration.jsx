import {useFormik} from "formik";
import {connect} from "react-redux";
import {registration} from "../../../redux/reducers/authReducer";
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

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}/>

                <label htmlFor="education">Education</label>
                <input
                    id="education"
                    name="education"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.education}/>

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


export default connect(null,{registration})(Registration)
