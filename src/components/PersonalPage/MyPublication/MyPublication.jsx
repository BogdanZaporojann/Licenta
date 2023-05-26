import indus from "../../../assets/img/indus/indian_picture.jpg"
import setting from "../../../assets/svg/setting.svg"
import style from "./MyPublication.module.scss"
import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import { getUserPosts } from "../../../redux/reducers/postsReducer";
import { useFormik } from "formik";
import { addFunnyPost } from "../../../redux/reducers/postsReducer";
import { useParams } from 'react-router-dom';
import UserPost from "../UserPost/UserPost";
import { useNavigate } from 'react-router-dom';
import { getUserInfoByUsername } from "../../../redux/reducers/authReducer";
import { addFriend, getFriend, requestedFriend } from "../../../redux/reducers/friendReducer";
import AllFriendsModal from "./AllFriendsModal";
import { LeftSidebarShortcuts } from "../LeftSidebarShortcuts/LeftSidebarShortcuts";
import { addFollower, removeFollower, checkFollower, getMyFollowers, getUsersFollowedByMe } from "../../../redux/reducers/followerReducer";
const MyPublicationPage = (props) => {





    useEffect(() => {
        props.getFriend()
        if (username !== props.authUsername) {
            props.getUserInfoByUsername(username)
        }
    }, [])






    const navigate = useNavigate()
    const { username } = useParams()


    const [isFollower, setIsFollower] = useState(false);
    useEffect(() => {
        props?.checkFollower(username).then(result => {
            setIsFollower(result)
        })
    }, [])


    const unfollow = (username) => {
        removeFollower(username)
        setIsFollower(prev => !prev)
    }

    const follow = (username) => {
        addFollower(username)
        setIsFollower(prev => !prev)
    }


    const handleFollowing = () => {
        isFollower
            ? unfollow(username)
            : follow(username)
    }



    useEffect(() => {
        props.getUserPosts(username)
    }, [])



    const formik = useFormik({
        initialValues: {
            "postFile": "",
            "name": "",
            "description": ""
        },
        onSubmit: values => {
            addFunnyPost({
                postFile: values.postFile,
                post: { name: values.name, description: values.description }
            })
        }
    })





    const handlerSendMessageClick = () => {
        navigate(`/messages/${username}`)
    }




    const handlerFriendRequestClick = () => {
        props.requestedFriend(username)
    }

    const [isShowModal, setIsShowModal] = useState(false)

    const handleGetAllFriends = () => {
        setIsShowModal(true)
    }

    let differentBlockHeader;


    if (username === props.authUsername) {
        differentBlockHeader =
            <div className={style.specific}>
                <span className={style.edit}>Edit Profile</span>
                <img className={style.settingIcon} src={setting} alt="setting" />
            </div>

    } else {
        differentBlockHeader =
            <>
                <span className={style.edit}>Subscribers</span>
                <span className={style.edit} onClick={handlerSendMessageClick}>Send Message</span>
                <span className={style.edit} onClick={handlerFriendRequestClick}>Friend Request</span>
                {
                    isFollower
                        ? <span className={style.edit} onClick={handleFollowing}>Отписаться</span>
                        : <span className={style.edit} onClick={handleFollowing}>Подписаться</span>
                }


            </>
    }


    return (
        <div className={style.wrap}>

            <div className={style.left}>
                <LeftSidebarShortcuts authPhotoUrl={props.authPhotoUrl} />
            </div>
            <div className={style.mainFlex}>
                <div className={style.container}>
                    <div>
                        <div className={style.vlack}>
                            <div className={style.header}>
                                <img className={style.mePhoto} src={setting} alt="me" />
                                <div className={style.menu}>
                                    <div className={style.profileInfoHeader}>
                                        {differentBlockHeader}
                                    </div>
                                    <div className={style.profileInfoMiddle}>
                                        <span>10 Publication</span>
                                        <span>60 Followers</span>
                                        <span>80 Subscriptions</span>
                                        <span onClick={handleGetAllFriends}>10friend</span>
                                    </div>
                                    <div>
                                        <span>
                                            Bogdan Strase
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style.gallery}>
                            {props.userPosts.map(item => {
                                if (item?.files[0]?.type === 'image') {

                                    return <img src={item.files[0].fileURL} alt="indus" />
                                }
                            })}
                            {props.userPosts.map((item) => {
                                if (item?.files[0]?.type === 'image') {

                                    return <UserPost
                                        description={item.description}
                                        postId={item._id}
                                        authorUserName={item.author}
                                        comments={item.comments}
                                        files={item?.files}
                                        likes={item.likes}
                                        time={item.time} />
                                }
                            })}
                        </div>
                        <div style={{ display: isShowModal ? 'flex' : 'none' }}>
                            {(props.friends.length > 0) && <AllFriendsModal setIsShowModal={setIsShowModal} friends={props.friends} isShowModal={isShowModal} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    friends: state.friends.friends,
    userPosts: state.posts.userPosts,
    authUsername: state.auth.authUsername,
    authPhotoUrl: state.auth.authPhotoURL
})

export default connect(mapStateToProps, {
    getUserPosts,
    addFunnyPost,
    getUserInfoByUsername,
    addFriend, getFriend,
    requestedFriend,

    addFollower,
    removeFollower,
    getMyFollowers,
    getUsersFollowedByMe,
    checkFollower
})(MyPublicationPage)