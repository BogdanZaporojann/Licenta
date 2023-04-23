import React from "react"
import style from "./LeftSidebarShortcuts.module.scss"
import home from "../../../assets/svg/home.svg"

export const LeftSidebarShortcuts = props => {
   return (
      <div className={style.container}>
         <div className={style.header}>
            SHORTCUTS
         </div>
         <div className={style.shortcutsContainer}>
            <div className={style.shortcutItem}>
               <img className={style.svg} src={home} alt="img" />
               <span>News Feed</span>
            </div>
            <div className={style.shortcutItem}>
               <img className={style.svg} src={home} alt="img" />
               <span>News Feed</span>
            </div><div className={style.shortcutItem}>
               <img className={style.svg} src={home} alt="img" />
               <span>News Feed</span>
            </div>
         </div>
         <div className={style.shortcutItem}>
            <img className={style.svg} src={home} alt="img" />
            <span>News Feed</span>
         </div>
         <div className={style.shortcutItem}>
            <img className={style.svg} src={home} alt="img" />
            <span>News Feed</span>
         </div><div className={style.shortcutItem}>
            <img className={style.svg} src={home} alt="img" />
            <span>News Feed</span>
         </div><div className={style.shortcutItem}>
            <img className={style.svg} src={home} alt="img" />
            <span>News Feed</span>
         </div><div className={style.shortcutItem}>
            <img className={style.svg} src={home} alt="img" />
            <span>News Feed</span>
         </div><div className={style.shortcutItem}>
            <img className={style.svg} src={home} alt="img" />
            <span>News Feed</span>
         </div><div className={style.shortcutItem}>
            <img className={style.svg} src={home} alt="img" />
            <span>News Feed</span>
         </div>
      </div>
   )
}