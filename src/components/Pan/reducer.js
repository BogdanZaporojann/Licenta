import { type } from "./action"

const initialState = {
    translateX: 0,
    translateY: 0,
    prevMouseX: 0,
    prevMouseY: 0,
    scale: 0

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case type.START_PAN:
            return {
                ...state,
                prevMouseX: action.clientX,
                prevMouseY: action.clientY
            }
        case type.PAN:
            const deltaX = action.clientX - state.prevMouseX
            const deltaY = action.clientY - state.prevMouseY
            return {
                ...state,
                prevMouseX: action.clientX,
                prevMouseY: action.clientY,
                translateX: state.translateX + deltaX,
                translateY: state.translateY + deltaY
            }
    }
}


export default reducer