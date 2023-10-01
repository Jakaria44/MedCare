import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import server from "../../HTTP/httpCommonParam";
import ErrorModal from "../../component/ErrorModal";
import HorizontalScrollingContent from "../../component/HorizontalScrollingContent";
import SpinnerWithBackdrop from "../../component/SpinnerWithBackdrop";
import SuccessfulModal from "../../component/SuccessfulModal";
import AddAmbulance from "../ambulance/AddAmbulance";
import AmbulanceDetails from "../ambulance/AmbulanceDetails";
import AddNewBloodPost from "../blood/AddNewBloodPost";
import FundRaiseCard from "../fundRaisePost/FundRaiseCard";
import { firebaseDB } from "../meeting/MeetWebRTC";
import BasicInfo from "./BasicInfo";
// import { user } from "./dummyUser";
const ProfilePage = () => {
  const confirm = useConfirm();
  const [editingBloodPost, setEditingBloodPost] = useState(false); // [editingBloodPost, setEditingBloodPost
  const [successMessage, setSuccessMessage] = useState("success");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An Error Occured");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const userId = localStorage.getItem("user_id") ?? null;
  const navigate = useNavigate();
  const [myFundPost, setMyFundPost] = useState([]);
  const [user, setUser] = useState(null);
  const [pendingFundPost, setPendingFundPost] = useState([]); // [pendingFundPost, setPendingFundPost
  const [myAmbulancePost, setMyAmbulancePost] = useState({});
  const [edit, setEdit] = useState(false);
  const loadMyFundRaisePosts = async () => {
    try {
      const res = await server.get(
        `/getallPostByuserWithSortAndPage/${id}/true`,
        {
          params: {
            pageSize: 100,
          },
        }
      );
      setMyFundPost(res.data.content);
    } catch (err) {
      console.log(err);
      setMyFundPost([]);
    }
  };
  const loadPendingFundRaisePosts = async () => {
    try {
      const response = await server.get(
        `/getallPostByuserWithSortAndPage/${id}/false`,
        {
          params: {
            pageSize: 100,
          },
        }
      );
      setPendingFundPost(res.data.content);
    } catch (err) {
      console.log(err);
      setPendingFundPost([]);
    }
  };

  const handleAmbulanceUpdate = (snapshot) => {
    const ambulanceData = snapshot.val();
    console.log(ambulanceData);
    if (!ambulanceData) setMyAmbulancePost(null);
    else
      setMyAmbulancePost((prev) => ({ ...prev, ...ambulanceData, id: userId }));
  };

  const loadUser = async () => {
    try {
      const res = await server.get(`/getuserbyid/${id}`);
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(myAmbulancePost);
  }, [myAmbulancePost]);

  // delete ambulance
  const handleDelete = async () => {
    try {
      await confirm({
        title: "Delete Blood Post",
        description: "Are you sure you want to delete this Blood Post?",
        confirmationText: "Delete",
        cancellationText: "Cancel",
        confirmationButtonProps: { variant: "outlined", color: "error" },
        cancellationButtonProps: { variant: "contained", color: "error" },
      });
      const ambulanceRef = firebaseDB.ref(`ambulances/${userId}`);
      const detailsRef = firebaseDB.ref(`details/${userId}`);
      // Use the remove method to delete the reference
      setLoading(true);
      try {
        await ambulanceRef.remove();
        await detailsRef.remove();

        setSuccessMessage("Successfully Deleted");
        setShowSuccessMessage(true);
        ambulanceRef.on("value", handleAmbulanceUpdate);
        detailsRef.on("value", handleAmbulanceUpdate);
      } catch (err) {
        console.log(err);
        setErrorMessage("something went wrong");
        setShowErrorMessage(true);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteBloodPost = async () => {
    try {
      await confirm({
        title: "Delete Blood Post",
        description: "Are you sure you want to delete this Blood Post?",
        confirmationText: "Delete",
        cancellationText: "Cancel",
        confirmationButtonProps: { variant: "outlined", color: "error" },
        cancellationButtonProps: { variant: "contained", color: "error" },
      });
      try {
        // handleClose();
        setLoading(true);
        console.log(user.bloodDonatePostList[0].id);
        const res = await server.delete(
          `/protect/blooddonatepost/delete/${user.bloodDonatePostList[0].id}`
        );
        localStorage.setItem("blood_group", "");
        setSuccessMessage("Successfully Deleted");
        setShowSuccessMessage(true);
        loadUser();
      } catch (err) {
        setErrorMessage("something went wrong");
        setShowErrorMessage(true);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUser();
    loadMyFundRaisePosts();

    if (!userId) return;
    const ambulanceRef = firebaseDB.ref(`ambulances/${userId}`);
    ambulanceRef.on("value", handleAmbulanceUpdate);
    const detailsRef = firebaseDB.ref(`details/${userId}`);
    detailsRef.on("value", handleAmbulanceUpdate);

    return () => {
      ambulanceRef.off("value", handleAmbulanceUpdate);
      detailsRef.off("value", handleAmbulanceUpdate);
    };
  }, []);
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <>
      <Typography
        variant="body1"
        fontSize={50}
        fontFamily="cursive"
        align="center"
        gutterBottom
        mt={1}
        pb={3}
      >
        My Profile
      </Typography>
      <BasicInfo user={user} />
      {user?.bloodDonatePostList.length > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // sx={{ flexDirection: { md: "column", xs: "row" } }}
          pb={4}
          mt={3}
        >
          <Stack spacing={2} direction={small ? "column" : "row"}>
            <Button
              startIcon={<Edit />}
              variant="contained"
              onClick={() => setEditingBloodPost(true)}
            >
              Edit Blood Donate Info
            </Button>
            <Button
              startIcon={<Delete />}
              variant="contained"
              color="error"
              onClick={deleteBloodPost}
            >
              Delete Blood Donate Info
            </Button>
          </Stack>
        </Box>
      )}
      <Box
        m={2}
        sx={{
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.01)",
            transition: "all 0.3s ease-in-out",
          },
          padding: "0 !important",
        }}
        onClick={() => {
          navigate("/appointments");
        }}
      >
        {id == userId && (
          <GradientBackground>
            <Typography
              variant="body1"
              fontSize={40}
              fontFamily="cursive"
              zIndex={1}
              color="#fff"
            >
              My Appointments
            </Typography>
          </GradientBackground>
        )}
      </Box>
      {myFundPost?.length != 0 && (
        <HorizontalScrollingContent
          title="Fundraise Posts"
          allItemLink="/"
          items={myFundPost}
          load={loadMyFundRaisePosts}
          card={(item, load) => <FundRaiseCard load={load} item={item} />}
        />
      )}
      {id == userId && myFundPost?.length != 0 && (
        <HorizontalScrollingContent
          title="Fundraise Posts Pending"
          allItemLink="/"
          items={pendingFundPost}
          load={loadPendingFundRaisePosts}
          card={(item, load) => <FundRaiseCard load={load} item={item} />}
        />
      )}
      {myAmbulancePost !== null && (
        <Box m={2} sx={{ padding: "0 !important" }}>
          <AmbulanceDetails
            data={myAmbulancePost}
            profile={true}
            setEdit={setEdit}
            handleDelete={handleDelete}
          />
        </Box>
      )}

      <AddAmbulance
        editing={true}
        ambulanceProp={myAmbulancePost}
        open={edit}
        close={() => setEdit(false)}
      />
      <AddNewBloodPost
        bloodPostProp={user?.bloodDonatePostList[0]}
        editing={true}
        open={editingBloodPost}
        close={() => {
          setEditingBloodPost(false);
        }}
        load={loadUser}
      />

      <SuccessfulModal
        showSuccessMessage={showSuccessMessage}
        successMessage={successMessage}
        HandleModalClosed={() => {
          setShowSuccessMessage(false);
        }}
      />
      <ErrorModal
        showErrorMessage={showErrorMessage}
        errorMessage={errorMessage}
        HandleModalClosed={() => {
          setShowErrorMessage(false);
        }}
      />

      <SpinnerWithBackdrop backdropOpen={loading} helperText={"Please Wait"} />
    </>
  );
};

export default ProfilePage;

const GradientBackground = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "500px", // Adjust the height as needed
  backgroundImage: 'url("/Appointment.jpg")', // Replace with your image path
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle, rgba(0,0,0,0.7) 100%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)", // Circular gradient backdrop
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
