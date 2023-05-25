import axios from "axios";
import { addFunnyPost } from "../../redux/reducers/postsReducer";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://brainwaveapi.onrender.com/pagePosts/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type":"multipart/form-data"
    }
})

// const instanceMultipart = axios.create({
//     withCredentials: true,
//     baseURL: 'https://brainwaveapi.onrender.com/pagePosts/',
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//         "Content-Type":"multipart/form-data"
//     }
// })

export const postsAPI = {
    async getFollowersPosts(itemsCount,page) {
        const data = await instance.get(`followersPosts?itemsCount=${itemsCount}&page=${page}`).then(data=> {
            return data.data
        })
        return data
    },
    async getUserPosts(username){
        const data = await instance.get(`userPosts?username=${username}&page=1&itemsCount=15`).then(data=> data.data.publications)
        return data
    },
    async addFunnyPost(values){
        console.log(values)
        const formData = new FormData()
        formData.append("postFile",values)
        await instance.post(`add`,values)
    }
}
