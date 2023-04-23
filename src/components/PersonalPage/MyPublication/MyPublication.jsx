import indus from "../../../assets/img/indus/indian_picture.jpg"
import setting from "../../../assets/svg/setting.svg"
import style from "./MyPublication.module.scss"
import React, { useEffect } from "react";
import { connect } from "react-redux"
import { getUserPosts } from "../../../redux/reducers/postsReducer";
import { useFormik } from "formik";
import { addFunnyPost } from "../../../redux/reducers/postsReducer";
import { useParams } from 'react-router-dom';
import FollowersPost from "../FollowersPost/FollowersPost";
import  UserPost  from "../UserPost/UserPost";


const MyPublicationPage = (props) => {





    const { username } = useParams()

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

    let differentBlockHeader;


    console.log("authusername : ", props.authUsername)
    if (username === props.authUsername) {
        differentBlockHeader =
            <>
                <span className={style.edit}>Edit Profile</span>
                <img className={style.settingIcon} src={setting} alt="setting" />
            </>

    } else {
        differentBlockHeader =
            <>
                <span className={style.edit}>Subscribers</span>
                <span className={style.edit}>Send Message</span>

            </>
    }


    return (
        <div className={style.container}>
            <div>


                <div className={style.vlack}>
                    <div className={style.header}>
                        <img className={style.mePhoto} src={setting} alt="me" />
                        <div className={style.menu}>
                            <div className={style.profileInfoHeader}>
                                <span>bogdanstrase</span>
                                {/* <span className={style.edit}>Edit Profile</span>
                                <img className={style.settingIcon} src={setting} alt="setting" /> */}

                                {differentBlockHeader}
                            </div>
                            <div className={style.profileInfoMiddle}>
                                <span>10 Publication</span>
                                <span>60 Followers</span>
                                <span>80 subscriptions</span>
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
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userPosts: state.posts.userPosts,
    authUsername: state.auth.authUsername
})

export default connect(mapStateToProps, { getUserPosts, addFunnyPost })(MyPublicationPage)