import Modal from "react-modal"
import { useState } from "react";
import heart from "../../assets/svg/heart.svg"
import comment from "../../assets/svg/comments.svg"
import style from "./ModalEx.modules.scss"
const ModalEx = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dogImg =
        'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
    return (

        <div>
            <img onClick={() => setModalIsOpen(true)} style={{ width: "24px" }} src={comment} alt="like_heart" />

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
                            height: `645px`,
                            background: 'black'
                        }
                    }
                }
            >
                <div className={style.modalCommentWrapper}>
                    <div className={style.contentPhotoPopup}>
                        jtgnjtnjtng
                    </div>
                    <div className={style.contentTextPopup}>
                        <div className={style.a}>
                            <div>
                                <span>Bodan</span>
                                <span>
                                    <img className={style.avaWidth} src={dogImg} alt="currentUserPhotoURL" />
                                </span>
                            </div>
                        </div>
                        <div className={style.b}>
                            <span>
                                oajongagjndajgn
                            </span>

                        </div>
                        <div className={style.c}>
                            <div className={style.ca}>
                                <span><img className={style.avaWidth} src={heart} alt="like_image" /></span>
                                <span><img className={style.avaWidth} src={comment} alt="comment_image" /></span>
                            </div>
                            <div className={style.cb}>
                                `2 отметок "нравиться"`
                            </div>
                            <div className={style.cc}>
                                <span><img className={style.avaWidth} src={heart} alt="smile_image" /></span>
                                <form className={style.formStyle} >
                                    <input className={style.commentInput} type="text" placeholder="Добавить коментарий..." />
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

export default ModalEx