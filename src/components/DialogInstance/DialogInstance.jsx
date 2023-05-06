import React, {useEffect} from "react"
import style from "./DialogInstance.module.scss"
import home from "../../assets/svg/home.svg"
import { Component } from "react"
import { connect } from "react-redux"
import { calcHours } from "../PersonalPage/utils"
import { getUserInfoByUsername } from "../../redux/reducers/authReducer"

const DialogInstance = ({
    name,
    username,
    photoURL,
    id,
    getUserInfoByUsername,
    currentUserLastVisit
}) => {

    useEffect(()=>{
        getUserInfoByUsername(username) 
    },[])

    return (
        <div className={style.container} >
            <img className={style.icon} src={photoURL} alt="home" />
            <div className={style.info}>
                <span className={style.name}>{name}</span>
                <span className={style.lastTime}>Online {calcHours(currentUserLastVisit)}h ago</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUserLastVisit: state.auth.currentUserLastVisit
})

export default connect(mapStateToProps, {getUserInfoByUsername})(DialogInstance)