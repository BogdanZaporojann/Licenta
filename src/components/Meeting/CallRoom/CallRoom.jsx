import React from "react"
import VideoStream from "../VideoStream"
import styles from "./CallRoom.module.scss"

import Buttons from "../Buttons/Buttons"

const CallRoom = ({ childComponent, interlocutorPhoto, localVideoStream }) => {
    return (
        <div className={styles.wrapp}>
            <div className={styles.imageSection}>
                <img src={interlocutorPhoto} alt="userPhotoURL" />
            </div>
            <div className={styles.videoStream}>
                <VideoStream localVideoStream={localVideoStream} />
            </div>
            <div className={styles.iconsSection}>
                {childComponent}
            </div>

        </div>
    )
}

export default CallRoom