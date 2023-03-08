import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import { questionReducer } from "./reducers/questionReducer";
import thunkMiddleware from 'redux-thunk';
import { authReducer } from "./reducers/authReducer";
import { ChatReducer } from "./reducers/chatReducer";
import { followerReducer } from "./reducers/followerReducer";
import { notificationReducer } from "./reducers/notificationReducer";

let reducers = combineReducers({
    questions: questionReducer,
    auth: authReducer,
    chat: ChatReducer,
    follower: followerReducer,
    notifications: notificationReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));