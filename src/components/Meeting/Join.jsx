import { useEffect, useState } from "react";
import { getConference, deleteConference } from "../../redux/reducers/meetingReducer";
import { connect } from "react-redux";

function Join({
    handleCreateMeeting,
    handleJoinMeeting,

    getConference,
    authUserName }) {

    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");




    return (
        <div id="joinView" className="w-full items-center justify-center flex">
            <div className="bg-base-300 w-11/12 max-w-screen-md  rounded mt-48 p-10">
                <div>
                    <label className="label">
                        <span className="label-text">Name:</span>
                    </label>
                    <input
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        type="text"
                        className="w-full input input-primary input-bordered"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="divider">AND</div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Meeting ID</span>
                    </label>
                    <div className="relative">
                        <input
                            value={roomName}
                            onChange={(e) => {
                                setRoomName(e.target.value);
                            }}
                            id="meetingId"
                            type="text"
                            placeholder="Meeting ID"
                            className="w-full pr-16 input input-primary input-bordered"
                        />
                        <button
                            id="joinExistingMeeting"
                            className="absolute top-0 right-0 rounded-l-none btn btn-primary text-xs"
                        >
                            <span
                                onClick={() => {
                                    handleJoinMeeting("tm8fdhttl6", authUserName);
                                }}
                                className="hidden sm:block"
                            >
                                Join Existing Meeting
                            </span>
                            <span className="sm:hidden">Join</span>
                        </button>
                    </div>
                </div>
                <div className="divider">OR</div>
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            handleCreateMeeting(authUserName);
                        }}
                        id="createANewMeeting"
                        className="btn btn-primary"
                    >
                        Create a new meeting
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            getConference()
                        }}>
                        GET
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            deleteConference('645212257a7328aaab6456a6')
                        }}>
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    authUserName: state.auth.authName
})

export default connect(mapStateToProps, { getConference })(Join);