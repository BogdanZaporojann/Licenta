import style from "./TopicHeader.module.scss";

export const TopicHeader = (props) => {
    return(
            <div className={style.category}>
                <div className={style.sticky_block}>Question(978)</div>
                <div className={style.sticky_block}>Publications(321,442)</div>
            </div>
    )
}