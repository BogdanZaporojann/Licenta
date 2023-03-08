import style from "./FollowersContainer.module.scss"
import { useEffect } from "react"
import { connect } from "react-redux"
import { compose } from "redux";
import { Followers } from "../Followers/Followers";
import { getFollowerPreviewPhotos } from "../../../redux/reducers/followerReducer";
const FollowersContainer = (props) => {

    useEffect(() => {
        props.getFollowerPreviewPhotos(localStorage.getItem("user"))
    }, [])


    return (
        <div>
            <Followers />
        </div>
    )
}

const mapStateToProps = (state) => ({
    followersPreviewPhotos: state.follower.followersPreviewPhotos
})

export default compose(
    connect(mapStateToProps, { getFollowerPreviewPhotos })(FollowersContainer)
)