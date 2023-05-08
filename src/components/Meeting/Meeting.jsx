import VideoTag from "./VideoTag";
import cameraOffLine from "../../assets/svg/cameraOffLine.svg"
import { SocketContext } from "../Socket/createSocketContext";
import { useContext } from "react";
import styles from "./Meeting.module.scss"

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import VideoStream from "./VideoStream";
import CallRoom from "./CallRoom/CallRoom";
import Buttons from "./Buttons/Buttons";

import { connect } from "react-redux";


function Meeting({
  handleMicBtn,
  handleCameraBtn,
  handelScreenBtn,
  handleLeaveBtn,
  localVideoStream,
  onlineUsers,
  remoteTracks,
  roomName,
  meetingInfo
}) {



  const socket = useContext(SocketContext)


  const [isCamera, setIsCamera] = useState(false)

  const handleIsCamera = () => {
    setIsCamera(!isCamera)
  }

  const { search } = useLocation()
  const valuesFromParams = (Object.fromEntries(new URLSearchParams(search)))
  const interlocutorPhoto = valuesFromParams['interlocutorPhotoURL']
  const interlocutorName = valuesFromParams['interlocutorName']
  const isCameraStartedByDefauld = valuesFromParams['camera']
  const toUserName = valuesFromParams['toUserName']
  const roomNameInvite = valuesFromParams['roomNameInvite']



  //если пришло приглашени то идём сразу в комнату звонка
  useEffect(() => {
    if (roomNameInvite) {
      setIsCall(true)
    }
  }, [])



  const [isJoinedInvite, setIsJoinedInvite] = useState(false)
  if (roomNameInvite) {
    if (!isJoinedInvite) {
      setIsJoinedInvite(true)
    }
  }




  //это обработка в зависимотси если выбрал звонок с камерой или без
  useEffect(() => {
    if (isCameraStartedByDefauld === "false") {
      setIsCamera(false)
    } else {
      setIsCamera(true)
    }
  }, [])






  let userStreamMap = {};
  for (let trackItem of remoteTracks) {
    if (!userStreamMap[trackItem.participantSessionId]) {
      userStreamMap[trackItem.participantSessionId] = [];
    }
    userStreamMap[trackItem.participantSessionId].push(trackItem);
  }

  let remoteParticipantTags = [];
  for (let user of onlineUsers) {
    if (user._id === meetingInfo.participantSessionId) {
      continue;
    }
    let videoTags = [];
    if (userStreamMap[user._id] && userStreamMap[user._id].length > 0) {
      for (let trackItem of userStreamMap[user._id]) {
        let stream = new MediaStream();
        stream.addTrack(trackItem.track);

        if (trackItem.type === "video") {
          videoTags.push(<VideoTag srcObject={stream} 
          />);
        }

        if (trackItem.type === "audio") {
          videoTags.push(
            <VideoTag
              key={trackItem.streamId}
              srcObject={stream}
            />
          );
        }
      }
    }

    remoteParticipantTags.push(
      <div key={user._id}>
        <div id="remoteVideos">{videoTags}</div>
        {/* <div id="username">{user.name}</div> */}
      </div>
    );
  }


  //переключение режима с комнаты звонка на звонок
  const [isCall, setIsCall] = useState(false)



  //SOCKET ЗАПРОС ЧЕЛОВЕКУ С КОТОРОМУ ТЫ ЗВОНИШЬ
  //ПЕРЕНАПРАВЛЕНИЕ НА СТРАНИЦУ ОЖИДАНИЯ ЗВОНКА
  const handleOnClickSuna = () => {
    socket.emit("callInviter", { data: { toUserName, roomName } })
    setIsCall(true)
  }




  return (
    <div>
      {!isCall
        ? (<div id="meetingView" className="flex flex-col">
          <div className={styles.wrapp}>
            <div className={styles.mainBlock}>
              <div className={styles.empty}>
                {isCamera ?
                  (<VideoStream localVideoStream={localVideoStream} />)
                  : (<div>
                    <img src={cameraOffLine} alt="cameraOffLine" />
                  </div>)
                }
              </div>
              <Buttons
                handleMicBtn={handleMicBtn}
                handleCameraBtn={handleCameraBtn}
                handelScreenBtn={handelScreenBtn}
                handleLeaveBtn={handleLeaveBtn}
                handleIsCamera={handleIsCamera} />

            </div>

            <div className={styles.secondBlock}>
              <img src={interlocutorPhoto} alt="userPhotoURL" />
              <span>{interlocutorName}</span>
              <span>SUNI ACUM ?</span>
              <span onClick={handleOnClickSuna} className={styles.callButton} >SUNA</span>
            </div>
          </div>
        </div>)
        : (
          <CallRoom
            localVideoStream={localVideoStream}
            interlocutorPhoto={interlocutorPhoto}
            remoteParticipantTags={remoteParticipantTags}
            childComponent={<Buttons
              backgroundColor="inCallProcessScreen"
              handleMicBtn={handleMicBtn}
              handleCameraBtn={handleCameraBtn}
              handelScreenBtn={handelScreenBtn}
              handleLeaveBtn={handleLeaveBtn}
              handleIsCamera={handleIsCamera} />} />
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUserUserName: state.auth.currentUserUserName
})

export default connect(mapStateToProps, {})(Meeting);