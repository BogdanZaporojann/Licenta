import style from "./FollowersPost.module.scss"
import { calcHours } from "../utils"
import heart from "../../../assets/svg/heart.svg"
import comment from "../../../assets/svg/comments.svg"
import Modal from "react-modal"
import { useState } from "react"
import { connect } from "react-redux"
import { getUserInfoByUsername } from "../../../redux/reducers/authReducer"
import { useEffect } from "react"
import { useFormik } from "formik"
import { addCommentToPost } from "../../../redux/reducers/commentReducer"


const FollowersPost = ({ description, postId, authorUserName, comments, files, likes, time, authorPhotoURL, getUserInfoByUsername }) => {



  const formik = useFormik({
    initialValues: {
      text: ""
    },
    onSubmit: values => {

      addCommentToPost({
        text: values.text,
        commentedTo: postId

      })
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
        <img onClick={() => setModalIsOpen(true)} className={style.svg_icon} src={comment} alt="like_heart" />
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
              <span>
                {description}
              </span>
            </div>
            <div className={style.c}>
              <div className={style.ca}>
                <span><img className={style.avaWidth} src={heart} alt="like_image" /></span>
                <span><img className={style.avaWidth} src={comment} alt="comment_image" /></span>
              </div>
              <div className={style.cb}>
                `{likes} отметок "нравиться"`
              </div>
              <div className={style.cc}>
                <span><img className={style.avaWidth} src={heart} alt="smile_image" /></span>
                <form className={style.formStyle} onSubmit={formik.handleSubmit}>
                  <input onChange={handleChange} value={inputText} className={style.commentInput} type="text" placeholder="Добавить коментарий..." />
                  <button>Опубликовать</button>
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
  authorPhotoURL: state.auth.curentUserPhotoURL
})

export default connect(mapStateToProps, { getUserInfoByUsername, addCommentToPost })(FollowersPost)
