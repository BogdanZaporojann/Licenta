import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import { questionReducer } from "./reducers/questionReducer";
import thunkMiddleware from 'redux-thunk';
import { authReducer } from "./reducers/authReducer";
import { ChatReducer } from "./reducers/chatReducer";
import { followerReducer } from "./reducers/followerReducer";
import { notificationReducer } from "./reducers/notificationReducer";
import { friendReducer } from "./reducers/friendReducer";
import { appReducer } from "./reducers/appReducer";
import { postsReducer } from "./reducers/postsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { commentReducer } from "./reducers/commentReducer";
let reducers = combineReducers({
    questions: questionReducer,
    auth: authReducer,
    chat: ChatReducer,
    follower: followerReducer,
    notifications: notificationReducer,
    friends: friendReducer,
    app: appReducer,
    posts: postsReducer,
    users: usersReducer,
    comments:commentReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));