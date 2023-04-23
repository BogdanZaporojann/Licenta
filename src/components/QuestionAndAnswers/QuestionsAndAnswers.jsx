import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getQuestionAndAnswersByTitle } from "../../redux/reducers/questionReducer";
import indus from "../../assets/img/indus/indian_picture.jpg"
import classNames from "classnames";
import { SelectAnswer } from "./SelectAnswer/SelectAnswer";
import { TopContributors } from "./TopContributors/TopContributors";

import style from "./QuestionsAndAnswers.module.scss"

const QuestionsAndAnswers = (props) => {
    const [queryParameters] = useSearchParams()

    const title = queryParameters.get("title")

    useEffect(() => { props.getQuestionAndAnswersByTitle(title) }, [title])

    return (
        // <div>
        //     {props.selectedQuestion}
        //     {props.description}
        //     {props.date}
        //     {props.answer}
        // </div>
        <div className={style.container}>
            <div className={classNames(style.questionAndAnswerGrid)}>
                <div className={classNames(style.section_bottom_margin, style.questionSection)}>
                    <div>
                        <span className={style.discussion}>Discussion</span>
                        <span>Started {props.date}</span>
                    </div>
                    <div className={style.flex_center}>
                        <img className={style.photo_icon} src={indus} alt="Photo" />
                        <div className={style.grid}>
                            <span className={style.name}>Mateen Yaqoob</span>
                            <span className={style.education}>COMSATS University Islamabad</span>
                        </div>
                    </div>
                    <div>
                        {props.question}
                    </div>
                    <div>
                        {props.description}
                    </div>
                    <div className={style.line}>

                    </div>
                </div>
                <div className={style.questionSection}>
                    <div className={style.aa}>aaaaaaaaaa</div>
                    {props.answers.map(item => {
                        return <SelectAnswer answer={item.answer} />
                    })}
                </div>
            </div>
            <div className={style.secondSection}>
                <div className={style.secondSectionHeader}>Top Contributors to discution in this field</div>
                <TopContributors />
                <TopContributors />
                <TopContributors />
                <TopContributors />
                <TopContributors />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    question: state.questions.selectedQuestionInfo.question,
    description: state.questions.selectedQuestionInfo.description,
    date: state.questions.selectedQuestionInfo.date,
    answers: state.questions.answersInfo
})

export default compose(
    connect(mapStateToProps, { getQuestionAndAnswersByTitle })
)(QuestionsAndAnswers)