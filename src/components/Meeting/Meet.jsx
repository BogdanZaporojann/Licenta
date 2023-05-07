import React, { useRef, useContext } from "react"
import axios from "axios";
import { useEffect, useState } from "react";
import Join from "./Join";
import Meeting from "./Meeting";
import MeetingEnded from "./MeetingEnded";
import { connect } from "react-redux";
import { SocketContext } from "../Socket/createSocketContext";
import { useLocation } from "react-router-dom";

import {
  addConference, getConference, deleteConference, createConference, getMetteredDomain, verifyMeeting
} from "../../redux/reducers/meetingReducer";




// Initializing the SDK

const meteredMeeting = new window.Metered.Meeting();




const API_LOCATION = "https://brainwaveapi.onrender.com";

const Meet = ({ deleteConference, createConference, addConference, getConference, getMetteredDomain, verifyMeeting,
  lastCreatedRoomName, metteredDomain, authUserName, authUserUserName, roomFound, inviteRoomName }) => {


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


  // useEffect(() => {
  //   console.log("meteredMeeting : ", meteredMeeting)
  //   debugger
  // }, [meteredMeeting])

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
      // console.log('online ', onlineParticipants)
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

    // console.log('primar joinResponse : ', joinResponse)
    // console.log("meteredMeeting : ", meteredMeeting)


    //рендер проблем
    setUsername(username)
    setRoomName(localLastCreatedRoomNameRef.current);
    setMeetingInfo(joinResponse)
    setMeetingJoined(true);
  }


  const { search } = useLocation()
  const valuesFromParams = (Object.fromEntries(new URLSearchParams(search)))

  const roomNameInvite = valuesFromParams['roomNameInvite']

  // console.log("search : ", search)
  // console.log("roomNameInvite start : ", roomNameInvite)






  const handleJoinMeeting = async (roomName, username) => {
    await getMetteredDomain()
    while (!localMetteredDomainRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const joinResponse = await meteredMeeting.join({
      name: username,
      roomURL: `${localMetteredDomainRef.current + "/" + roomName}`
    });
    // console.log('second jooinResponse : ', joinResponse)
    // console.log('second meteredMeeting : ', meteredMeeting)

    // setMeetingJoined(true)
    // const joinResponse = await meteredMeeting.join({
    //   name: username,
    //   roomURL: METERED_DOMAIN + "/" + roomName,
    // });
    // setUsername(username);
    // setRoomName(roomName);

    // setMeetingInfo(joinResponse);
    // setMeetingJoined(true);
  }


  const [isJoinedInvite, setIsJoinedInvite] = useState(false)
  if (roomNameInvite) {
    // console.log('roomNi : ', roomNameInvite)
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
    console.log("meteredMeeting : ", meteredMeeting)
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


  return (
    <div className="App">
      {/* {meetingJoined ? (

        meetingEnded ? ( 
          <MeetingEnded />
        ) : ( */}
      <Meeting
        handleMicBtn={handleMicBtn}
        handleCameraBtn={handleCameraBtn}
        handelScreenBtn={handelScreenBtn}
        handleLeaveBtn={handleLeaveBtn}
        localVideoStream={localVideoStream}
        onlineUsers={onlineUsers}
        remoteTracks={remoteTracks}
        username={username}
        roomName={roomName}
        meetingInfo={meetingInfo}
        meteredMeeting={meteredMeeting}
      />
      {/* )
      ) : (
        <Join
          handleCreateMeeting={handleCreateMeeting}
          handleJoinMeeting={handleJoinMeeting}
        />
      )} */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  lastCreatedRoomName: state.meet.lastCreatedRoomName,
  metteredDomain: state.meet.metteredDomain,
  roomFound: state.meet.roomFound,
  authUserName: state.auth.authName,
  inviteRoomName: state.meet.inviteRoomName,
  authUserUserName: state.auth.authUsername
})

export default connect(mapStateToProps, {
  deleteConference,
  createConference,
  addConference,
  getConference,
  getMetteredDomain,
  verifyMeeting
})(Meet);