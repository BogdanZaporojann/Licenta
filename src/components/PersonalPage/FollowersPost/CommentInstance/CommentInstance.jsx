import React, { useState } from "react"
import style from "./CommentInstance.module.scss"
import { getUserInfoByUsername } from "../../../../redux/reducers/authReducer"
import { connect } from "react-redux"
import { useEffect } from "react"
import heart from "../../../../assets/svg/heart.svg"
import AnswerToCommentInstance from "./AnswerToCommentInstance/AnswerToCommentInstance"

const CommentInstance = ({ idPost, timeAgo, answers, authorName, text, getUserInfoByUsername, photoUrl, formik }) => {


    useEffect(() => {
        getUserInfoByUsername(authorName)
    }, [])

    const handleAnswer = () => {
        formik.setFieldValue('text', `@${authorName} `)
        formik.setFieldValue('idAnsweredPost', idPost)
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
                            {/* {text} */}
                            loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremv
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

                            <hr className={style.line} />

                            {isVisibleAnswers
                                ? <span onClick={handleSome}>
                                    look answers ({answers.length})
                                </span>
                                : <span onClick={handleSome}>
                                    Hide the answers
                                </span>}
                        </div>
                    </div>
                    <div className={isVisibleAnswers ? style.none : ""}>
                        {answers.map(answer => {
                            console.log('uaaai tudor : ', answer)
                            return <AnswerToCommentInstance answer={answer.answer} idComment={answer._id} authorName={answer.user} />
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