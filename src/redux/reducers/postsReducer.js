import { postsAPI } from "../../api/axios/postAPI"


const FOLLOWERS_POSTS = 'FOLLOWERS_POSTS'
const USER_POSTS = 'USER_POSTS'


let initialState = {
    followersPosts: [],
    userPosts:[]
}
export const postsReducer = ( state = initialState ,action) => {
    switch (action.type){
        case FOLLOWERS_POSTS:
        return {
            ...state,
            followersPosts: action.followersPosts
        }
        case USER_POSTS:
        return {
            ...state,
            userPosts:action.userPosts
        }
        default :
            return {
                ...state
            }
    }
}

const setFollowersPosts = (followersPosts) =>({
    type: FOLLOWERS_POSTS,
    followersPosts
})

export const getFollowersPosts = (itemsCount=1,page=3) => {
    return async (dispatch) => {
        const followerPosts = await postsAPI.getFollowersPosts(itemsCount,page)
        dispatch(setFollowersPosts(followerPosts))
    }
}


const setMyPosts = (userPosts) => ({
    type: USER_POSTS,
    userPosts
})

export const getUserPosts = (username) => {
    return async (dispatch) => {
        const userPosts = await postsAPI.getUserPosts(username)
        
        dispatch(setMyPosts(userPosts))
    }
}


export const addFunnyPost = (values) => {
    return async (dispatch) => {
        await postsAPI.addFunnyPost(values)
    }
}