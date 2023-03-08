import style from "./Followers.module.scss"
import indus from "../../../assets/img/indus/indian_picture.jpg"


export const Followers = props => {
    return(
        <div className={style.container}>
            <img className={style.photo} src={indus} alt="photo" />
            <img className={style.photo} src={indus} alt="photo" />
            <img className={style.photo} src={indus} alt="photo" />
            <img className={style.photo} src={indus} alt="photo" />
            <img className={style.photo} src={indus} alt="photo" />
            <img className={style.photo} src={indus} alt="photo" />
            <img className={style.photo} src={indus} alt="photo" />
            <img className={style.photo} src={indus} alt="photo" />
        </div>
    )
}