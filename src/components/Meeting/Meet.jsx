import axios from "axios";
import { useEffect, useState } from "react";
import Join from "./Join";
import Meeting from "./Meeting";
import MeetingEnded from "./MeetingEnded";


import { addConference, getConference, deleteConference } from "../../redux/reducers/meetingReducer";

// Initializing the SDK
const meteredMeeting = new window.Metered.Meeting();

const API_LOCATION = "https://brainwaveapi.onrender.com";

function Meet() {
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





  async function handleCreateMeeting() {

    debugger

    const link = "https://www.google.md"


    const joinResponse = await meteredMeeting.join({
      name: "maimuta",
      roomURL: link,
    });

    console.log('jR : ',joinResponse)
  }



  async function handleJoinMeeting(roomName, username) {

    const { conferenceInfo } = await getConference()

    const { link } = conferenceInfo[0]
    console.log('link : ', link)

    //mycode

    //
    // const joinResponse = await meteredMeeting.join({
    //   name: username,
    //   roomURL: METERED_DOMAIN + "/" + roomName,
    // });
    // setUsername(username);
    // setRoomName(roomName);
    // setMeetingInfo(joinResponse);
    // setMeetingJoined(true);

  }

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

  return (
    <div className="App">
      {meetingJoined ? (
        
        meetingEnded ? (
          <MeetingEnded />
        ) : (
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
          />
        )
      ) : (
        <Join
          handleCreateMeeting={handleCreateMeeting}
          handleJoinMeeting={handleJoinMeeting}
        />
      )}
    </div>
  );
}

export default Meet;