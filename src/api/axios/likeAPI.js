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
        
        instance.post('addLike',{postID}).then(result=>{
            
            return result
        })
    },
    async removeLike(postID){
        debugger
        instance.delete('removeLike',{
            data:{
                postID
            }
        }).then(result=>result)
    },
    async checkIsLikedPost(postID){
        return instance.get(`checkIsLiked?postID=${postID}`).then(result=>result.data.isLiked)
    }
}