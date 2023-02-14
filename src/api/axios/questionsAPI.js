import axios from "axios";

const baseUrl = "https://brainwaveapi.onrender.com/posts/"
const baseUrl2 = "https://sns-production.up.railway.app/"
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/",
})
export const QuestionAPI = {
    getQuestions(itemsCount, page) {
        return axios.get(`${baseUrl}Engineer?page=${page}&itemsCount=${itemsCount}`).then(result => result.data)
    },
    addQuestion(questionInfo) {
        return axios.post(`${baseUrl}Engineer/addQuestion`, {questionInfo}
        )
    },
    addAnswer(answerInfo){
        console.log('',answerInfo)
        return axios.post(`${baseUrl}Engineer/addAnswer`,{answerInfo})
    }
}


