import style from "./PersonalPage.module.scss"
import svg from "../../assets/svg/search.svg"
import FriendsLatestUpdate from "./FriendsLatestUpdateContainer/FriendsLatestUpdateContainer"
import NotificationPopup from "./NotificationPopup/NotificationPopupContainer"
import notificationSVG from "../../assets/svg/notification.svg"
import  LeftSidebarShortcuts  from "./LeftSidebarShortcuts/LeftSidebarShortcuts"
import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { getFollowersPosts } from "../../redux/reducers/postsReducer"
import FollowersPost from "./FollowersPost/FollowersPost";
import { useNavigate } from 'react-router-dom';
import { addFunnyPost } from "../../redux/reducers/postsReducer";
import WithAuthRedirect from "../../HOF/withAuthRedirect";
import { compose } from "redux"

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
            props.getFollowersPosts(1, page)
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

    const handlePopupClickOut = () => {
        isPopup && setIsPopup(false)
    }

    const handleStop = (e) => {
        e.stopPropagation()
    }




    const [regEx, setRegEx] = useState("")




    useEffect(() => {
        console.log(inputRef)
    }, [inputRef])



    const onChangeRegEx = () => {
        console.log(inputRef?.current?.value)
        setRegEx(inputRef?.current?.value)
    }


    const [photo, setPhoto] = useState("")

    return (
        <div onClick={handlePopupClickOut}>

            <div onClick={handleStop}>
                <NotificationPopup isPopup={isPopup} />
            </div>
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
                        Brain Wave
                    </div>
                    <div className={style.header_right}>
                        <div>
                            <img onClick={handlePopupClick} className={style.header_right_icon} src={notificationSVG} alt="notification" />
                        </div>
                        <div className={style.nameAndImage} id={props.username} onClick={handleClickPostByUsername}>
                            <span>{props.name}</span>
                            <img className={style.header_right_icon} src={props.photoURL} alt="my_photo" />
                        </div>
                    </div>
                </div>

                <div className={style.content}>
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



                <div className={style.left}>

                    <div className={style.followers_block}>
                        <LeftSidebarShortcuts authPhotoUrl={props.photoURL} withoutBrand={true} />
                    </div>
                </div>

                <div className={style.right}>
                    <div className={style.latest_update}>
                        <span className={style.lattest_update_section_text_margin_bottom}>
                            FRIENDS
                        </span>
                        <input onChange={onChangeRegEx} ref={inputRef} type="text" placeholder="Search Contacts..." />

                        <FriendsLatestUpdate regEx={regEx} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    photoURL: state.auth.authPhotoURL,
    name: state.auth.authName,
    username: state.auth.authUsername,
    followersPosts: state.posts.followersPosts,
    authUserId: state.auth.authUserId,
    foundUsersByRegExp: state.users.users.users,
    foundUsersByRegExpItemsCount: state.users.users.itemsCount
})

export default compose(
    connect(mapStateToProps, { getFollowersPosts, addFunnyPost }),
    WithAuthRedirect
)(PersonalPage);