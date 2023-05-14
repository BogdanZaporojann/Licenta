import React, { useRef, useContext } from "react"
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { SocketContext } from "../Socket/createSocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfoByUsername } from "../../redux/reducers/authReducer";

import VideoStream from "./VideoStream";
import CallRoom from "./CallRoom/CallRoom";
import Buttons from "./Buttons/Buttons";


import VideoTag from "./VideoTag";
import cameraOffLine from "../../assets/svg/cameraOffLine.svg"
import styles from "./Meeting.module.scss"


import {
  addConference, getConference, deleteConference, createConference, getMetteredDomain, verifyMeeting
} from "../../redux/reducers/meetingReducer";




// Initializing the SDK
const meteredMeeting = new window.Metered.Meeting();



const API_LOCATION = "https://brainwaveapi.onrender.com";

const Meet = ({ deleteConference, createConference, addConference, getConference, getMetteredDomain, verifyMeeting,
  lastCreatedRoomName, metteredDomain, authUserName, authUserUserName, roomFound, inviteRoomName, getUserInfoByUsername,
  curentUserPhotoURL }) => {

  const imaga = "https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png"

  const { search } = useLocation()
  const valuesFromParams = (Object.fromEntries(new URLSearchParams(search)))
  const interlocutorPhoto = valuesFromParams['interlocutorPhotoURL']
  const interlocutorName = valuesFromParams['interlocutorName']
  const isCameraStartedByDefauld = valuesFromParams['camera']
  const toUserName = valuesFromParams['toUserName']
  const roomNameInvite = valuesFromParams['roomNameInvite']


  getUserInfoByUsername(toUserName)

  const navigate = useNavigate()


  // Will set it to true when the user joins the meeting
  // and update the UI.
  const [meetingJoined, setMeetingJoined] = useState(false);
  // Storing onlineUsers, updating this when a user joins
  // or leaves the meeting
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [remoteTracks, setRemoteTracks] = useState([]);

  const [username, setUsername] = useState("");


  const [localVideoStream, setLocalVideoStream] = useState(null);

  const [micShared, setMicShared] = useState(false);
  const [cameraShared, setCameraShared] = useState(false);
  const [screenShared, setScreenShared] = useState(false);
  const [meetingEnded, setMeetingEnded] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [meetingInfo, setMeetingInfo] = useState({});



  useEffect(() => {
    setUsername(authUserName)
  }, [])

  useEffect(() => {
    meteredMeeting.on("remoteTrackStarted", (trackItem) => {
      remoteTracks.push(trackItem);
      setRemoteTracks([...remoteTracks]);
    });

    meteredMeeting.on("remoteTrackStopped", (trackItem) => {
      for (let i = 0; i < remoteTracks.length; i++) {
        if (trackItem.streamId === remoteTracks[i].streamId) {
          remoteTracks.splice(i, 1);
        }
      }
      setRemoteTracks([...remoteTracks]);
    });

    meteredMeeting.on("participantJoined", (localTrackItem) => { });

    meteredMeeting.on("participantLeft", (localTrackItem) => { });

    meteredMeeting.on("onlineParticipants", (onlineParticipants) => {
      setOnlineUsers([...onlineParticipants]);
    });

    meteredMeeting.on("localTrackUpdated", (item) => {
      const stream = new MediaStream(item.track);
      setLocalVideoStream(stream);
    });




    return () => {
      meteredMeeting.removeListener("remoteTrackStarted");
      meteredMeeting.removeListener("remoteTrackStopped");
      meteredMeeting.removeListener("participantJoined");
      meteredMeeting.removeListener("participantLeft");
      meteredMeeting.removeListener("onlineParticipants");
      meteredMeeting.removeListener("localTrackUpdated");
    };
  });









  const localMetteredDomainRef = useRef(null);
  const localLastCreatedRoomNameRef = useRef(null);

  useEffect(() => {
    if (lastCreatedRoomName) {
      localLastCreatedRoomNameRef.current = lastCreatedRoomName;
    }
  }, [metteredDomain])

  useEffect(() => {
    if (metteredDomain) {
      localMetteredDomainRef.current = metteredDomain;
    }
  }, [metteredDomain])



  //напиши имя текушего пользователя
  async function handleCreateMeeting(username) {
    await createConference()
    await getMetteredDomain()

    let roomURL = null;
    while (!localMetteredDomainRef.current || !localLastCreatedRoomNameRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const joinResponse = await meteredMeeting.join({
      name: `${username}`,
      roomURL: `${localMetteredDomainRef.current + "/" + localLastCreatedRoomNameRef.current}`
    });

    //рендер проблем
    setUsername(username)
    setRoomName(localLastCreatedRoomNameRef.current);
    setMeetingInfo(joinResponse)
    setMeetingJoined(true);
  }

  const handleJoinMeeting = async (roomName, username) => {
    await getMetteredDomain()
    while (!localMetteredDomainRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const joinResponse = await meteredMeeting.join({
      name: username,
      roomURL: `${localMetteredDomainRef.current + "/" + roomName}`
    });

  }


  const [isJoinedInvite, setIsJoinedInvite] = useState(false)
  if (roomNameInvite) {
    if (!isJoinedInvite) {
      handleJoinMeeting(roomNameInvite, authUserUserName)
      setIsJoinedInvite(true)
    }
  }





  const [createMeet, setCreateMeet] = useState(false)

  //мы создаём конференцию если в URL нету roomNameInvite так как в другом случае мы приглашены в конференцию 
  if (createMeet === false && !roomNameInvite) {

    handleCreateMeeting(authUserUserName)
    setCreateMeet(true)
  }










  const localRoomFound = useRef("")

  useEffect(() => {
    if (roomFound !== "") {
      localRoomFound.current = roomFound
    }
  }, [roomFound])




  async function handleMicBtn() {
    if (micShared) {
      await meteredMeeting.stopAudio();
      setMicShared(false);
    } else {
      await meteredMeeting.startAudio();
      setMicShared(true);
    }
  }

  async function handleCameraBtn() {
    if (cameraShared) {
      await meteredMeeting.stopVideo();
      setLocalVideoStream(null);
      setCameraShared(false);
    } else {

      await meteredMeeting.startVideo();
      var stream = await meteredMeeting.getLocalVideoStream();
      setLocalVideoStream(stream);
      setCameraShared(true);
    }
  }

  async function handelScreenBtn() {
    if (!screenShared) {
      await meteredMeeting.startScreenShare();
      setScreenShared(false);
    } else {
      await meteredMeeting.stopVideo();
      setCameraShared(false);
      setScreenShared(true);
    }
  }

  async function handleLeaveBtn() {
    await meteredMeeting.leaveMeeting();
    setMeetingEnded(true);
  }
  const { participantInfo, _onlineParticipants } = meteredMeeting
  const isMeetAuthorName = (participantInfo?.name === _onlineParticipants[0]?.name && _onlineParticipants[0]?.name !== undefined)

  //попытка перетащить куча коду
  const socket = useContext(SocketContext)


  const [isCamera, setIsCamera] = useState(false)

  const handleIsCamera = () => {
    setIsCamera(!isCamera)
  }





  //если пришло приглашени то идём сразу в комнату звонка
  useEffect(() => {
    if (roomNameInvite) {
      setIsCall(true)
    }
  }, [])


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

  //достаю данные о чуваке которому звоню что бы в комнате ожидания звонка заблюриить на бэкграунг его фотку на полную


  //SOCKET ЗАПРОС ЧЕЛОВЕКУ С КОТОРОМУ ТЫ ЗВОНИШЬ
  //ПЕРЕНАПРАВЛЕНИЕ НА СТРАНИЦУ ОЖИДАНИЯ ЗВОНКА
  const handleOnClickSuna = () => {
    roomName && socket.emit("callInviter", { data: { toUserName, roomName } })
    setTimeout(() => {
 
      socket.on("responseDeclinedCall", ({ isDeclined }) => {   
        
        isDeclined && navigate(`/messages/${toUserName}`)
      })
    }, 6000);
    setIsCall(true)
  }
  return (
    <div className="App">
      <div>
        {!isCall
          ? (
            <div>
              <div style={{
                // backgroundImage: `url(${imaga})`,
                // height:"100vh",
                // width:"100vw",
                // filter: "blur(10px)",
                // backgroundPosition: "center",
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "cover"
              }}></div>
              <div id="meetingView" className="flex flex-col">
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  lastCreatedRoomName: state.meet.lastCreatedRoomName,
  metteredDomain: state.meet.metteredDomain,
  roomFound: state.meet.roomFound,
  authUserName: state.auth.authName,
  inviteRoomName: state.meet.inviteRoomName,
  authUserUserName: state.auth.authUsername,
  curentUserPhotoURL: state.auth.curentUserPhotoURL
})

export default connect(mapStateToProps, {
  deleteConference,
  createConference,
  addConference,
  getConference,
  getMetteredDomain,
  verifyMeeting,
  getUserInfoByUsername
})(Meet);