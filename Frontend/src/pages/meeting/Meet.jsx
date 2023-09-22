import { Button } from "@mui/material";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MeetContext } from "./../../contexts/MeetContext";
const Meet = () => {
  //AS OF NOW DOMAIN WOULD BE JITSI'S AS WE ARE STILL USING THIER SERVERS

  const { meetingId, appointId } = useParams();
  const domain = "meet.jit.si";
  let api = {};

  const navigate = useNavigate();

  // THIS IS TO EXTRACT THE NAME WHICH WAS FILLED IN THE FIRST PAGE
  const [name] = useContext(MeetContext);

  // INTIALISE THE MEET WITH THIS FUNCTION
  const startMeet = useCallback(() => {
    const options = {
      roomName: meetingId,
      width: "100%",
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties if you want
      },
      // VIDEO FRAME WILL BE ADDED HERE
      parentNode: document.querySelector("#jitsi-iframe"),
      userInfo: {
        displayName: name,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListeners({
      readyToClose: handleClose,
      participantLeft: handleParticipantLeft,
      participantJoined: handleParticipantJoined,
      videoConferenceJoined: handleVideoConferenceJoined,
      videoConferenceLeft: handleVideoConferenceLeft,
    });
  }, [api]);

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      startMeet();
    } else {
      alert("JitsiMeetExternalAPI not loaded");
    }
  }, [startMeet]);

  // ALL OUR HANDLERS
  const handleClose = () => {
    console.log("handleClose");
  };

  const handleParticipantLeft = async (participant) => {
    console.log("handleParticipantLeft", participant);
    await getParticipants();
  };

  const handleParticipantJoined = async (participant) => {
    console.log("handleParticipantJoined", participant);
    await getParticipants();
  };

  const handleVideoConferenceJoined = async (participant) => {
    console.log("handleVideoConferenceJoined", participant);
    await getParticipants();
  };

  const handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    navigate(-1);
  };
  const handleLeaveMeeting = () => {
    // Add logic to leave the meeting here
    // For Jitsi, you can use the `dispose` method to leave the meeting gracefully
    if (api) {
      api.dispose();
    }
    // Optionally, you can navigate the user to another page or perform any other actions
    navigate(-1); // Navigating back to the previous page, for example
  };

  // GETTING ALL PARTICIPANTS
  const getParticipants = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(api.getParticipantsInfo());
      }, 500);
    });
  };

  return (
    <React.Fragment>
      <header
        style={{
          backgroundColor: "rgb(10, 25, 41)",
          color: "white",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, padding: 10 }}>Meeting name</p>
      </header>
      <div id="jitsi-iframe" style={{ marginBottom: 0 }}></div>
      <div
        style={{
          backgroundColor: "rgb(10, 25, 41)",
          height: "20vh",
          margin: 0,
        }}
      >
        <Button onClick={handleLeaveMeeting}>Leave Meeting</Button>
      </div>
    </React.Fragment>
  );
};

export default Meet;
