import { calcHours } from "../../utils";
import style from "./Notification.module.scss"
import { connect } from "react-redux";
import { compose } from "redux";
import { addFriend, getFriend } from "../../../../redux/reducers/friendReducer";
const Notification = ({ handlerClickNotification, friends, notificationDate, notificationId, setArr, message, user, type }) => {

    const hourse = calcHours(notificationDate)

    const { _id, name, photoURL } = user




    return (
        <div>
            <img src={photoURL} alt="photo" />
            <div className={style.grid}>
                <span className={style.messageWidth}>
                    {message}
                </span>
                <span>
                    {hourse} h ago
                </span>
            </div>
            {
                type === 'request'
                    ? <div>
                        <span onClick={() => {
                            addFriend(_id)
                            {
                                friends.filter(friend => friend._id === _id)
                                ? console.log('este')
                                : console.log('nu este')
                            }
                        }} className={style.border}>Accept</span>
                        <span className={style.border}>Reject</span>
                    </div>
                    : <></>
            }

            <span>
                <input  type="checkbox" onClick={(e) => {
                    if (e.target.checked) {
                        handlerClickNotification(1, notificationId)
                    } else {
                        handlerClickNotification(2)
                    }
                }} />
            </span>
        </div>
    )
}


const mapStateToProps = state => ({

})


export default compose(
    connect(mapStateToProps, { addFriend, getFriend })
)(Notification)