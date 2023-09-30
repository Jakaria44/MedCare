// Map.js
// import "leaflet/dist/images/marker-shadow.png";
import React, { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import firebase from "./../firebaseConfig";
import { Typography } from "@mui/material";
import { firebaseDB } from "../pages/meeting/MeetWebRTC";

const Map = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [center, setCenter] = useState();
  const [location, setLocation] = useState([]);

  function updateLocation(latitude, longitude) {
    const ambulanceRef = firebaseDB.ref(`ambulances/ambulance3`);
    console.log(new Date().toLocaleString(), latitude, longitude);
    // alert();
    setLocation([
      ...location,
      `${new Date().toLocaleString()}  ${latitude}  ${longitude}`,
    ]);

    ambulanceRef.set({
      latitude,
      longitude,
      // timestamp: firebaseDB.ServerValue.TIMESTAMP, // Optionally, you can record a timestamp
    });
  }
  useEffect(() => {
    const ambulanceRef = firebaseDB.ref("ambulances");

    ambulanceRef.on("value", (snapshot) => {
      // Handle location updates here
      const data = snapshot.val();
      // console.log(data);
      if (data) {
        setAmbulances(
          Object.keys(data).map((ambulanceId) => data[ambulanceId])
        );
        // setAmbulances(data);
      }
    });
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(function (position) {
        const { latitude, longitude } = position.coords;
        // Update Firebase with the new location data
        updateLocation(latitude, longitude);
        setCenter([latitude, longitude]);
      });

      // Don't forget to clear the watch when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log("Geolocation is not available in this browser.");
    }
    return () => {
      // Clean up the listener when the component unmounts
      ambulanceRef.off("value");
    };
  }, []);

  // const position = [51.505, -0.09];

  return center ? (
    <>
      {location?.map((item) => (
        <Typography>{item}</Typography>
      ))}

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "72vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ambulances?.map((item, index) => (
          <Marker key={index} position={[item.latitude, item.longitude]}>
            <Popup>{`Ambulance ${index + 1}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  ) : (
    <></>
  );
};

export default Map;

// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// const tileLayer = {
//   attribution:
//     '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//   url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
// };
// const center = [52.22977, 21.01178];

// const points = [
//   {
//     lat: 52.230020586193795,
//     lng: 21.01083755493164,
//     title: "point 1",
//   },
//   {
//     lat: 52.22924516170657,
//     lng: 21.011320352554325,
//     title: "point 2",
//   },
//   {
//     lat: 52.229511304688444,
//     lng: 21.01270973682404,
//     title: "point 3",
//   },
//   {
//     lat: 52.23040500771883,
//     lng: 21.012146472930908,
//     title: "point 4",
//   },
// ];

// const MyMarkers = ({ data }) => {
//   return data.map(({ lat, lng, title }, index) => (
//     <Marker key={index} position={{ lat, lng }}>
//       <Popup>{title}</Popup>
//     </Marker>
//   ));
// };

// const MapWrapper = () => {
//   return (
//     <MapContainer center={center} zoom={18} scrollWheelZoom={false}>
//       <TileLayer {...tileLayer} />

//       <MyMarkers data={points} />
//     </MapContainer>
//   );
// };

// export default MapWrapper;

// import { Box } from "@mui/system";
// import { MapContainer, TileLayer } from "react-leaflet";

// const tileLayer = {
//   attribution:
//     '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//   url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
// };

// const center = [52.22977, 21.01178];

// const MapWrapper = () => {
//   return (
//     <Box
//       sx={{
//         margin: "30px auto",
//         height: "500px",
//         width: "100%",
//         zIndex: 0,
//         border: "2px solid #333",
//         overflow: "hidden",
//       }}
//     >
//       <MapContainer
//         style={{ height: "72vh", width: "100%" }}
//         center={center}
//         zoom={18}
//         scrollWheelZoom={false}
//       >
//         <TileLayer {...tileLayer} />
//       </MapContainer>
//     </Box>
//   );
// };

// export default MapWrapper;
