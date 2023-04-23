import style from "./SelectAnswer.module.scss"
import indus from "../../../assets/img/indus/indian_picture.jpg"

export const SelectAnswer = props => {
    return(
        <div>
            <div className={style.flex_header}>
                <img className={style.photo} src={indus} alt="Photo" />
                <div className={style.grid_header}>
                    <span className={style.name}>Joseph C Lee</span>
                    <span>Queensland Health</span>
                </div>
            </div>
            <div>
                {props.answer}
            </div>
        </div>
    )
}