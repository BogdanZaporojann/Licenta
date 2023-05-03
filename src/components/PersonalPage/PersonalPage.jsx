import style from "./PersonalPage.module.scss"
import svg from "../../assets/svg/search.svg"
import classNames from "classnames"
import Followers from "./FollowersContainer/FollowersContainer"
import FriendsLatestUpdate from "./FriendsLatestUpdateContainer/FriendsLatestUpdateContainer"
import indus from "../../assets/img/indus/indian_picture.jpg"
import NotificationPopup from "./NotificationPopup/NotificationPopupContainer"
import notificationSVG from "../../assets/svg/notification.svg"
import { LeftSidebarShortcuts } from "./LeftSidebarShortcuts/LeftSidebarShortcuts"
import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { getFollowersPosts } from "../../redux/reducers/postsReducer"
import FollowersPost from "./FollowersPost/FollowersPost"
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import { addFunnyPost } from "../../redux/reducers/postsReducer";
import WithAuthRedirect from "../../HOF/withAuthRedirect";
import { compose } from "redux"
import camera from "../../assets/svg/camera.svg"
import { getUsersByRegex } from "../../redux/reducers/usersReducer"

import MakePost from "./MakePost/MakePost"


const PersonalPage = (props) => {

    const inputRef = useRef(null)
    const navigate = useNavigate();


    const handleClickPostByUsername = (event) => {
        const id = event.currentTarget.getAttribute("id");
        navigate(`/posts/${id}`)
    }

    const [isPopup, setIsPopup] = useState(false)

    const [page, setPage] = useState(1)
    const [fetching, setFetching] = useState(true)

    const scrollHandler = (e) => {
        if ((e.target.scrollHeight - (e.target.clientHeight + e.target.scrollTop) < 50)) {
            setFetching(true)
        }
    }

    useEffect(() => {
        if (fetching) {
            setPage(prevState => prevState + 1)
            props.getFollowersPosts(15, page)
            setFetching(false)
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])



    const handlePopupClick = () => {
        setIsPopup(!isPopup)
    }



    const formik = useFormik({
        initialValues: {
            "postFile": "",
            "name": "",
            "description": ""
        },
        onSubmit: values => {
            // props.addFunnyPost({
            //     postFile: values.postFile,
            //     post: { name: values.name, description: values.description }
            // })
            console.log('values : ', values)
        }
    })


    const onChangeSearchInputValue = () => {
        props.getUsersByRegex(inputRef.current.value)
    }






    const [photo, setPhoto] = useState("")

    return (
        <div>

            <NotificationPopup isPopup={isPopup} />
            <div className={style.wrapper}>


                <div className={style.header}>
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
                        <div>
                            <img onClick={handlePopupClick} className={style.header_right_icon} src={notificationSVG} alt="notification" />
                        </div>
                        <div id={props.username} onClick={handleClickPostByUsername}>
                            <span>{props.name}</span>
                            <img className={style.header_right_icon} src={props.photoURL} alt="my_photo" />
                        </div>
                    </div>
                </div>

                <div class={style.content}>
                    <div className={style.activity_feed}>Activity feed</div>
                    <div className={style.input_post}>
                        <div className={style.input_post_photo_section}>
                            <img className={style.photo} src={indus} alt="photo" />
                            <form onSubmit={formik.handleSubmit}>
                                <label className={style.sigmaCameraPost} htmlFor="postFile" >
                                    <img src={camera} alt="cameraIcon" />
                                </label>
                                <input className={style.none} id="postFile" name="postFile" type="file" onChange={(event) => {
                                    console.log('frf : ', setPhoto(URL.createObjectURL(event.currentTarget.files[0]).split("").slice(5).join("")))
                                    formik.setFieldValue("postFile", event.currentTarget.files[0])
                                }} />
                                <input className={style.textPost} type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} />
                                <button className={style.none} type="submit">SEND</button>
                            </form>
                        </div>
                        <div className={style.input_post_icons_section}>

                        </div>
                    </div>
                    <div className={style.posts_area}>
                        <div className={style.post_header}>
                            {props.followersPosts.map((item) => {
                                return <FollowersPost
                                    description={item.description}
                                    postId={item._id}
                                    authorUserName={item.author}
                                    files={item?.files}
                                    likes={item.likes}
                                    time={item.time} />
                            })}

                        </div>
                        <div className={style.post_content}>

                        </div>

                    </div>
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
                            FRIENDS
                        </span>
                        <input ref={inputRef} onChange={onChangeSearchInputValue} type="text" placeholder="Search Contacts..." />

                        <FriendsLatestUpdate users={props.foundUsersByRegExp} />
                    </div>
                </div>
            </div>
            <MakePost />
        </div>
    )
}

const mapStateToProps = (state) => ({
    photoURL: state.auth.authPhotoURL,
    name: state.auth.authName,
    username: state.auth.authUsername,
    followersPosts: state.posts.followersPosts,
    authUserId: state.auth.authUserId,
    foundUsersByRegExp: state.users.users.users
})

export default compose(
    connect(mapStateToProps, { getFollowersPosts, addFunnyPost, getUsersByRegex }),
    WithAuthRedirect
)(PersonalPage);