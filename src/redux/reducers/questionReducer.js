import {QuestionAPI} from "../../api/axios/questionsAPI";
import {Question} from "../../components/QuestionPage/Question/Question";

const SET_QUESTION = 'SET_QUESTION'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'


const initialState = {
    questionData:1,
    currentPage: 1

}

export const questionReducer = (state=initialState, action) => {
    switch (action.type){
        case SET_QUESTION:
            return {
                ...state,
                questionData: action.questions
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        default:
            return state
    }
}


const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export const getCurrentPage = (currentPage) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage))
    }
}

const setQuestions = (questions) => ({
    type: SET_QUESTION,
    questions
})
export const getQuestions = (itemsCount, page) => {
    return async (dispatch) => {
        let questions = await QuestionAPI.getQuestions(itemsCount, page)
        dispatch(setQuestions(questions))
    }
}

export const addQuestion = (questionInfo) => {
    return async (dispatch) => {
        await QuestionAPI.addQuestion(questionInfo)
    }
}