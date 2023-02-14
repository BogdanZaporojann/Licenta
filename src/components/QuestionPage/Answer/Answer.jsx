import indus from "../../../assets/img/indus/indian_picture.jpg"
import style from "./Answer.module.scss"
export const Answer = ({answerInfo}) => {
    const {answer} = answerInfo;
    return(
        <div>
            <div className={style.header}>Relevant answer</div>
            <div className={style.content}>
                <div className={style.answer__author__header}>
                    <img className={style.answer__author__header__image} src={indus} alt="indus"/>
                    <div className={style.answer__author__header__content}>
                        <div className={style.answer__author__header__name__date}>
                            <div>
                                <a href="app/client/QuestionPage/Answer#"><span>Michel Héry</span></a>
                            </div>
                            <div className={style.date__padding}>Nov 12, 2022</div>
                            <div></div>
                        </div>
                        <div className={style.ff}>
                            <span className={style.answer__author__header__button}>answer</span>
                        </div>
                    </div>
                </div>
                <div className={style.answer__header__main}>
                    {answer}
                </div>
                <div className={style.answer__author__footer}>
                    <div className={style.view}><span>View</span></div>
                    <div className={style.recommendation}><span>0 Recommendation</span></div>
                </div>
            </div>
        </div>

    )
}