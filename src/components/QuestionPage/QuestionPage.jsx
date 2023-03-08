import {Paginator} from "./Paginator/Paginator";
import {Question} from "./Question/Question";
import {MicroProfile} from "../common/MicroProfile/MicroProfile";
import classNames from "classnames";
import style from "./QuestionPage.module.scss";

import {AddQuestion} from "./AddQuestion/AddQuestion";
export const  QuestionPage = (props) => {



    const { comments, totalItemsCount, itemsCount} = props.questions;
    const {getCurrentPage, currentPage, addQuestion, user} = props


    const container = classNames(style.flex,style.common)

    return(
            <div>
                <div className={container}>
                    <div className="containerGeneral">
                        <Paginator currentPage={currentPage} getCurrentPage={getCurrentPage} itemsCount={itemsCount} totalItemsCount={totalItemsCount} />
                        {comments?.map(item=> {
                            return <Question items={item}  />
                        })}
                        <AddQuestion user={user} addQuestion={addQuestion}/>
                    </div>
                    <div className={style.mar}>
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                        <MicroProfile />
                    </div>
                </div>
            </div>
    )
}