import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function MeetWebRTC() {
  const pc = new RTCPeerConnection(servers);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const { appointId } = useParams();

  const [webcamVideo, setWebcamVideo] = useState(null);
  const [remoteVideo, setRemoteVideo] = useState(null);

  const [callInputValue, setCallInputValue] = useState("");
  const [hangupButtonDisabled, setHangupButtonDisabled] = useState(true);
  const [webcamButtonDisabled, setWebcamButtonDisabled] = useState(false);
  const [callButtonDisabled, setCallButtonDisabled] = useState(true);
  const [answerButtonDisabled, setAnswerButtonDisabled] = useState(true);
  const setupMediaSources = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    setLocalStream(stream);
    setRemoteStream(remoteStream);

    setWebcamVideo(stream);
    setRemoteVideo(remoteStream);

    setCallButtonDisabled(false);
    setAnswerButtonDisabled(false);
    setWebcamButtonDisabled(true);
  };

  const createOffer = async () => {
    // const callDoc = firestore.collection("calls").doc();
    const callDoc = getDocs(collection(db, "calls"));
    console.log(callDoc);

    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    // setCallInputValue(callDoc.id);

    setCallInputValue(appointId);

    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
      // add Doc
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });
    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });
    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    setHangupButtonDisabled(false);
  };

  const answerCall = async () => {
    const callId = callInputValue;
    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  return (
    <div className="App">
      <h2>1. Start your Webcam</h2>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <video
            id="webcamVideo"
            autoPlay
            playsInline
            ref={webcamVideo}
          ></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video
            id="remoteVideo"
            autoPlay
            playsInline
            ref={remoteVideo}
          ></video>
        </span>
      </div>

      <button
        id="webcamButton"
        onClick={setupMediaSources}
        disabled={webcamButtonDisabled}
      >
        Start webcam
      </button>
      <h2>2. Create a new Call</h2>
      <button
        id="callButton"
        onClick={createOffer}
        disabled={callButtonDisabled}
      >
        Create Call (offer)
      </button>

      <h2>3. Join a Call</h2>
      <p>Answer the call from a different browser window or device</p>

      <input
        id="callInput"
        value={callInputValue}
        onChange={(e) => setCallInputValue(e.target.value)}
      />
      <button
        id="answerButton"
        onClick={answerCall}
        disabled={answerButtonDisabled}
      >
        Answer
      </button>

      <h2>4. Hangup</h2>

      <button id="hangupButton" disabled={hangupButtonDisabled}>
        Hangup
      </button>
    </div>
  );
}
