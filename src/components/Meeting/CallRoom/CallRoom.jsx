import React from "react"
import VideoStream from "../VideoStream"
import styles from "./CallRoom.module.scss"
import { connect } from "react-redux"
import Buttons from "../Buttons/Buttons"

//если ты создал сесию то ты 


const CallRoom = ({ authUsername, childComponent, remoteParticipantTags, localVideoStream }) => {


    return (
        <div className={styles.wrapp}>
            <div
             className={styles.remoteParticipantVideo}
             >
                {remoteParticipantTags}
            </div>

            <div className={styles.videoStream}>
                {localVideoStream ? (
                    <VideoStream
                        isLocalVideoStream={true}
                        localVideoStream={localVideoStream}
                    />
                ) : (
                    ""
                )}

            </div>
            <div className={styles.stickyFooter}>
                {childComponent}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    authUsername: state.auth.authUsername
})

export default connect(mapStateToProps, {})(CallRoom);