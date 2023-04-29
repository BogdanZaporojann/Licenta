import style from "./FriendsLatestUpdate.module.scss"
import indus from "../../../assets/img/indus/indian_picture.jpg"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
export const FriendsLatestUpdate = ({name, username, id}) => {

    const navigate = useNavigate();

    const handleClickPostByUsername = (event) => {
        navigate(`/posts/${username}`)
    }

    return(
        <div onClick={handleClickPostByUsername} className={classNames(style.container, style.padding)}>
            <img className={style.photo} src={indus} alt="photo" />
            <div className={style.text}>  
                <span>text</span>
                <span>time</span>
            </div>
        </div>
    )
}