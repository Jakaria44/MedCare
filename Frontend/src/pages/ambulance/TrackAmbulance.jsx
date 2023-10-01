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
  const [center, setCenter] = useState();
  const [view, setView] = useState(-1);
  const [details, setDetails] = useState({});
  useEffect(() => {
    const ambulanceRef = firebaseDB.ref("ambulances");
    const detailsRef = firebaseDB.ref("details/");

    const handleDetailsSnapshot = (snapshot) => {
      const data = snapshot.val();
      setDetails(data);
      console.log(data);
    };

    const handleAmbulanceSnapshot = (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      if (data) {
        setAmbulances(
          Object.keys(data).map((ambulanceId) => ({
            id: ambulanceId,
            ...data[ambulanceId],
            available: data[ambulanceId]?.available || false,
          }))
        );
      }
    };

    const handleGeolocationSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      // get user's location
      setCenter([latitude, longitude]);
      console.log(latitude, longitude);
    };

    const handleGeolocationError = (error) => {
      console.error("Error getting geolocation:", error);
    };

    detailsRef.on("value", handleDetailsSnapshot);
    ambulanceRef.on("value", handleAmbulanceSnapshot);

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );

      // Don't forget to clear the watch when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
        detailsRef.off("value", handleDetailsSnapshot); // Clean up the "details" listener
      };
    } else {
      console.log("Geolocation is not available in this browser.");
    }

    return () => {
      // Clean up the "ambulances" listener when the component unmounts
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
          {toAdd && (
            <Box flexGrow={1}>
              <Button
                startIcon={<Add />}
                variant="contained"
                color="success"
                onClick={() => setAddingNewAmbulance(true)}
              >
                Add Your Ambulance
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {center ? (
        <MapContainer
          center={center}
          zoom={12}
          // scrollWheelZoom={false}
          style={{ height: "72vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MyMarkers
            setView={setView}
            data={ambulances?.filter((item) => item.available)}
            center={center}
          />

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
          <Button onClick={() => setView(id)}>Details</Button>
        </Box>
      </Popup>
    </Marker>
  ));

  return array;
};