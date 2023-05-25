import { CommentAPI } from "../../api/axios/commentAPI"

const initialState = {
    comments: []
}

const SET_CURRENT_COMMENTS = 'SET_CURRENT_COMMENTS'

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        default:
            return { ...state }
    }
}

const setComments = (comments) => ({
    type: SET_CURRENT_COMMENTS,
    comments
})

export const getCommentsByPostID = (postId) => {
    return async (dispatch) => {
        const comments = await CommentAPI.getCommentsByPostID(postId)
        dispatch(setComments(comments))
    }

}

export const addCommentToPost = (commentInfo) => {
    CommentAPI.addCommentToPost(commentInfo)
}

export const addAnswerToComment = (answerInfo) => {
    CommentAPI.addAnswerToComment(answerInfo)
}



