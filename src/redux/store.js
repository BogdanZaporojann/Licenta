import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {questionReducer, aut} from "./reducers/questionReducer";
import thunkMiddleware from 'redux-thunk';
import {authReducer} from "./reducers/authReducer";


let reducers = combineReducers({
    questions: questionReducer,
    auth: authReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));