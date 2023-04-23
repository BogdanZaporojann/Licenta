import {useFormik} from "formik";
import {connect} from "react-redux";

const UpdateQuestionForm = (props) => {
    const formik = useFormik({
        initialValues: {
            question: '',
            description: ''
        },
        onSubmit: values => {
        }
    })

    return (
        <div>

        <form onSubmit={formik.handleSubmit}>

            <label htmlFor="question">Question</label>
            <input
                id="question"
                name="question"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.question}/>

            <label htmlFor="description">Description</label>
            <input
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}/>

            <button type="submit">Submit</button>
        </form>
    </div>
    )
}



export default connect(null,{})(UpdateQuestionForm)