import React, { useState } from "react"
import style from "./CommentInstance.module.scss"
import { getUserInfoByUsername } from "../../../../redux/reducers/authReducer"
import { connect } from "react-redux"
import { useEffect } from "react"
import heart from "../../../../assets/svg/heart.svg"
import AnswerToCommentInstance from "./AnswerToCommentInstance/AnswerToCommentInstance"

const CommentInstance = ({ idComment, timeAgo, answers, authorName, text, getUserInfoByUsername, photoUrl, formik }) => {


    useEffect(() => {
        getUserInfoByUsername(authorName)
    }, [])

    const handleAnswer = () => {
        formik.setFieldValue('text', `@${authorName} `)
        formik.setFieldValue('idAnsweredComment', idComment)
    }

    const [isVisibleAnswers, setIsVisibleAnswers] = useState(false)

    const handleSome = () => {
        setIsVisibleAnswers(!isVisibleAnswers)
    }
    return (
        <div>
            <div className={style.container}>
                <div className={style.imageAva}>
                    <img style={{ heigth: "32px", width: "32px" }} src={photoUrl} alt="avaPhoto" />
                </div>
                <div className={style.allInfoContailer}>
                    <div className={style.nameAndContent}>
                        <span className={style.namePadding}>
                            {authorName}
                        </span>
                        <span className={style.commentText}>
                            {text}
                        </span>
                    </div>
                    <div className={style.timeLikeAnswerBlock}>
                        <span>
                            {timeAgo} h.
                        </span>
                        <span>
                            "Likes" : (11)
                        </span>
                        <span onClick={handleAnswer}>
                            answer
                        </span>
                    </div>
                    <div className={style.timeLikeAnswerBlock}>
                        <div className={style.lineBlock}>



                            {
                                answers.length !== 0 ?
                                    isVisibleAnswers
                                        ? <div>
                                            <hr className={style.line} />
                                            <span onClick={handleSome}>
                                                look answers ({answers.length})
                                            </span>
                                        </div>
                                        : <div>
                                            <hr className={style.line} />
                                            <span onClick={handleSome}>
                                                Hide the answers
                                            </span>
                                        </div>
                                    : null
                            }
                        </div>
                    </div>
                    <div className={isVisibleAnswers ? style.none : ""}>
                        {answers.map(answer => {
                            return <AnswerToCommentInstance formik={formik} answer={answer.answer} idComment={answer._id} authorName={answer.user} />
                        })}
                    </div>
                </div>
                <div>
                    <img className={style.likeIcon} src={heart} alt="heart" />
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => ({
    photoUrl: state.auth.curentUserPhotoURL
})

export default connect(mapStateToProps, { getUserInfoByUsername })(CommentInstance)