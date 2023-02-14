import {useFormik} from "formik";

export const AddAnswer = (props) => {

    const formik = useFormik({
        initialValues: {
            answer: ''
        },
        onSubmit: values => {
            return {
                answerInfo: values
            }
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="question">Answer</label>
                <input
                    id="answer"
                    name="answer"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.answer}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}