import React from "react"
import VideoStream from "../VideoStream"
import styles from "./CallRoom.module.scss"

import Buttons from "../Buttons/Buttons"

const CallRoom = ({ childComponent, remoteParticipantTags, localVideoStream }) => {

    return (
        <div>
            <div>MeetingID: roomName</div>
            <div
                style={{ display: "flex" }}
            >
                {remoteParticipantTags}
            </div>

            <div style={{ width: "150px" }}>
                {localVideoStream ? (
                    <VideoStream
                        localVideoStream={localVideoStream}
                        style={{
                            padding: 0,
                            margin: 0,
                            width: "150px",
                            height: "100px",
                        }}
                    />
                ) : (
                    ""
                )}

                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    username
                </div>
            </div>
            <div>
                {childComponent}
            </div>
        </div>
        // <div className={styles.wrapp}>
        //     <div className={styles.imageSection}>
        //         <img src={interlocutorPhoto} alt="userPhotoURL" />
        //     </div>
        //     <div className={styles.videoStream}>
        //         <VideoStream localVideoStream={localVideoStream} />
        //     </div>
        //     <div className={styles.iconsSection}>
        //         {childComponent}
        //     </div>

        // </div>
    )
}

export default CallRoom