import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import { connect } from "react-redux";
import { checkFriend } from "../../../redux/reducers/friendReducer";
import FriendFollowerRow from "./FriendFollowerRow";
import styles from "./AllFriendsModal.module.scss"

const AllFriendsModal = ({ friends, isShowModal, setIsShowModal, checkFriend }) => {


    const handleClickOnParent = () => {
        console.log(setIsShowModal(false))
    }

    const handleChildClick = (event) => {
        event.stopPropagation();
    };
    return (
        <div onClick={handleClickOnParent}>
            <Modal
                isOpen={isShowModal}
                style={
                    {
                        content: {
                            padding: '0',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            transform: 'translate(-50%, -50%)',
                            border: 'none',
                            borderRadius: '0  ',
                            width: `350px`,
                            height: "350px",
                            border: "1px solid black",
                            borderRadius: "20px"
                        }
                    }
                }>
                <div className={styles.a} onClick={handleChildClick}>
                    <div className={styles.header}>
                        <span>Ваши подписки</span>
                    </div>
                    <div className={styles.scroll}>
                        {friends?.map((friend) => <FriendFollowerRow friend={friend} />)}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {

}

export default connect(mapStateToProps, { checkFriend })(AllFriendsModal)