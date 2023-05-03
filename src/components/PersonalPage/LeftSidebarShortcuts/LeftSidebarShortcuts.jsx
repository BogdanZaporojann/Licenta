import React from "react"
import style from "./LeftSidebarShortcuts.module.scss"
import home from "../../../assets/svg/home.svg"
import addSquare from "../../../assets/svg/addSquare.svg"
import menu from "../../../assets/svg/menu.svg"
import message from "../../../assets/svg/message.svg"



export const LeftSidebarShortcuts = ({authPhotoUrl}) => {
   return (
      <div className={style.container}>
         <div className={style.logo}>
            BrainWave
         </div>
         <div className={style.shortCuteContainer}>
            <div>
               <img src={home} alt="main" />
               <span>Main</span>
            </div>
            <div>
               <img src={message} alt="message" />
               <span>Message</span>
            </div>
            <div>
               <img src={addSquare} alt="createContent" />
               <span>Create</span>
            </div>
            <div>
               <img src={authPhotoUrl} alt="home" />
               <span>Home</span>
            </div>
         </div>
         <div className={style.setting}>
            <img src={menu} alt="Ещё" />
            <span>Ещё</span>
         </div>
      </div>
   )
}

