import style from "./NotificationPopupContainer.module.scss"
import svg from "../../../assets/svg/search.svg"
import classNames from "classnames"
import { connect } from "react-redux";
import { compose } from "redux";
import { getNotification, removeNotification, notificationWasReaded } from "../../../redux/reducers/notificationReducer";
import Notification from "./Notification/Notification";
import { useState, useEffect } from "react";
import { getFriend } from "../../../redux/reducers/friendReducer";

const NotificationPopupContainer = props => {

    const [notificationArray, setNotificationArray] = useState(props.notifications)

    useEffect(() => {
        setNotificationArray(props.notifications);
    }, [props.notifications]);
    const notification_popup_content = document.querySelector("#notification_popup_content")

    const [arr, setArr] = useState([])
    const [page, setPage] = useState(1)
    const [fetching, setFetching] = useState(true)




    const handlerClickNotification = (num, notificationId) => {
        switch (num) {

            case 1:
                setArr(prevState => [...prevState, notificationId])
                break
            case 2:
                arr.pop()
                setArr(prevState => [...prevState])
                break
        }
    }

    useEffect(() => {
        props.getFriend()
    }, [])


    useEffect(() => {
        if (fetching) {
            if (page === 1) {
                setPage(prevState => prevState + 1)
                props.getNotification(10, page, "simple")
            } else {
                props.getNotification(10, page, "additional")
                setFetching(false)
            }
        }
    }, [fetching])


    const scrollHandler = (e) => {
        if ((e.target.scrollHeight - (e.target.clientHeight + e.target.scrollTop) < 5) && props.itemsCount - notificationArray.length > 0) {
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
    }, [scrollHandler])




    function isAllUnchecked() {
        const checkboxes = document.querySelectorAll('#notification_popup_content input[type="checkbox"]');
        return !Array.from(checkboxes).some((checkbox) => checkbox.checked);
    }

    function handleNotificationRemove() {
        setNotificationArray(prevState => prevState.filter(notification => !arr.includes(notification._id)))

        // Обнуляем все чекбоксы
        const checkboxes = document.querySelectorAll('#notification_popup_content input[type="checkbox"]');
        Array.from(checkboxes).forEach((checkbox) => {
            checkbox.checked = false;
        });
        setArr([])

        props.removeNotification(arr)
    }





    return (
        <div className={props.isPopup ? style.notification_popup : style.none}>
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
                            <span >Following</span>
                            <span className={classNames(style.number_container, style.number_container_selected)}>6</span>
                        </div>

                    </div>
                    <span onClick={handleNotificationRemove} className={isAllUnchecked() ? style.none : style.deleteNotificationButton}>DELETE NOTIFICATION</span>
                </div>
            </div>
            <div id="notification_popup_content" className={style.notification_content}>
                {notificationArray.map(item => {
                    return <Notification setArr={setArr} handlerClickNotification={handlerClickNotification} friends={props.friends} type={item.type} notificationId={item._id} notificationDate={item.date} message={item.message} user={item.user} />
                })}
            </div>
        </div>
    )

}
const mapStateToProps = (state) => ({
    notifications: state.notifications.notifications,
    itemsCount: state.notifications.itemsCount,
    friends: state.friends.friends
})

export default compose(
    connect(mapStateToProps, { getNotification, removeNotification, getFriend })
)(NotificationPopupContainer)