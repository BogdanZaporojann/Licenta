import { UserAPI } from "../../api/axios/userAPI";

const SET_USERS_BY_REGEXP_INITIAL = 'SET_USERS_BY_REGEXP_INITIAL'
const SET_USERS_BY_REGEXP_ADDITIONAL = 'SET_USERS_BY_REGEXP_ADDITIONAL'

const initialState = {
    users: {}
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_BY_REGEXP_INITIAL:
            return {
                ...state,
                users: action.users
            }
        case SET_USERS_BY_REGEXP_ADDITIONAL:
            return {
                ...state,
                users: {
                    users: [...state.users.users, ...action.users.users],
                    itemsCount: action.users.itemsCount
                }
            }
        default:
            return state
    }
}

const setUsersInitial = (users) => ({
    type: SET_USERS_BY_REGEXP_INITIAL,
    users
})

const setUsersAdditional = (users) => ({
    type: SET_USERS_BY_REGEXP_ADDITIONAL,
    users
})

export const getUsersByRegexInitial = (name, page) => {
    return async (dispatch) => {
        const users = await UserAPI.getUsersByRegex(name, page)
        dispatch(setUsersInitial(users))
    }
}

export const getUsersByRegexAdditional = (name, page) => {
    return async (dispatch) => {
        const users = await UserAPI.getUsersByRegex(name, page);
        dispatch(setUsersAdditional(users));
    }
}