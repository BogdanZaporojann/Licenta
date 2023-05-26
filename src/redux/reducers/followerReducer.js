import { FollowerAPI } from "../../api/axios/follower";

const initialState = {
    usersFollowedByMe: [],
    myFollowers:[]
}

const USERS_FOLLOWED_BY_ME = 'USERS_FOLLOWED_BY_ME'

export const followerReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_FOLLOWED_BY_ME:
            return {
                ...state,
                usersFollowedByMe: state.usersFollowedByMe
            }
        default:
            return state
    }
}

const setUserFollowedByMe = (usersFollowedByMe) => ({
    type: USERS_FOLLOWED_BY_ME,
    usersFollowedByMe
})

const setMyFollowers = (myFollowers) => ({
    type: USERS_FOLLOWED_BY_ME,
    myFollowers
})

export const addFollower = async (userName) => {
    await FollowerAPI.addFollower(userName)
}

export const removeFollower = async (userName) => {
    await FollowerAPI.removeFollower(userName)
}

export const getUsersFollowedByMe = () => {
    return async (dispatch) => {
        const usersFollowedByMe = FollowerAPI.getUsersFollowedByMe()
        dispatch(setUserFollowedByMe(usersFollowedByMe))
    }
}

export const getMyFollowers = () => {
    return async (dispatch) => {
        const myFollowers = FollowerAPI.getMyFollowers()
        dispatch(setMyFollowers(myFollowers))
    }
}

export const checkFollower = (followerUserName) => {
    return async (dispatch) => {
        const isMyFollower = FollowerAPI.checkFollowers(followerUserName)
        return isMyFollower
    }
}