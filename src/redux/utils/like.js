import { likeAPI } from "../../api/axios/likeAPI"

export const addLike = (postID) => {
    likeAPI.addLike(postID)
}

export const removeLike = (postID) => {
    likeAPI.removeLike(postID)
}

export const checkIsLikedPost = (postID) => {
    return async (dispatch) => {
        const isLikedPost = await likeAPI.checkIsLikedPost(postID)
        debugger
        return isLikedPost
    }
}