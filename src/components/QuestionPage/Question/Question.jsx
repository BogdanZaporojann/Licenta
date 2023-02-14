import style from "./Question.module.scss"
import indus from "../../../assets/img/indus/indian_picture.jpg"
import {Answer} from "../Answer/Answer";
import {Link, NavLink} from "react-router-dom";
export const Question = (props) => {
    const {category, date, description, question} = props.items.questionInfo
    const {name, photoURL} = props.items.userInfo

    return (
        <div className={style.stack__item}>
                <div className={style.stack__item__header}>
                    <div className={style.header__container}>
                        <div className={style.header__container_image}>
                            <img className={style.image} src={photoURL} alt="user"/>
                        </div>
                        <div className={style.header__container_content_wrapper}>
                            <div className={style.header__container_content}>
                                <div>{name}</div>
                                <div className={style.header__container_content_text}>asked a question related to {category}</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.main__container}>
                        <div className={style.main_header}>
                            <Link to={`post/${question.replaceAll(" ","_")}`} >
                                {question}
                            </Link>
                        </div>
                        <div className={style.main__button__flex}>
                            <span className={style.main__first_buttton}>Question</span>
                            <span className={style.main__second_buttton}>7 answers</span>
                            <span className={style.main__button__date}>{date}</span>
                        </div>
                        <div>
                            <div className={style.description}>
                                {description}
                            </div>
                            <div className={style.answer}>
                                <Answer answerInfo={props.items.answerInfo}/>
                            </div>
                        </div>
                    </div>
                <div>

                </div>
            </div>
            <hr/>
        </div>
    )
}