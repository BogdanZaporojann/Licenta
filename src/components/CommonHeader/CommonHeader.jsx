import style from "./CommonHeader.module.scss"

export const CommonHeader = (props) => {
    return(
        <div className={style.container}>
            <div>lorem</div>
            <div className={style.grow}>
                <div className={style.inner_flex}>lorem</div>
            </div>
            <div>lorem</div>
            <div>lorem</div>
            <div>lorem</div>
        </div>
    )
}