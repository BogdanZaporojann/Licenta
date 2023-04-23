import style from "./UserPost.module.scss"
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

const UserPost = ({ description, postId, authorUserName, comments, files, likes, time, authorPhotoURL, getUserInfoByUsername }) => {
    const formik = useFormik({
        initialValues: {
            text: ""
        },
        onSubmit: values => {

            addCommentToPost({
                commentInfo: {
                    text: values.text,
                    commentedTo: postId
                }
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



    return (
        <div>
            <div onClick={() => setModalIsOpen(true)} className={style.contentWidthContainer}>
                {infoContent}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={true}
                style={
                    {
                        content: {
                            padding: '0px',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            transform: 'translate(-50%, -50%)',
                            border: 'none',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                            borderRadius: '5px',
                            width: `1000px`,
                            height: `665px`,
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
                                    <input onChange={formik.handleChange} id="text" name="text" value={formik.values.text} className={style.commentInput} type="text" placeholder="Добавить коментарий..." />
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

export default connect(mapStateToProps, { getUserInfoByUsername, addCommentToPost })(UserPost)