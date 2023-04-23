import { QuestionAPI } from "../../api/axios/questionsAPI";

const SET_QUESTION = 'SET_QUESTION'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_QUESTION_INFO = 'SET_QUESTION_INFO'

const initialState = {
    questionData: 1,
    currentPage: 1,
    selectedQuestionInfo: 1,
    answersInfo:1
}

export const questionReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case SET_QUESTION_INFO:
            return {
                ...state,
                selectedQuestionInfo: action.questionAndAnswers.questionInfo,
                answersInfo: action.questionAndAnswers.responeInfo
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











const setQuestionInfoByTitle = (questionAndAnswers) => ({
    type: SET_QUESTION_INFO,
    questionAndAnswers
})

export const getQuestionAndAnswersByTitle = (title) => {
    return async (dispatch) => {
        let questionAndAnswers = await QuestionAPI.getQuestionWithAnswersByTitle(title)
        dispatch(setQuestionInfoByTitle(questionAndAnswers))
    }
}

export const addQuestion = (questionInfo) => {
    return async (dispatch) => {
        await QuestionAPI.addQuestion(questionInfo)
    }
}