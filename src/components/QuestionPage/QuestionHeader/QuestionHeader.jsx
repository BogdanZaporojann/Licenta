import style from "./QuestionHeader.module.scss"

export const QuestionHeader = (props) => {
    return(
        <div >
            <hr/>
            <div className={style.text}>
                Questions related to Engineering
            </div>
            <hr/>
        </div>
    )
}