import React from "react"
import VideoStream from "../VideoStream"
import styles from "./CallRoom.module.scss"
import { connect } from "react-redux"
import Buttons from "../Buttons/Buttons"

//если ты создал сесию то ты ... 


const CallRoom = ({ authUsername, childComponent, remoteParticipantTags, localVideoStream }) => {
    const imaga = "https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png"


    return (
        <div>
            <div style={{
                backgroundImage: `url(${imaga})`,
                height: "100vh",
                width: "100vw",
                filter: "blur(10px)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}></div>
            <div className={styles.wrapp}>
                <div>auth name : {authUsername}</div>
                <div className={styles.remoteParticipantVideo}>
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    authUsername: state.auth.authUsername
})

export default connect(mapStateToProps, {})(CallRoom);