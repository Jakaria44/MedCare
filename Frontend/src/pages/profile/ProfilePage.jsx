import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import server from "../../HTTP/httpCommonParam";
import HorizontalScrollingContent from "../../component/HorizontalScrollingContent";
import AmbulanceCard from "../ambulance/AmbulanceCard";
import FundRaiseCard from "../fundRaisePost/FundRaiseCard";
import BasicInfo from "./BasicInfo";
import { user } from "./dummyUser";
const ProfilePage = () => {
  const { id } = useParams();
  console.log(id);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [myFundPost, setMyFundPost] = useState([]);
  const [pendingFundPost, setPendingFundPost] = useState([]); // [pendingFundPost, setPendingFundPost
  const [myAmbulancePost, setMyAmbulancePost] = useState([]);

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
  const loadMyAmbulancePost = async () => {
    try {
      const res = await server.get(
        `/ambulance/getallpostbyuserbySortAndPage/${id}`,
        {
          params: {
            pageSize: 100,
          },
        }
      );
      setMyAmbulancePost(res.data.content);
    } catch (err) {
      console.log(err);
      setMyAmbulancePost([]);
    }
  };

  useEffect(() => {
    loadMyFundRaisePosts();
    loadMyAmbulancePost();
  }, []);

  return (
    <>
      <Typography
        variant="body1"
        fontSize={50}
        fontFamily="cursive"
        align="center"
        gutterBottom
        pb={6}
      >
        My Profile
      </Typography>
      <BasicInfo user={user} />
      <Box
        m={2}
        sx={{
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.01)",
            transition: "all 0.3s ease-in-out",
          },
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
      {myAmbulancePost?.length != 0 && (
        <HorizontalScrollingContent
          title="Ambulance Posts"
          allItemLink="/"
          items={myAmbulancePost}
          load={loadMyAmbulancePost}
          card={(item, load) => <AmbulanceCard load={load} item={item} />}
        />
      )}
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
