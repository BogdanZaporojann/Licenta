import VideoTag from "./VideoTag";

import audio from "../../assets/svg/audio.svg"
import x from "../../assets/svg/x.svg"
import share from "../../assets/svg/share.svg"
import cameraVideo from "../../assets/svg/cameraVideo.svg"
import cameraOffLine from "../../assets/svg/cameraOffLine.svg"
import { SocketContext } from "../Socket/createSocketContext";
import { useContext } from "react";
import styles from "./Meeting.module.scss"

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

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
  username,
  roomName,
  meetingInfo,

  
  meteredMeeting,
  currentUserUserName
}) {

  useEffect(()=>{
    console.log('ONLINE USERS : ',onlineUsers)
  },[onlineUsers])

  const socket = useContext(SocketContext)


  const [isCamera, setIsCamera] = useState(false)

  //В зависимости от того видео или аудио звонок соверщён устанавливаем камеру или нет


  const handleIsCamera = () => {
    setIsCamera(!isCamera)
  }

  const { search } = useLocation()
  const valuesFromParams = (Object.fromEntries(new URLSearchParams(search)))
  const interlocutorPhoto = valuesFromParams['interlocutorPhotoURL']
  const interlocutorName = valuesFromParams['interlocutorName']
  const isCameraStartedByDefauld = valuesFromParams['camera']
  const toUserName = valuesFromParams['toUserName']





  //это обработка в зависимотси если выбрал звонок с камерой или без
  useEffect(() => {
    if (isCameraStartedByDefauld === "false") {
      setIsCamera(false)
    } else {
      setIsCamera(true)
    }
  }, [])



  const navigate = useNavigate()

  const onClickButton = () => {
    navigate("/call")
  }


  let userStreamMap = {};
  for (let trackItem of remoteTracks) {
    if (!userStreamMap[trackItem.participantSessionId]) {
      userStreamMap[trackItem.participantSessionId] = [];
    }
    userStreamMap[trackItem.participantSessionId].push(trackItem);
  }

  let remoteParticipantTags = [];
  for (let user of onlineUsers) {
    // Skip if self
    if (user._id === meetingInfo.participantSessionId) {
      continue;
    }
    let videoTags = [];
    if (userStreamMap[user._id] && userStreamMap[user._id].length > 0) {
      // User has remote tracks
      for (let trackItem of userStreamMap[user._id]) {
        let stream = new MediaStream();
        stream.addTrack(trackItem.track);

        if (trackItem.type === "video") {
          videoTags.push(<VideoTag srcObject={stream} />);
        }

        if (trackItem.type === "audio") {
          videoTags.push(
            <VideoTag
              key={trackItem.streamId}
              srcObject={stream}
              style={{ display: "none" }}
            />
          );
        }
      }
    }

    remoteParticipantTags.push(
      <div key={user._id}>
        <div id="remoteVideos">{videoTags}</div>
        <div id="username">{user.name}</div>
      </div>
    );
  }


  //переключение режима с комнаты звонка на звонок
  const [isCall, setIsCall] = useState(false)


  //ОБРАБОТЧИК ЗВОНКА

  //TO DO:
  //SOCKET ЗАПРОС ЧЕЛОВЕКУ С КОТОРОМУ ТЫ ЗВОНИШЬ
  //ПЕРЕНАПРАВЛЕНИЕ НА СТРАНИЦУ ОЖИДАНИЯ ЗВОНКА
  const handleOnClickSuna = () => {

    // console.log("toUserName : ", toUserName)
    // console.log("roomName : ", roomName)
    console.log("metered nahui meeting : ",meteredMeeting)
    socket.emit("callInviter", { data: { toUserName, roomName, meteredMeeting } })
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
            childComponent={<Buttons
              backgroundColor="callScreen"
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