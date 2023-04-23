import { CommentAPI } from "../../api/axios/commentAPI"


export const addCommentToPost = (commentInfo) => {
    console.log("commentInfo from reducer",commentInfo)
    return CommentAPI.addCommentToPost(commentInfo)
}