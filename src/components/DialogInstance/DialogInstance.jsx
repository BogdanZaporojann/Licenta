import style from "./DialogInstance.module.scss"
import home from "../../assets/svg/home.svg"
import { Component } from "react"
export class DialogInstance extends Component {

    render() {

        const { name, photoURL, id } = this.props.chat
        const { handleClick } = this.props
        return (
            <div onClick={() => handleClick(id)} className={style.container} >
                <img className={style.icon} src={photoURL} alt="home" />
                <div className={style.info}>
                    <span>{name}</span>
                    <span>Buna seara dragi prieteni</span>
                </div>
                <div>
                    Ieri
                </div>
            </div>
        )
    }
}