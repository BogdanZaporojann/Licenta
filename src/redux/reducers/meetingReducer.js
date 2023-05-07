import { meetingAPI } from "../../api/axios/meetingAPI"


const initialState = {
    lastCreatedRoomName: "",
    metteredDomain: '',
    roomFound: "",
}

const LAST_CREATED_ROOM_NAME = "LAST_CREATED_ROOM_NAME"
const METTERED_DOMAIN = "METTERED_DOMAIN"
const IS_ROOM_FOUND_STATUS = "IS_ROOM_FOUND_STATUS"

export const MeetReducer = (state = initialState, action) => {
    switch (action.type) {
        case LAST_CREATED_ROOM_NAME:
            return {
                ...state,
                lastCreatedRoomName: action.lastCreatedRoomName.roomName
            }
        case METTERED_DOMAIN:
            return {
                ...state,
                metteredDomain: action.metteredDomain
            }
        case IS_ROOM_FOUND_STATUS:
            return {
                ...state,
                roomFound: action.roomFound
            }
        
        default:
            return state
    }
}




const setLastCreatedRoomName = (lastCreatedRoomName) => ({
    type: LAST_CREATED_ROOM_NAME,
    lastCreatedRoomName
})

const setMetteredDomain = (metteredDomain) => ({
    type: METTERED_DOMAIN,
    metteredDomain
})

const setStatusRoomFound = (roomFound) => ({
    type: IS_ROOM_FOUND_STATUS,
    roomFound
})

export const addConference = (conferenceInfo) => {
    // return async (dispatch) => {
    //     const roomName = await meetingAPI.addConference(conferenceInfo)
    //     dispatch(setLastCreatedRoomName(roomName))
    // }
}
export const createConference = () => {
    return async (dispatch) => {
        const lastCreatedRoomName = await meetingAPI.createConference()
        dispatch(setLastCreatedRoomName(lastCreatedRoomName))
    }
}

export const getConference = async () => {
    return await meetingAPI.getConference()
}

export const deleteConference = (conferenceID) => {
    return meetingAPI.removeConference(conferenceID)
}

export const getMetteredDomain = () => {
    return async (dispatch) => {
        const metteredDomain = await meetingAPI.getMetteredDomain()
        dispatch(setMetteredDomain(metteredDomain))

    }
}

export const verifyMeeting = (roomName) => {

    return async (dispatch) => {
        const roomFound = await meetingAPI.verifyMeeting(roomName)
        dispatch(setStatusRoomFound(roomFound))
    }
}