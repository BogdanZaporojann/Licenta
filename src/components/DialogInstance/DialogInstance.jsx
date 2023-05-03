import React, {useEffect} from "react"
import style from "./DialogInstance.module.scss"
import home from "../../assets/svg/home.svg"
import { Component } from "react"
import { connect } from "react-redux"
import { getUserInfoByUsername } from "../../redux/reducers/authReducer"

const DialogInstance = ({
    name,
    photoURL,
    id,
    handleChangeChat,
    getUserInfoByUsername,
    currentUserLastVisit
}) => {

    useEffect(()=>{
        getUserInfoByUsername(name) 
    },[])

    return (
        <div onClick={() => handleChangeChat(id)} className={style.container} >
            <img className={style.icon} src={photoURL} alt="home" />
            <div className={style.info}>
                <span className={style.name}>{name}</span>
                <span className={style.lastTime}>Online {}h ago</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUserLastVisit: state.auth.currentUserLastVisit
})

export default connect(mapStateToProps, {getUserInfoByUsername})(DialogInstance)