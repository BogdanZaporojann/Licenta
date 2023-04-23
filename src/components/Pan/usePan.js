import { useReducer, useEffect } from "react"
import { pan, startPan } from "./action"
import reducer from "./reducer"
const usePan = () => {
    const [state, dispatch] = useReducer(reducer)

    useEffect(() => {
        console.log(state)
    }, [state])
    const onMouseDown = (event) => {
        dispatch(startPan(event))
        window.addEventListener('mouseup', onMouseUpInWindow)
        window.addEventListener('mousemove', onMouseMoveInWindow)
    }

    const onMouseUpInWindow = () => {
        window.removeEventListener('mouseup', onMouseUpInWindow)
        window.removeEventListener('mousemove', onMouseMoveInWindow)
    }

    const onMouseMoveInWindow = (event) => {
        event.preventDefault();
        dispatch(pan(event))
    }

    return {
        ...state,
        onMouseDown
    }
}

export default usePan