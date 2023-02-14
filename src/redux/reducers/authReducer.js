import {authAPI} from "../../api/axios/authAPI";

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    user:''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.userData,
            }
        default:
            return state

    }
}

const setUserData = (userData) => ({
    type: SET_USER_DATA,
    userData
})

export const login = (userData) => {
    return async (dispatch) => {
        const user = await authAPI.login(userData)
        localStorage.setItem('user',user.user.id)
        dispatch(setUserData(user.user.id))
    }
}





export const registration = async (registrationData) => {
        const data = await authAPI.registration(registrationData)
        return data;
}