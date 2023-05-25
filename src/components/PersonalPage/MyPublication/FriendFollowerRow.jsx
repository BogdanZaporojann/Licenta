import React from "react"
import { connect } from "react-redux"
import { checkFriend, removeFriend, requestedFriend } from "../../../redux/reducers/friendReducer";
import { useState, useEffect } from "react";
import styles from "./FriendFollowerRow.module.scss"

const FriendFollowerRow = (props) => {

    const [isFriend, setIsFriend] = useState(false);
    props?.checkFriend(props?.friend?.username).then(result => setIsFriend(result))

    const handleRemoveFriend = () => {
        console.log(props.friend.username)
        props.removeFriend(props.friend.username)
    }

    const handleRequestFriend = () => {
        
    }


    return (
        <div className={styles.wrapp}>
            <div className={styles.textAndPhotoContainer}>
                <span><img src={props?.friend?.photoURL} alt="photoURL" /></span>
                <div className={styles.infoContainer}>
                    <span className={styles.textInfo}>{props?.friend?.name}</span>
                    <span className={styles.textInfo}>{props?.friend?.username}</span>
                </div>
            </div>
            {isFriend
                ? <span onClick={handleRemoveFriend} className={styles.redButton}>Удалить</span>
                : <span onClick={handleRequestFriend} className={styles.greenButton}>Подписаться</span>
            }
        </div>
    )
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, { checkFriend, removeFriend, requestedFriend })(FriendFollowerRow)
