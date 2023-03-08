import style from "./Paginator.module.scss"
import "../../../index.scss"
import {useSearchParams} from "react-router-dom";
export const Paginator = ({itemsCount, totalItemsCount, getCurrentPage, currentPage}) => {





    const computeNumberOfPage = () => {
        const pageNumbers = Math.ceil(totalItemsCount/itemsCount);
        return pageNumbers
    }



        const paginatorArr = []
        for(let i=1; i<=computeNumberOfPage(); i++){
            paginatorArr.push(i)
        }


    return(
        <div>
            <div className={style.paginators_container}>
                    {paginatorArr.map(item=>{
                        return <span className={currentPage === item ? style.gold : ""} onClick={()=>{getCurrentPage(item)}}>{item}</span>
                    })}
            </div>
            <hr/>
        </div>
    )
}