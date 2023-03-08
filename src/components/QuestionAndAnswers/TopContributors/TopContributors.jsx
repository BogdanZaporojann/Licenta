import style from "./TopContributors.module.scss"
import indus from "../../../assets/img/indus/indian_picture.jpg"

export const TopContributors = props => {
    return (
        <div className={style.container}>
            <div className={style.flex}>
                <img className={style.photo} src={indus} alt="Photo" />
                <div className={style.grid}>
                    <span className={style.name}>Jassim Mohsen Abed</span>
                    <span className={style.education}>University of Basrah</span>
                </div>
            </div>
        </div>
    )
}