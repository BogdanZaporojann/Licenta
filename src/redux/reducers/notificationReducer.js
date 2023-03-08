import { notificationAPI } from "../../api/axios/notificationAPI"

const SET_NOTIFICATIONS = "SET_NOTIFICATIONS"

const initialState = {
    notifications: [],
    itemsCount: 0

}



export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return getNotificationExperimental(state, action)
        default:
            return state
    }
}


const setNotifications = (notifications) => ({
    type: SET_NOTIFICATIONS,
    notifications
})

const getNotificationExperimental = (state, action) => {
    const { notifications } = action
    return {
        ...state,
        notifications: [...state.notifications, ...notifications.notificationsData],
        itemsCount: notifications.itemsCount
    }
}

export const getNotification = (itemsCount, page) => {
    return async (dispatch) => {
        const notifications = await notificationAPI.getNotification(itemsCount, page)
        dispatch(setNotifications(notifications))
    }
}

