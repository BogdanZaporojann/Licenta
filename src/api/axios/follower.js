import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/followers",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const FollowerAPI = {
    async addFollower(followingUser) {
        debugger
        await instance.post('follow', { followingUser }).then(result => {
            debugger
        })
    },
    async removeFollower(unFollowingUser) {
        debugger
        await instance.delete('unFollow', { unFollowingUser }).then(result => {
            debugger
        })
    },
    async getUsersFollowedByMe() {
        await instance.get('followedByMe').then(result => {
            debugger
        })
    },
    async getMyFollowers() {
        await instance.get('followers').then(result => {
            debugger
        })
    },
    async checkFollowers(followerUserName) {
        return await instance.get(`checkFollower?followerUserName=${followerUserName}`).then(result => result.data.isFollower)
    }
}