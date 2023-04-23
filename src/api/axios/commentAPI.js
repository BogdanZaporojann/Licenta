import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/comments/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const CommentAPI = {
    async addCommentToPost({commentInfo}) {
        
        console.log("comment info from axios : ", commentInfo)
        const data = await instance.post("addComment", { commentInfo }).then(data => console.log("data status comment post : ", data))
    }
}