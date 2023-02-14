import React from "react";
import style from "./Dropdown.module.scss"

export const Dropdown = ({text, isRadio, items}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }


    return(
        <div className={style.dropdown}>
            <span className={style.btnAftBfr} onClick={handleOpen}>
                <a className={style.text} href="#">{text}</a>
            </span>


            {open
                ?
                isRadio
                    ? <ul className={style.menu}>
                    {items.map((item,index)=>{
                        return (<li key={index}>
                            <input type="radio" name="radio" />
                            <label htmlFor="id">{item}</label>
                        </li>)
                    })}
                    </ul>
                   : <ul>
                        {items.map((item,index)=> {
                            return <li key={index}>
                                <input type="checkbox"/>
                                <label>{item}</label>
                            </li>
                        })}
                    </ul>
                : null
            }
        </div>
    )
};