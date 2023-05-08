import React from "react"
import VideoTag from "./VideoTag"
//ОБЯЗАТЕЛЬНО !!!
//проверить работает ли камера после вынесения в отдельлный компонент noCkeck
const VideoStream = ({ localVideoStream, isLocalVideoStream }) => {
  // console.log('she ne vmerla Ukraina : ', sheNemerlaUkraina)
  return (
    <span>
      <div >
        {localVideoStream ? (
          <VideoTag
            id="meetingAreaLocalVideo"
            muted={true}
            srcObject={localVideoStream}
            isLocalVideoStream={isLocalVideoStream}
          />
        ) : (
          ""
        )}

      </div>
    </span>)
}

export default VideoStream