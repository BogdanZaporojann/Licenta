import { connect } from "react-redux";
import { compose } from "redux"
import { FriendsLatestUpdate } from "../FriendsLatestUpdate/FriendsLatestUpdate";
import { getUsersByRegex } from "../../../redux/reducers/usersReducer";
export const FriendsLatestUpdateContainer = ({ users }) => {
    return (
        // <FriendsLatestUpdate />

        <div>
            {users?.users?.map(user => {
                return <FriendsLatestUpdate name={user.name} username={user.username} id={user.id}/>
            })}
        </div>

    )
}

const mapStateToProps = (state) => ({
    users: state.users.users
})


export default compose(
    connect(mapStateToProps, { getUsersByRegex })
)(FriendsLatestUpdateContainer)
