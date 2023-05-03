import { meetingAPI } from "../../api/axios/meetingAPI"

export const meetingReducer = (state = {}, action) => {
    switch (action.type) { }
}

export const addConference = (conferenceInfo) => {
    return meetingAPI.createConference(conferenceInfo)
}

export const getConference = async ()  => {
    return await meetingAPI.getConference()
}

export const deleteConference = (conferenceID) => {
    return meetingAPI.removeConference(conferenceID)
}