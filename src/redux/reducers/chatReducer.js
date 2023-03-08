import { chatAPI } from "../../api/axios/chatAPI"

const initialState = {
    chats: [],
    messagesArray: []
}

const SET_CHATS = 'SET_CHATS'
const SET_MESSAGES = 'SET_MESSAGES'

export const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            return {
                ...state,
                chats: action.chats
            }
        case SET_MESSAGES:
            return{
                ...state,
                messagesArray: action.messagesArray
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

export const getChats = () => {
    return async (dispatch) => {
        const chats = await chatAPI.getChats()
        dispatch(setChats(chats))
    }
}

//TO DO: NEED TO CA SI SIBI ASTEPTARI DACI NET NUI

export const sendMessage = async (payload) => {
    
    await chatAPI.sendMessage(payload)
}

export const getConversation = (idToUser) => {
    return async (dispatch) => {
        
        const messagesArray = await chatAPI.getMessages(idToUser)
        dispatch(messagesArray)
    }
}
