import React from "react"
import style from "../CommentInstance.module.scss"
import { useEffect } from "react"
import { getUserInfoByUsername } from "../../../../../redux/reducers/authReducer"
import { connect } from "react-redux"

const AnswerToCommentInstance = ({ formik, getUserInfoByUsername,answer, idComment, authorName, photoUrl }) => {


    useEffect(() => {
        getUserInfoByUsername(authorName)
    }, [])

    const handleAnswer = () => {
        formik.setFieldValue('text', `@${authorName} `)
        formik.setFieldValue('idAnsweredComment',idComment)
    }


    return (
        <div className={style.container}>
            <div className={style.imageAva}>
                <img style={{ heigth: "32px", width: "32px" }} src={photoUrl} alt="ava" />
            </div>
            <div className={style.allInfoContailerForAnswer}>
                <div className={style.nameAndContent}>
                    <span className={style.namePadding}>
                        {authorName}
                    </span>
                    <span className={style.commentText}>
                        {answer}
                    </span>
                </div>
                <div className={style.timeLikeAnswerBlock}>
                    <span>
                        {/* {timeAgo} h. */}
                        10 h.
                    </span>
                    <span>
                        "Likes" : (11)
                    </span>
                    <span onClick={handleAnswer}>
                        answer
                    </span>
                </div>
            </div>
        </div>
    )
}

// const AnswerToCommentInstance = ({}) => {
//     return(
//         <div>

//         </div>
//     )
// }



const mapStateToProps = (state) => ({
    photoUrl: state.auth.curentUserPhotoURL
})

export default connect(mapStateToProps, { getUserInfoByUsername })(AnswerToCommentInstance)