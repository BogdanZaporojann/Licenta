import style from "./MicroProfile.module.scss"
import indus from "../../../assets/img/indus/indian_picture.jpg"
export const MicroProfile = (props) => {
    return(
        <div className={style.container}>
            <img className={style.photo} src={indus} alt="indus"/>
            <div className={style.personal_info}>
                <div><a href="app/client/components/common/MicroProfile#"><span>Joshua David Summers</span></a></div>
                <div><a href="app/client/components/common/MicroProfile#"><span>University of Texas at Dallas</span></a></div>
            </div>
        </div>
    )
}