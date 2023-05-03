import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/conferences",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const meetingAPI = {
    async createConference(conferenceInfo) {
        return instance.post('/addConference', { conferenceInfo })
            .then(result => {
                console.log('ici : ',result)
            })
            .catch(err => console.log('err : ', err))
    },
    async getConference() {
        return instance.get('/getConference')
            .then(result => {
                console.log('result : ',result.data)
                return result.data
            })
            .catch(err => console.log(err))
    },
    async removeConference(conferenceID) {
        return instance.delete('/removeConference', {data:{
            conferenceID:"6451a8aaeb9e9bba0cb57fd6"
        }})
            .then(result => console.log('delete result : ', result))
            .catch(err => console.log(err))
    }
}