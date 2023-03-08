import axios from "axios";

const baseUrl = "https://brainwaveapi.onrender.com/posts/"
const baseUrl2 = "https://sns-production.up.railway.app/"
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/posts",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})
export const QuestionAPI = {
    getQuestions(itemsCount, page) {
        return instance.get(`${baseUrl}Engineer?page=${page}&itemsCount=${itemsCount}`).then(result => result.data)
    },
    addQuestion(questionInfo) {
        return instance.post(`${baseUrl}Engineer/addQuestion`, {questionInfo}
        )
    },
    addAnswer(answerInfo){
        return instance.post(`${baseUrl}Engineer/addAnswer`,{answerInfo},{withCredentials:true})
    },

    //??
    getQuestionWithAnswersByTitle(title){
        return instance.get(`${baseUrl}Engineer/getQuestionByTitle?title=${title}`,{
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                
            }
        }).then(result => {
            return result.data
        })
    },

    //??
    updateQuestion(questionInfo){
        return instance.put(`${baseUrl}/Engineer/changeQuestion/`)
    }
}


