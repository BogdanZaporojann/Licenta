import { categoryAPI } from "../../api/axios/categoryAPI";

const GET_CALTGORIES = 'GET_CALTGORIES';
const GET_QUESTIONS = 'GET_QUESTION';
const GET_QUESTION_BY_TITLE = 'GET_QUESTION_BY_TITLE'

let initialState = {
    categories: [],
    questions : [],
    questionByTitle: []
}

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CALTGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case GET_QUESTION_BY_TITLE:
            return{
                ...state,
                questionByTitle: action.questionByTitle
            }
        default:
            return {
                ...state
            }
    }
}


const setCategories = (categories) => ({
    type: GET_CALTGORIES,
    categories
})

const setQuestions = (questions) => ({
    type: GET_QUESTIONS,
    questions
})

const setQuestionByTitle = (questionByTitle) => ({
    type: GET_QUESTION_BY_TITLE,
    questionByTitle
})

export const getCategories = () => {  
    return async (dispatch) => {
        const categories = await categoryAPI.getCategories()
        dispatch(setCategories(categories))
    }
}

export const getQuestions = (category) => {
    return async (dispatch) => {
        const questions = await categoryAPI.getQuestionsByCategory(category)
        dispatch(setQuestions(questions))
    }
}

export const addQuestion = (category,questionInfo) => {
    return async (dispatch) => {
        categoryAPI.addQuestion(category,questionInfo)
    }
}

export const getQuestionByTitle = (category, title) => {
    
    return async (dispatch) => {
        const questionByTitle = await categoryAPI.getQuestionByTitle(category, title)
        dispatch(setQuestionByTitle(questionByTitle))
    }
}

export const addAnswer = (category, answerInfo) => {
    
    return async (dispatch) => {
        categoryAPI.addAnswer(category, answerInfo)
    }
}