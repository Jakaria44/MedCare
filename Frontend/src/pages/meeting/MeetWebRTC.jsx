import { useEffect, useRef, useState } from "react";

import { Button, IconButton, Paper, Typography } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate, useParams } from "react-router-dom";

import { Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import React from "react";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2crdXm5tEjgtIhG5mbV8FMI9xK_MJevo",
  authDomain: "medcare-video-calling.firebaseapp.com",
  projectId: "medcare-video-calling",
  storageBucket: "medcare-video-calling.appspot.com",
  messagingSenderId: "455950935583",
  appId: "1:455950935583:web:befb80768de1113392972a",
  measurementId: "G-XVCH8ESYGK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase = initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

// Initialize WebRTC
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function Videos() {
  const navigate = useNavigate();

  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const localRef = useRef();
  const remoteRef = useRef();

  const { appointId } = useParams();
  const roomId = appointId;
  useEffect(() => {
    setupSources();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
        hangUp();
      }
    };
  }, []);

  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: false,
    });
    setLocalStream(localStream);
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    console.log("localStream", localRef.current);
    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);
    let docRef = firestore.collection("calls").doc(`${appointId}`);
    console.log(docRef.get());

    docRef
      .get()
      .then((doc) => {
        console.log(doc.exists);
        if (doc.exists) {
          console.log("Document data:", doc.data());
          joinVideo();
        } else {
          // doc.data() will be undefined in this case
          // setMode("create");
          console.log("No such document!");
          createVideo();
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    async function createVideo() {
      const callDoc = firestore.collection("calls").doc(`/${appointId}`);
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    }

    async function joinVideo() {
      const callDoc = firestore.collection("calls").doc(`/${appointId}`);
      console.log(callDoc);
      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

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
    }

    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    pc.close();

    if (roomId) {
      let roomRef = firestore.collection("calls").doc(`/${appointId}`);
      await roomRef
        .collection("answerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      await roomRef
        .collection("offerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });

      await roomRef.delete();
    }

    navigate(-1);
  };

  // Function to toggle video on/off
  const toggleVideo = () => {
    const senders = pc.getSenders();

    // Find the video sender
    const videoSender = senders.find(
      (sender) => sender.track && sender.track.kind === "video"
    );

    if (videoSender) {
      // Toggle the video track's enabled state
      videoSender.track.enabled = !videoSender.track.enabled;
      setVideoOn(videoSender.track.enabled);
    }
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        if (videoOn) {
          // Disable the video track
          // pc.remo;
          track.enabled = false;
        } else {
          // Enable the video track
          track.enabled = true;
        }
      });
    }
  };

  // Function to toggle mic on/off
  const toggleMic = () => {
    const senders = pc.getSenders();

    // Find the audio sender
    const audioSender = senders.find(
      (sender) => sender.track && sender.track.kind === "audio"
    );

    if (audioSender) {
      // Toggle the audio track's enabled state
      audioSender.track.enabled = !audioSender.track.enabled;
      setMicOn(audioSender.track.enabled);
    }
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !micOn;
      });
      setMicOn((prevState) => !prevState);
    }
  };

  return (
    <>
      <Typography
        variant="body2"
        fontSize={30}
        align="center"
        gutterBottom
        pb={6}
      >
        Doctor Consultation
      </Typography>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <div className="local-video">
                <video
                  style={{ height: "80%", width: "100%" }}
                  ref={localRef}
                  autoPlay
                  playsInline
                  muted
                />

                <div
                  className="controls"
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <IconButton
                    variant="contained"
                    // color={micOn ? "primary" : "secondary"}
                    // startIcon={micOn ? <Mic /> : <MicOff />}
                    onClick={toggleMic}
                  >
                    {micOn ? <Mic /> : <MicOff />}
                  </IconButton>
                  <IconButton
                    variant="contained"
                    // color={videoOn ? "primary" : "secondary"}
                    // startIcon=
                    onClick={toggleVideo}
                  >
                    {videoOn ? <Videocam /> : <VideocamOff />}
                  </IconButton>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <div className="remote-video">
                {/* <video ref={remoteRef} autoPlay playsInline /> */}
                <video
                  style={{ height: "80%", width: "100%" }}
                  ref={remoteRef}
                  autoPlay
                  playsInline
                  muted
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={hangUp}
            variant="contained"
            color="error"
            sx={{ px: 8, my: 2 }}
          >
            End Call
          </Button>
        </div>
      </Container>
    </>
  );
}

export default function MeetWebRTC() {
  return <Videos />;
}
