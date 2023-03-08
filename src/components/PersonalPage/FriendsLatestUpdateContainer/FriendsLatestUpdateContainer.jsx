import { connect } from "react-redux";
import {compose} from "redux"
import { FriendsLatestUpdate } from "../FriendsLatestUpdate/FriendsLatestUpdate"; 

export const FriendsLatestUpdateContainer = props => {
    return(
        <div>  
            <FriendsLatestUpdate />
            <FriendsLatestUpdate />
            <FriendsLatestUpdate />
        </div>
    )
}

const mapStateToProps = (state) => ({

})


export default compose(
    connect(mapStateToProps, null)
)(FriendsLatestUpdateContainer)
