import style from "./FriendsLatestUpdate.module.scss"
import indus from "../../../assets/img/indus/indian_picture.jpg"
import classNames from "classnames"
export const FriendsLatestUpdate = ({name, username, id}) => {
    return(
        <div className={classNames(style.container, style.padding)}>
            <img className={style.photo} src={indus} alt="photo" />
            <div className={style.text}>  
                <span>text</span>
                <span>time</span>
            </div>
        </div>
    )
}