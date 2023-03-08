import { connect } from "react-redux";
import {compose} from "redux"
import style from "Post.module.scss"

const PostsContainer = props => {
    return(
        <div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({

})

export default compose(
    connect(mapStateToProps,null)
)(PostsContainer)

