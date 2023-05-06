import { chatAPI } from "../../api/axios/chatAPI"

const initialState = {
    chats: [{}],
    messagesArray: []
}

const SET_CHATS = 'SET_CHATS'
const SET_MESSAGES = 'SET_MESSAGES'
const SET_MESSAGES_CHANGE_DIALOG = "SET_MESSAGES_CHANGE_DIALOG"
const SET_MESSAGE_FROM_SOCKET = 'SET_MESSAGE_FROM_SOCKET'
export const ChatReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CHATS:
            return {
                ...state,
                chats: action.chats
            }
        case SET_MESSAGES:
            return {
                ...state,
                messagesArray: [...action.messagesArray, ...state.messagesArray]
            }
        case SET_MESSAGES_CHANGE_DIALOG: {
            return {
                ...state,
                messagesArray: [...action.messagesArray]
            }
        }
        case SET_MESSAGE_FROM_SOCKET:
            return {
                ...state,
                messagesArray: [...state.messagesArray, action.realtimeSocketMessage]
            }
        default:
            return state
    }
}

const setChats = (chats) => ({
    type: SET_CHATS,
    chats
})

const setConversation = (messagesArray) => ({
    type: SET_MESSAGES,
    messagesArray
})

const setConversationChangeDialog = (messagesArray) => ({
    type: SET_MESSAGES_CHANGE_DIALOG,
    messagesArray
})

const setSocketRealtimeMessage = (realtimeSocketMessage) => ({
    type: SET_MESSAGE_FROM_SOCKET,
    realtimeSocketMessage
})

export const getChats = () => {
    return async (dispatch) => {
        const chats = await chatAPI.getChats()
        dispatch(setChats(chats))
    }
}

export const getConversation = (idToUser, pageNumber, changeDialog = false) => {

    return async (dispatch) => {

        const messagesArray = await chatAPI.getMessages(idToUser, pageNumber)

        if (changeDialog) {
            debugger
            dispatch(setConversationChangeDialog(messagesArray.reverse()))
        } else {
            debugger
            dispatch(setConversation(messagesArray.reverse()))
        }
    }
}



export const sendMessage = async (payload) => {
    await chatAPI.sendMessage(payload)
}


export const getRealtimeSocketMessage = (realtimeSocketMessage) => {

    return (dispatch) => {
        dispatch(setSocketRealtimeMessage(realtimeSocketMessage))
    }
}

