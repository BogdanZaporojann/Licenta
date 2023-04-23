import React, {Component} from "react";
import {getQuestions, getCurrentPage, addQuestion} from "../../../redux/reducers/questionReducer";
import {QuestionPage} from "../QuestionPage";
import {connect} from "react-redux";

import {compose} from "redux";
export class QuestionPageContainer extends Component {


    componentDidMount() {
        this.props.getQuestions(1,1)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.currentPage !== this.props.currentPage){
            this.props.getQuestions(1,this.props.currentPage)
        }
    }

render() {
       return(
            <div>
                <QuestionPage user={this.props.user} addQuestion={this.props.addQuestion} currentPage={this.props.currentPage} getCurrentPage={this.props.getCurrentPage} itemsCount={this.props.itemsCount} questions={this.props.questions}  />
            </div>
        )
        }
}
const mapStateToProps = (state)=>({
    questions: state.questions.questionData,
    itemsCount: state.questions.questionData.itemsCount,
    currentPage: state.questions.currentPage,
    user: state.auth.user
})

export default compose(
    connect(mapStateToProps,{getQuestions, getCurrentPage, addQuestion})
)(QuestionPageContainer)
