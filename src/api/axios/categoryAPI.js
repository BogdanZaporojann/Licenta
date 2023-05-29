import axios from "axios";

const baseUrl = 'https://brainwaveapi.onrender.com/auth/'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/posts/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})


export const categoryAPI = {
    async getCategories() {
        return await instance.get('').then(response => response.data.categories)
    },
    async getQuestionsByCategory(category) {
        return await instance.get(`${category}`)
            .then(result => result.data.comments)
    },
    async addQuestion(category, questionInfo) {
        return await instance.post(`${category}/addQuestion`, { questionInfo })
            .then(result => result)
    },
    async addAnswer(category, answerInfo) {
        debugger
        return await instance.post(`${category}/addAnswer`, { answerInfo })
            .then(result => result)
    },
    async getQuestionByTitle(category, title) {
        return await instance.get(`${category}/getQuestionByTitle?title=${title}`).then(result => result.data)
    }
}
