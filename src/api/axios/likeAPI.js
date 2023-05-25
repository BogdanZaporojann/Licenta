import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/publications",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const likeAPI ={
    async addLike(postID){
        debugger
        instance.post('addLike',{postID}).then(result=>{
            console.log(result)
            debugger
            return result
        })
    },
    async removeLike(postID){
        instance.post('removeLike',{postID}).then(result=>result)
    },
    async checkIsLikedPost(postID){
        return instance.get(`checkIsLiked?postID=${postID}`).then(result=>result.data.isLiked)
    }
}