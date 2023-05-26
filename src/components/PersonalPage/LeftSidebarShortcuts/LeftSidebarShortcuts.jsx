import React from "react"
import style from "./LeftSidebarShortcuts.module.scss"
import home from "../../../assets/svg/home.svg"
import addSquare from "../../../assets/svg/addSquare.svg"
import menu from "../../../assets/svg/menu.svg"
import message from "../../../assets/svg/message.svg"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"

const LeftSidebarShortcuts = ({
   authPhotoUrl,
   withoutBrand,
   authUserName }) => {
      
   const navigate = useNavigate()

   const onMessage = () => {
      navigate("/messages")
   }

   const onCrop = () => {
      navigate('/crop')
   }

   const onPersonalPage = () => {
      navigate('/personalPage')
   }

   const onHome = () => {
      navigate(`/posts/${authUserName}`)
   }

   return (
      <div className={withoutBrand ? style.containerWithoutLogo : style.container}>
         <div className={classNames(style.logo, withoutBrand && style.none)}>
            BrainWave
         </div>
         <div className={style.shortCuteContainer}>
            <div onClick={onPersonalPage}>
               <img src={home} alt="main" />
               <span>Main</span>
            </div>
            <div onClick={onMessage}>
               <img src={message} alt="message" />
               <span>Message</span>
            </div>
            <div onClick={onCrop}>
               <img src={addSquare} alt="createContent" />
               <span>Create</span>
            </div>
            <div onClick={onHome}>
               <img src={authPhotoUrl} alt="home" />
               <span>Home</span>
            </div>
         </div>
         <div className={style.setting}>
            <img src={menu} alt="Ещё" />
            <span >Ещё</span>
         </div>
      </div>
   )
}

const mapStateToProps = (state) => ({
   authUserName: state.auth.authUsername
})

export default connect(mapStateToProps, {})(LeftSidebarShortcuts)