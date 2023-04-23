import { UserAPI } from "../../api/axios/userAPI";

const SET_USERS_BY_REGEXP = 'SET_USERS_BY_REGEXP'

const initialState = {
    users: [],
    usersCount:0
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_BY_REGEXP:
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}

const setUsers = (users) => ({
    type: SET_USERS_BY_REGEXP,
    users
})

export const getUsersByRegex = (name) => {
    return async (dispatch) => {
        const users = await UserAPI.getUsersByRegex(name)
        dispatch(setUsers(users))
    }
}