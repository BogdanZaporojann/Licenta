import style from "./FollowersPost.module.scss"
import { calcHours } from "../utils"
import blackLike from "../../../assets/svg/blackLike.svg"
import redHeart from "../../../assets/svg/redLike.svg"
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
import { addLike, removeLike, checkIsLikedPost } from "../../../redux/utils/like"

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
  getUserInfoByUsername,
  checkIsLikedPost }) => {


  const [isLikedPost, setLikedPost] = useState(false)
  useEffect(() => {
    checkIsLikedPost(postId).then(result => {
      setLikedPost(result)
    })
  }, [])



  const [isSendMessage, setIsSendMessage] = useState(false)
  useEffect(() => {
    isSendMessage && setIsSendMessage(false)
    getCommentsByPostID(postId)
  }, [isSendMessage])

  const handleClickOnCommentIcon = () => {
    setModalIsOpen(true)
    getCommentsByPostID(postId)
  }

  const handleRemove = (postId) => {
    removeLike(postId)
    setLikedPost(prev => !prev)
  }

  const handleAdd = (postId) => {
    addLike(postId)
    setLikedPost(prev => !prev)
  }


  const handleClickOnLikeIcon = () => {
    isLikedPost
      ? handleRemove(postId)
      : handleAdd(postId)
  }


  const formik = useFormik({
    initialValues: {
      text: "",
      idAnsweredComment: "",
    },
    onSubmit: (values, { resetForm }) => {

      if (values.text[0] === '@') {

        setIsSendMessage(true)
        addAnswerToComment({
          answer: values.text,
          answeredTo: values.idAnsweredComment
        })
        resetForm()
      }
      else {
        setIsSendMessage(true)

        addCommentToPost({
          text: values.text,
          commentedTo: postId
        })
        resetForm()
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
      <div style={{ display: 'flex', marginLeft: 35 }}>
        <img className={style.commentAva} src="https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png" alt="alt" />
        <div className={style.nameAndTime}>
          <span>{authorUserName}</span>
          <span style={{fontSize:12, fontWeight:400}}>{`${calcHours(time)} h`}</span>
        </div>
      </div>
      <div className={style.contentWidthContainer}>
        {infoContent}
      </div>
      <div style={{ marginLeft: 35 }}>
        <div className={style.likeAndComment}>
          <img onClick={handleClickOnLikeIcon} className={style.svg_icon_red} src={isLikedPost ? redHeart : blackLike} alt="like_heart" />
          <img onClick={handleClickOnCommentIcon} className={style.svg_icon} src={comment} alt="like_heart" />
        </div>
        <div>
          <span>Нравиться {likes.length} людям</span>
        </div>
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
            <div className={style.header}>
              <div>
                <span>
                  <img style={{ heigth: "32px", width: "32px", marginRight: "13px" }} className={style.avaWidth} src={authorPhotoURL} alt="currentUserPhotoURL" />
                </span>
              </div>
              <span className={style.mainName}>{authorUserName}</span>

            </div>
            <div className={style.b}>
              {comments.map(({ comment }) => {
                debugger
                return <CommentInstance
                  likes={likes}
                  idComment={comment._id}
                  formik={formik}
                  authorName={comment.author}
                  text={comment.text}
                  answers={comment.answers}
                  timeAgo={calcHours(comment.time)}
                />
              })}
            </div>
            <div className={style.c}>
              <div className={style.ca}>
                <span onClick={handleClickOnLikeIcon}><img className={style.avaWidth} src={isLikedPost ? redHeart : blackLike} alt="like_image" /></span>
                <span><img className={style.commentAva} src={comment} alt="comment_image" /></span>
              </div>
              <div className={style.cb}>
                <div>
                  {likes.length} отметок нравиться
                </div>
                <div style={{ fontSize: 13, fontWeight: 10 }}>
                  {`${calcHours(time)} h`}
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

export default connect(mapStateToProps, {
  getUserInfoByUsername,
  addCommentToPost,
  addAnswerToComment,
  getCommentsByPostID,
  addLike,
  removeLike,
  checkIsLikedPost
})(FollowersPost)
