import { notificationAPI } from "../../api/axios/notificationAPI"

const SET_NOTIFICATIONS_ADDITIONAL = "SET_NOTIFICATIONS_ADDITIONAL"
const SET_NOTIFICATIONS_SEIMPLE = "SET_NOTIFICATIONS_SEIMPLE"

const initialState = {
    notifications: [],
    itemsCount: 0
}



export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS_ADDITIONAL:
            return getNotificationAddition(state, action)
        case SET_NOTIFICATIONS_SEIMPLE:
            return getNotificationSimple(state,action)
        default:
            return state
    }
}


const setNotificationsAdditional = (notifications) => ({
    type: SET_NOTIFICATIONS_ADDITIONAL,
    notifications
})
const setNotificationsSimple = (notifications) => ({
    type: SET_NOTIFICATIONS_SEIMPLE,
    notifications
})

const getNotificationAddition = (state, action) => {
    const { notifications } = action
    return {
        ...state,
        notifications: [...state.notifications, ...notifications.notificationsData],
        itemsCount: notifications.itemsCount
    }
}

const getNotificationSimple = (state, action) => {
    const { notifications } = action
    return{
        ...state,
        notifications:[...notifications.notificationsData],
        itemsCount: notifications.itemsCount
    }
}

export const getNotification = (itemsCount, page, type) => {
    return async (dispatch) => {
        const notifications = await notificationAPI.getNotification(itemsCount, page)
        
        switch(type){
            case "additional":
                dispatch(setNotificationsAdditional(notifications))
                break
            case "simple":
                dispatch(setNotificationsSimple(notifications))
                break
            default:
                return
        }
    }
}


export const removeNotification = (notificationsID) => {
    return async (dispatch) => {
        await notificationAPI.removeNotification(notificationsID)
    }
}


export const notificationWasReaded = (notificationsID) => {
    return async (dispatch) => {
        await notificationAPI.notificationWasReaded(notificationsID)
    }
}