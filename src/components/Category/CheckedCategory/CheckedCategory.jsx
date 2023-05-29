import React, { useEffect } from "react"
import styles from "./CheckedCategory.module.scss"
import { useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux"
import { addQuestion, getQuestions, getQuestionByTitle } from "../../../redux/reducers/categoryReducer";
import { useFormik } from "formik";
import { calcHours } from "../../PersonalPage/utils"
import { useNavigate } from "react-router-dom";


const CheckedCategory = ({ addQuestion, getQuestions, getQuestionByTitle, authUserName, questions }) => {
    const { category } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getQuestions(category)
        formik.setFieldValue('user', authUserName);
    }, [])

    const formik = useFormik({
        initialValues: {
            question: "",
            description: "",
            user: "",
        },
        onSubmit: async (values, { resetForm }) => {
            console.log('values : ', values)
            addQuestion(category, values)
            resetForm()
        }
    })

    const handleClickOnTitle = (title) => {
        getQuestionByTitle(category,title)
        navigate(`/postByTitle/${category}/${title}`)
    }

    return (
        <div>
            <div className={styles.header}>
                {category} Science top
            </div>

            <div className={styles.main}>
                <div className={styles.postQuestion}>
                    <form onSubmit={formik.handleSubmit}>
                        <input id="question" name="question" onChange={formik.handleChange} value={formik.values.question} type="text" />
                        <input id="description" name="description" onChange={formik.handleChange} value={formik.values.description} type="text" />
                        <button>ADD MESSAGE</button>
                    </form>
                </div>
                <div className={styles.listOfQuestion}>

                    <div className={styles.s}>

                        {questions.map(({ questionInfo, answerInfo, userInfo }) => {
                            return (
                                <div className={styles.questionAnswer}>
                                    <div className={styles.questionHeader}>
                                        <img className={styles.ava} src={userInfo?.photoURL} alt="photo" />
                                        <div className={styles.headerInfo}>
                                            <span>{userInfo?.name}</span>
                                            <span>asked a question related to {category}</span>
                                        </div>
                                    </div>
                                    <div onClick={()=>handleClickOnTitle(questionInfo?.question)}>
                                        {questionInfo?.question}
                                    </div>
                                    <div className={styles.buttonAndTimeRow}>
                                        <span className={styles.questionBtn}>Question</span>
                                        <span className={styles.answerBtn}>{answerInfo.length} Answers</span>
                                        <span>{calcHours(questionInfo.date)} h ago</span>
                                    </div>
                                    <div className={styles.answer}>{questionInfo?.description}</div>
                                    <div>Relevant answer</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    questions: state.categories.questions,
    authUserName: state.auth.authUsername
})

export default connect(mapStateToProps, { addQuestion, getQuestions, getQuestionByTitle })(CheckedCategory)