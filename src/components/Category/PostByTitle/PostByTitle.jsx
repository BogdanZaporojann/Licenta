import React, { useState, useEffect } from "react";
import styles from "./PostByTitle.module.scss"
import { useParams } from "react-router-dom";
import { connect } from "react-redux"
import { getQuestionByTitle, addAnswer } from "../../../redux/reducers/categoryReducer";
import { calcHours } from "../../PersonalPage/utils"
import { useFormik } from "formik";

const PostByTile = ({ getQuestionByTitle, addAnswer, questionByTitle, authUserName }) => {
    const { category, title } = useParams()
    const decodedTitle = decodeURIComponent(title)




    const formik = useFormik({
        initialValues: {
            answer: "",
            answeredTo: "",
        },
        onSubmit: async (values, { resetForm }) => {
            debugger
            addAnswer(category, values)
            resetForm()
        }
    })


    useEffect(() => {
        formik.setFieldValue('answeredTo', questionByTitle?.questionInfo?._id)
        getQuestionByTitle(category, decodedTitle)
    }, [])


    const src = "https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png"
    return (
        <div className={styles.backgroundColor}>

            <div className={styles.wrap}>
                <div className={styles.questionAnswer}>
                    <div className={styles.buttonAndTimeRow}>
                        <span className={styles.questionBtn}>Question</span>
                        <span>{calcHours(questionByTitle?.questionInfo?.date)} h ago</span>
                    </div>
                    <div className={styles.questionHeader}>
                        <img className={styles.ava} src={src} alt="photo" />
                        <div className={styles.headerInfo}>
                            <span>Vasili</span>
                            <span>asked a question related to {questionByTitle?.questionInfo?.category}</span>
                        </div>
                    </div>
                    <div className={styles.question}>
                        {questionByTitle?.questionInfo?.question}
                    </div>

                    <div className={styles.answer}>{questionByTitle?.questionInfo?.description}</div>
                </div>

                <div className={styles.form}>
                    <div>ADD ANSWER</div>
                    <form onSubmit={formik.handleSubmit}>
                        <input className={styles.input} id="answer" name="answer" onChange={formik.handleChange} value={formik.values.answer} type="text" />
                        <button>Add Answer</button>
                    </form>
                </div>


                <div className={styles.answersBlock}>
                    <div className={styles.answersHeader}>All Answers {questionByTitle?.responseInfo?.length}</div>
                    <div className={styles.itemBody}>
                        <div className={styles.questionHeader}>
                            <img className={styles.ava} src={src} alt="photo" />
                            <div className={styles.headerInfo}>
                                <span>Vasili</span>
                                <span>asked a question related to {questionByTitle?.questionInfo?.category}</span>
                            </div>
                        </div>
                        <div className={styles.text}>
                            Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].
                        </div>
                    </div>
                    <div className={styles.itemBody}>
                        <div className={styles.questionHeader}>
                            <img className={styles.ava} src={src} alt="photo" />
                            <div className={styles.headerInfo}>
                                <span>Vasili</span>
                                <span>asked a question related to {questionByTitle?.questionInfo?.category}</span>
                            </div>
                        </div>
                        <div className={styles.text}>
                            Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].
                        </div>
                    </div><div className={styles.itemBody}>
                        <div className={styles.questionHeader}>
                            <img className={styles.ava} src={src} alt="photo" />
                            <div className={styles.headerInfo}>
                                <span>Vasili</span>
                                <span>asked a question related to {questionByTitle?.questionInfo?.category}</span>
                            </div>
                        </div>
                        <div className={styles.text}>
                            Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].
                        </div>
                    </div><div className={styles.itemBody}>
                        <div className={styles.questionHeader}>
                            <img className={styles.ava} src={src} alt="photo" />
                            <div className={styles.headerInfo}>
                                <span>Vasili</span>
                                <span>asked a question related to {questionByTitle?.questionInfo?.category}</span>
                            </div>
                        </div>
                        <div className={styles.text}>
                            Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].Use δ(a-√x2+y2)=(a/√a2-x2)(δ(y-√a2-x2)+δ(y+√a2-x2)) to do the integral over y. Then the integral over x remains and its integration interval is [-a,a].
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    questionByTitle: state.categories.questionByTitle,
    authUserName: state.auth.authUsername

})

export default connect(mapStateToProps, { getQuestionByTitle, addAnswer })(PostByTile)