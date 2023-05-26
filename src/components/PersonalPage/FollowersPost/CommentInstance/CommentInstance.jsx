import React, { useState, useEffect } from "react"
import style from "./CommentInstance.module.scss"
import { getUserInfoByUsername } from "../../../../redux/reducers/authReducer"
import { connect } from "react-redux"
import blackLike from "../../../../assets/svg/blackLike.svg"
import redHeart from "../../../../assets/svg/redLike.svg"

import heart from "../../../../assets/svg/heart.svg"
import AnswerToCommentInstance from "./AnswerToCommentInstance/AnswerToCommentInstance"
import { addLike, removeLike, checkIsLikedPost } from "../../../../redux/utils/like"

const CommentInstance = ({ likes, idComment, timeAgo, answers, authorName, text, getUserInfoByUsername, photoUrl, formik, checkIsLikedPost }) => {

    const [isLikedPost, setLikedPost] = useState(false)
    useEffect(() => {
      checkIsLikedPost(idComment).then(result => {
        setLikedPost(result)
      })
    }, [])
  
    const handleRemove = (idComment) => {
        removeLike(idComment)
        setLikedPost(prev => !prev)
      }
    
      const handleAdd = (idComment) => {
        addLike(idComment)
        setLikedPost(prev => !prev)
      }
    
    
      const handleClickOnLikeIcon = () => {
        isLikedPost
          ? handleRemove(idComment)
          : handleAdd(idComment)
      }










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
                            Likes : {likes.length}
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
                    <img onClick={handleClickOnLikeIcon} className={style.likeIcon} src={isLikedPost ? redHeart : blackLike} alt="heart" />
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => ({
    photoUrl: state.auth.curentUserPhotoURL
})

export default connect(mapStateToProps, { getUserInfoByUsername, checkIsLikedPost })(CommentInstance)