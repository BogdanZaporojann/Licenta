import style from "./PersonalPage.module.scss"
import svg from "../../assets/svg/search.svg"
import classNames from "classnames"
import Followers from "./FollowersContainer/FollowersContainer"
import FriendsLatestUpdate from "./FriendsLatestUpdateContainer/FriendsLatestUpdateContainer"
import indus from "../../assets/img/indus/indian_picture.jpg"
import NotificationPopup from "./NotificationPopup/NotificationPopupContainer"
import notificationSVG from "../../assets/svg/notification.svg"

export const PersonalPage = props => {
    return (
        <div>
            
            <NotificationPopup />
            <div class={style.wrapper}>


                <div class={style.header}>
                    <div className={style.flex_center}>
                        <img className={style.logo} src={svg} alt="svg" />
                        <div className={style.grid}>
                            <span>Online</span>
                            <span>Communities</span>
                        </div>
                    </div>
                    <div className={style.a}>
                        aaaaaaaa
                    </div>
                    <div className={style.header_right}>
                        <img className={style.header_right_icon} src={notificationSVG} alt="notification" />
                        <img className={style.header_right_icon} src={notificationSVG} alt="notification" />
                        <img className={style.header_right_icon} src={notificationSVG} alt="notification" />
                    </div>
                </div>

                <div class={style.content}>
                    <div className={style.activity_feed}>Activity feed</div>
                    <div className={style.input_post}>
                        <div className={style.input_post_photo_section}>
                            <img className={style.photo} src={indus} alt="photo" />
                            <input type="text" placeholder="Share what is on your mind ..." />
                        </div>
                        <div className={style.input_post_icons_section}>
                            <img src={svg} alt="icon" />
                            <img src={svg} alt="icon" />
                        </div>
                    </div>
                    <div className={style.posts_area}>
                        <div className={style.post_header}>

                        </div>
                        <div className={style.post_content}>

                        </div>

                    </div>
                </div>

                <div class={style.sidebar}>
                    <img className={style.icon} src={svg} alt="svg" />
                    <img className={style.icon} src={svg} alt="svg" />
                    <img className={style.icon} src={svg} alt="svg" />
                    <img className={style.icon} src={svg} alt="svg" />
                    <img className={style.icon} src={svg} alt="svg" />
                </div>

                <div class={style.left}>
                    <div className={style.followers_block}>
                        <span>I am following 99</span>
                        <Followers />
                    </div>
                </div>

                <div class={style.right}>
                    <div className={style.latest_update}>
                        <span className={style.lattest_update_section_text_margin_bottom}>
                            Latest Update
                        </span>
                        <FriendsLatestUpdate />
                    </div>
                </div>
            </div>
        </div>
    )
}