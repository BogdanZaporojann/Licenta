import { connect } from "react-redux";
import { compose } from "redux"
import { FriendsLatestUpdate } from "../FriendsLatestUpdate/FriendsLatestUpdate";
import { getUsersByRegexInitial, getUsersByRegexAdditional } from "../../../redux/reducers/usersReducer";
import { useEffect, useState } from "react";
import styles from "./FriendsLatestUpdateContainer.module.scss"
export const FriendsLatestUpdateContainer = ({
    users,
    regEx,
    itemsCount,
    getUsersByRegexInitial,
    getUsersByRegexAdditional }) => {

    const [page, setPage] = useState(1);

    //TODO: СДЕЛАЙ КРАСИВО, ДОБАВЬ USEEFFECT КОТОРЫЙ ПРОВЕРЯЕТ ЧТО ЧИСЛО ЭЛЕМЕНТОВ ТЕКУЩЕГО МАССИВА НЕ ПРЕВЫЩАЕТ ITEMSCOUNT, 
    //А ЕСЛИ ПЕРВЫШАЕТ СОЗДАЙ АКТИОН КОТОРЫЙ УДАЛЯЕТ ПОСЛЕДНИЕ K ЭЛМЕМЕНТОВ В СЛУЧАЕ ЧТОПРЕВЫШЕНИЕ НА К С ПОМОЩЬЮ splice(-k)

    useEffect(() => {
        console.log('regex : ',regEx)
        setPage(1);
        (regEx !== "") && getUsersByRegexInitial(regEx, page);
        
    }, [regEx])


    const handleClickShowMore = () => {
        setPage(prev => prev + 1);
        
        (users?.users?.length < itemsCount) && getUsersByRegexAdditional(regEx, page);
    }

    return (
        <div className={styles.container}>
            {users?.users?.map(user => {
                return <FriendsLatestUpdate name={user?.name} username={user?.username} id={user?.id} />
            })}
            <span className={styles.showMoreBtn} onClick={handleClickShowMore}>Show more</span>
        </div>

    )
}

const mapStateToProps = (state) => ({
    users: state?.users?.users,
    itemsCount: state?.users?.users?.itemsCount
})


export default compose(
    connect(mapStateToProps, { getUsersByRegexInitial, getUsersByRegexAdditional })
)(FriendsLatestUpdateContainer)