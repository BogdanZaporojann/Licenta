import styles from "./Buttons.module.scss"
import classNames from "classnames"

import audio from "../../../assets/svg/audio.svg"
import x from "../../../assets/svg/x.svg"
import share from "../../../assets/svg/share.svg"
import cameraVideo from "../../../assets/svg/cameraVideo.svg"

const Buttons = ({
    backgroundColor,

    handleMicBtn,
    handleCameraBtn,
    handelScreenBtn,
    handleLeaveBtn,
    handleIsCamera }) => {
    return (
        <div className={backgroundColor === "inCallProcessScreen" ? classNames(styles.icons, styles.callScreen) : styles.icons}>
            <button
                id="meetingViewMicrophone"
                className="btn"
                onClick={handleMicBtn}
            >
                <img src={audio} alt="audio" />
            </button>

            <button
                id="meetingViewCamera"
                className="btn"
                onClick={handleCameraBtn}
            >
                <img onClick={handleIsCamera} src={cameraVideo} alt="cameraVideo" />
            </button>

            <button
                id="meetingViewScreen"
                className="btn"
                onClick={handelScreenBtn}
            >
                <img src={share} alt="share" />
            </button>

            <button
                id="meetingViewLeave"
                className="btn"
                onClick={handleLeaveBtn}>
                <img src={x} alt="x" />
            </button>
        </div>
    )
}

export default Buttons