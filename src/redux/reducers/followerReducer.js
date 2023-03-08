import { FollowerAPI } from "../../api/axios/follower";

const initialState = {
    followersPreviewPhotos: []
}

const FOLLOWER_PREVIEW_PHOTOS = 'FOLLOWER_PREVIEW_PHOTOS';


export const followerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOWER_PREVIEW_PHOTOS:
            return {
                ...state,
                followersPreviewPhotos: action.followersPreviewPhotos
            }
        default:
            return state
    }
}


const setFollowerPreviewPhotos = (followersPreviewPhotos) => ({
    type: FOLLOWER_PREVIEW_PHOTOS,
    followersPreviewPhotos
})

export const getFollowerPreviewPhotos = (userId) => {
    return async (dispatch) => {
        const followersPreviewPhotos = await FollowerAPI.getFollowerPreviewPhotos(userId)
        dispatch(setFollowerPreviewPhotos(followersPreviewPhotos))
    }
}