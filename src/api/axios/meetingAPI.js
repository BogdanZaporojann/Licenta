import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/conferences",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})


const instanceOnline = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/conferences/online",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const meetingAPI = {
    async addConference(conferenceInfo) {
        return instance.post('/addConference', { conferenceInfo })
            .then(result => {
                console.log('ici : ', result)
            })
    },
    async getConference() {
        return instance.get('/getConference')
            .then(result => {
                console.log('conferences : ',result.data)
                return result.data
            })
            .catch(err => console.log(err))
    },
    async removeConference(conferenceID) {
        return instance.delete('/removeConference', {
            data: {
                conferenceID: "6451a8aaeb9e9bba0cb57fd6"
            }
        })
            .then(result => console.log('delete result : ', result))
            .catch(err => console.log(err))
    },


    async createConference() {
        return instanceOnline.post("/createRoom").then(result => result.data)
    },
    async getMetteredDomain() {
        return instanceOnline.get("/meteredDomain").then(result => result.data.meteredDomain)
    },
    async verifyMeeting(roomName) {
        return instanceOnline.get(`/verifyRoom?roomName=${roomName}`).then(result => result.data.roomFound)
    }
}