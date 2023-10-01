import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { firebaseDB } from "../meeting/MeetWebRTC";
import AddAmbulance from "./AddAmbulance";
import AmbulanceDetails from "./AmbulanceDetails";
import BacktoHome from "./BacktoHome";
import LocationButton from "./location-button";

const TrackAmbulance = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [addingNewAmbulance, setAddingNewAmbulance] = useState(false);
  const [editAmbulance, setEditAmbulance] = useState(null);
  const [toAdd, setToAdd] = useState(false);
  const [ambulances, setAmbulances] = useState([]);
  const [center, setCenter] = useState([24.0650882, 89.5461685]);
  const [view, setView] = useState(-1);
  const [details, setDetails] = useState({});

  useEffect(() => {
    // console.log(
    //   typeof details[localStorage.getItem("user_id")] === "undefined"
    // );
    if (typeof details[localStorage.getItem("user_id")] === "undefined") {
      setToAdd(true);
    } else {
      setToAdd(false);
    }
  }, [details]);

  useEffect(() => {
    const ambulanceRef = firebaseDB.ref("ambulances/");
    const detailsRef = firebaseDB.ref("details/");

    const handleDetailsSnapshot = (snapshot) => {
      const data = snapshot.val();

      setDetails(
        Object.keys(data).map((item, index) => {
          return { ...data[item], id: item };
        })
      );
    };

    const handleAmbulanceSnapshot = (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (data) {
        setAmbulances(
          Object.keys(data).map((ambulanceId) => ({
            id: ambulanceId,
            ...data[ambulanceId],
          }))
        );
      }
    };

    detailsRef.on("value", handleDetailsSnapshot);
    ambulanceRef.on("value", handleAmbulanceSnapshot);

    return () => {
      // Clean up the "ambulances" listener when the component unmounts
      detailsRef.off("value", handleDetailsSnapshot);
      ambulanceRef.off("value", handleAmbulanceSnapshot);
    };
  }, []);

  return (
    <>
      <Box
        pb={1}
        display="flex"
        flexDirection={matchesXs ? "column" : "row"} // Change flex direction on small devices
        justifyContent="space-between"
        alignItems={matchesXs ? "center" : "center"} // Align items differently on small devices
      >
        <Box flexGrow={1} />
        <Box>
          <Typography
            variant="h2"
            textAlign="center"
            gutterBottom
            component="div"
          >
            Track Ambulance
          </Typography>
        </Box>
        {/* Place your components to be displayed at the right end here */}

        {toAdd && localStorage.getItem("user_id") ? (
          <Box
            id="sort-by"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              startIcon={<Add />}
              variant="contained"
              color="success"
              onClick={() => setAddingNewAmbulance(true)}
            >
              Add Your Ambulance
            </Button>
          </Box>
        ) : (
          <Box flexGrow={1} />
        )}
      </Box>
      {center ? (
        <MapContainer
          center={center}
          zoom={10}
          // scrollWheelZoom={false}
          style={{ height: "72vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MyMarkers setView={setView} data={ambulances} center={center} />

          <LocationButton center={center} />
          <BacktoHome center={center} />
        </MapContainer>
      ) : (
        <Skeleton variant="square" height="72vh" width="100%" />
      )}

      <AddAmbulance
        open={addingNewAmbulance}
        close={() => {
          setAddingNewAmbulance(false);
        }}
      />

      <Modal
        open={view !== -1}
        onClose={() => setView(-1)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {details[view] ? (
          <AmbulanceDetails data={details[view]} setView={setView} />
        ) : (
          <Box>
            <CircularProgress />
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              component="div"
            >
              Loading...
            </Typography>
          </Box>
        )}
      </Modal>
    </>
  );
};
export default TrackAmbulance;

const MyMarkers = ({ data, setView }) => {
  const map = useMap();
  console.log(data);
  const array = data.map(({ latitude, longitude, id }, index) => (
    <Marker
      key={index}
      position={[latitude, longitude]}
      eventHandlers={{
        click(e) {
          const location = e.target.getLatLng();
          map.flyToBounds([location], 10);
          console.log(map);
        },
      }}
    >
      <Popup>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button
            onClick={() => {
              console.log(id);
              setView(id);
            }}
          >
            Details
          </Button>
        </Box>
      </Popup>
    </Marker>
  ));

  return array;
};
