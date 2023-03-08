import style from "./NotificationPopupContainer.module.scss"
import svg from "../../../assets/svg/search.svg"
import classNames from "classnames"
import { connect } from "react-redux";
import { compose } from "redux";
import { getNotification } from "../../../redux/reducers/notificationReducer";
import { Notification } from "./Notification/Notification";
import { useState, useEffect } from "react";

const NotificationPopupContainer = props => {


    const notification_popup_content = document.querySelector("#notification_popup_content")

    const [page, setPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        props.getNotification(10, page)
    }, [])



    useEffect(() => {
        if (fetching) {
            console.log('notifications length : ', props.notifications.length)
            console.log('itemsCount : ', props.itemsCount)
            console.log('condition 2 : ',(props.notifications.length <= props.itemsCount))
            setPage(prevState => prevState + 1)
            props.getNotification(10, page)
            setFetching(false)
        }
    }, [fetching])






    const scrollHandler = (e) => {
        if ((e.target.scrollHeight - (e.target.clientHeight + e.target.scrollTop) < 5)
            && (props.notifications.length <= props.itemsCount)) {
                console.log('pizdetu')
            setFetching(true)
        }
    }




    useEffect(() => {
        if (notification_popup_content) {
            notification_popup_content.addEventListener('scroll', scrollHandler)

            return function () {
                notification_popup_content.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [notification_popup_content])

    // useEffect(() => {
    //     if (fetching) {
    //         props.getNotification(page)
    //     }
    // }, [fetching])






    const notificationArray = props.notifications



    return (
        <div className={style.notification_popup}>
            <div className={style.notification_header}>
                <div className={style.a}>
                    <span>Notification</span>
                    <span className={style.text_underline}>Mark all as read</span>
                </div>
                <div>
                    <div className={style.notification_header_categories}>
                        <div>
                            <span>All</span>
                            <span className={classNames(style.number_container, style.number_container_selected)}>8</span>
                        </div>
                        <div>
                            <span>Following</span>
                            <span className={classNames(style.number_container, style.number_container_selected)}>6</span>
                        </div>
                        <div>
                            <span>Archive</span>
                        </div>
                    </div>
                    <img src={svg} alt="setting_icon" />
                </div>
            </div>
            <div id='notification_popup_content' className={style.notification_content}>
                {notificationArray.map(item => {
                    return <Notification notificationDate={item.date} message={item.message} user={item.user} />
                })}
            </div>
        </div>
    )

}
const mapStateToProps = (state) => ({
    notifications: state.notifications.notifications,
    itemsCount: state.notifications.itemsCount

})

export default compose(
    connect(mapStateToProps, { getNotification })
)(NotificationPopupContainer)