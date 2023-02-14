import {useFormik} from "formik";

export const AddQuestion = ({addQuestion,user}) => {

    const formik = useFormik({
        initialValues: {
            question: '',
            description: '',
            user: localStorage.getItem('user')
        },
        onSubmit: values => {
            addQuestion(values)
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="question">Questions</label>
                <input
                    id="question"
                    name="question"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.question}/>

                <label htmlFor="description">Question description</label>
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