import React from "react"
import VideoTag from "./VideoTag"
//ОБЯЗАТЕЛЬНО !!!
//проверить работает ли камера после вынесения в отдельлный компонент noCkeck
const VideoStream = ({ localVideoStream }) => {
    return (
      <span>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {localVideoStream ? (
            <VideoTag
              id="meetingAreaLocalVideo"
              muted={true}
              srcObject={localVideoStream}
              style={{
                padding: 0,
                margin: 0,
                width: "400px",
                height: "400px",
              }}
            />
          ) : (
            ""
          )}
  
        </div>
      </span>)
  }

  export default VideoStream