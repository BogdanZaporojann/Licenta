import { friendAPI } from "../../api/axios/friendAPI"

const initialState = { friends: {} }

const SET_FRIENDS = 'SET_FRIENDS'

export const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.friends
            }
        default:
            return state

    }
}

const setFriends = (friends) => ({
    type: SET_FRIENDS,
    friends
})

export const addFriend = async (newFriend) => {
    return async (dispatch) => {
        await friendAPI.addFriend(newFriend)
    }
}

export const getFriend = () => {
    return async (dispatch) => {
        const friends = await friendAPI.getFriends()
        dispatch(setFriends(friends))
    }
}
