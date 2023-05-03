import { authAPI } from "../../api/axios/authAPI";

const SET_USER_DATA = 'SET_USER_DATA'
const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO'

const initialState = {
    authName: '',
    authPhotoURL: '',
    authEmail: '',
    authUsername: '',
    education: '',



    currentUserUserName: '',
    curentUserPhotoURL: '',
    curentUserName: '',
    curentUserEmail: '',
    curentUserFollowers: '',
    curentUserFollowedByMe: '',
    currentUserEducation: '',
    currentUserLastVisit: ''
}




export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_CURRENT_USER_INFO:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}



export const login = (userData) => {
    return async (dispatch) => {
        const user = await authAPI.login(userData)
        localStorage.setItem('accessToken', user.accessToken)
    }
}

export const logout = () => {
    return async (dispatch) => {
        const logoutMessage = authAPI.logout()
        dispatch(setAuthUserData('', '', '', ''))
    }
}

export const registration = async (registrationData) => {
    const data = await authAPI.registration(registrationData)
    return data;
}

export const setAuthUserData = (authName, authPhotoURL, authEmail, authUsername, education) => ({
    type: SET_USER_DATA,
    payload: { authName, authPhotoURL, authEmail, authUsername, education }
})

export const getAuthUserData = () => {
    return async (dispatch) => {

        if (!localStorage.getItem("accessToken")) {
            dispatch(setAuthUserData("", "", "", "", ""));
        } else {
            const data = await authAPI.me()
            const { name, photoURL, email, username, education } = data
            dispatch(setAuthUserData(name, photoURL, email, username, education))

        }

    }
}

export const getUserInfoByUsername = (userName) => {

    return async (dispatch) => {
        const data = await authAPI.getUserInfoByUsername(userName)
        const { userData } = data
        const { username, photoURL, name, email, followers, followedByMe, education, lastVisit } = userData
        dispatch(setCurrentUserInfo(username, photoURL, name, email, followers, followedByMe, education, lastVisit))
    }
}

const setCurrentUserInfo = (
    currentUserUserName,
    curentUserPhotoURL,
    curentUserName,
    curentUserEmail,
    curentUserFollowers,
    curentUserFollowedByMe,
    currentUserEducation,
    currentUserLastVisit) => ({
        type: SET_CURRENT_USER_INFO,
        payload: {
            currentUserUserName,
            curentUserPhotoURL,
            curentUserName,
            curentUserEmail,
            curentUserFollowers,
            curentUserFollowedByMe,
            currentUserEducation,
            currentUserLastVisit
        }
    })