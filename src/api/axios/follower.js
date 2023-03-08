import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const FollowerAPI = {
    async getFollowerPreviewPhotos(userId) {
        const followerPreviewPhotos = await axios.get(`${userId}`).then(result => {
            return result.data
        })
    }
}