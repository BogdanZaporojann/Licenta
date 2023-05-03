import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/comments/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const CommentAPI = {

    async addCommentToPost(commentInfo) {
        await instance.post("addComment", { commentInfo }).then(data => console.log("data status comment post : ", data))
    },
    async addAnswerToComment(answerInfo) {
        await instance.post("addAnswer", { answerInfo }).then(data => console.log("data status answer to comment post : ", data))
    },
    async getCommentsByPostID(postId) {
        return await instance.get(`getByID?publicationID=${postId}`).then(result => {
            console.log('comments by post ID : ', result.data)
            return result.data
        })
    }

}