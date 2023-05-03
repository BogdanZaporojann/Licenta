import style from "./FollowersPost.module.scss"
import { calcHours } from "../utils"
import heart from "../../../assets/svg/heart.svg"
import comment from "../../../assets/svg/comments.svg"
import smile from "../../../assets/svg/smile.svg"
import Modal from "react-modal"
import { useState } from "react"
import { connect } from "react-redux"
import { getUserInfoByUsername } from "../../../redux/reducers/authReducer"
import { useEffect } from "react"
import { useFormik } from "formik"
import { addCommentToPost, addAnswerToComment, getCommentsByPostID } from "../../../redux/reducers/commentReducer"
import CommentInstance from "./CommentInstance/CommentInstance"

const FollowersPost = ({
  getCommentsByPostID,
  addCommentToPost,
  addAnswerToComment,
  description,
  postId,
  authorUserName,
  files,
  likes,
  time,
  authorPhotoURL,
  comments,
  getUserInfoByUsername }) => {


  const handleClickOnCommentIcon = () => {
    setModalIsOpen(true)
    getCommentsByPostID(postId)
  }

  const formik = useFormik({
    initialValues: {
      text: "",
      idAnsweredPost: ""
    },
    onSubmit: (values, { resetForm }) => {

      if (values.text[0] === '@') {
        const textSpaceSplit = values.text.split(" ")
        const toUser = textSpaceSplit[0].slice(1)
        const indexStart = textSpaceSplit[0].length + 1
        const message = values.text.slice(indexStart)

        addAnswerToComment({
          answer: message,
          answeredTo: values.idAnsweredPost
        })
        resetForm()
      }
      else {
        addCommentToPost({
          text: values.text,
          commentedTo: postId

        })
      }
    }
  })

  let infoContent
  if (files[0]?.type === 'image') {

    infoContent = <img className={style.contentWidth} src={files[0].fileURL} alt="ImageContentFromFollowers" />

  }
  if (files[0]?.type === 'video') {
    infoContent = <video className={style.contentWidth} src={files[0].fileURL} controls />
  }

  Modal.setAppElement("#root")

  const [modalIsOpen, setModalIsOpen] = useState(false);




  useEffect(() => {
    getUserInfoByUsername(authorUserName)
  }, [getUserInfoByUsername])



  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };





  return (
    <div>
      <div>
        <span >{authorUserName}</span>
      </div>
      <div>{`${calcHours(time)} hours ago`}</div>
      <div className={style.contentWidthContainer}>
        {infoContent}
      </div>
      <div>
        <img className={style.svg_icon} src={heart} alt="like_heart" />
        <img onClick={handleClickOnCommentIcon} className={style.svg_icon} src={comment} alt="like_heart" />
      </div>
      <div>
        <span>`Нравиться {likes} людям`</span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        style={
          {
            content: {
              padding: '0',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              border: 'none',
              borderRadius: '0  ',
              width: `1330px`,
              height: "650px",
              background: 'black'
            }
          }
        }

      >
        <div className={style.modalCommentWrapper}>
          <div className={style.contentPhotoPopup}>
            {infoContent}
          </div>
          <div className={style.contentTextPopup}>
            <div className={style.a}>
              <div>
                <span>{authorUserName}</span>
                <span>
                  <img className={style.avaWidth} src={authorPhotoURL} alt="currentUserPhotoURL" />
                </span>
              </div>
            </div>
            <div className={style.b}>
              {comments.map(({ comment }) => {
                return <CommentInstance idPost={comment._id} formik={formik} authorName={comment.author} text={comment.text} answers={comment.answers} timeAgo={calcHours(comment.time)} />
              })}
            </div>
            <div className={style.c}>
              <div className={style.ca}>
                <span><img className={style.avaWidth} src={heart} alt="like_image" /></span>
                <span><img className={style.avaWidth} src={comment} alt="comment_image" /></span>
              </div>
              <div className={style.cb}>
                <div>
                  отметок "нравиться"
                </div>
                <div>
                  {`${calcHours(time)} hours ago`}
                </div>
              </div>

              <div className={style.cc}>
                <div>
                  <img className={style.smile} src={smile} alt="smile" />
                </div>
                <form className={style.formStyle} onSubmit={formik.handleSubmit}>
                  <input onChange={formik.handleChange} name="text" id="text" value={formik.values.text} className={style.commentInput} type="text" placeholder="Добавить коментарий..." />
                  <button className={style.publicationButton}>Опубликовать</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  authorPhotoURL: state.auth.curentUserPhotoURL,
  comments: state.comments.comments
})

export default connect(mapStateToProps, { getUserInfoByUsername, addCommentToPost, addAnswerToComment, getCommentsByPostID })(FollowersPost)
