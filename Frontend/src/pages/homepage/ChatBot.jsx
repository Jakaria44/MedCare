import { styled, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
// import houseCard from "../media/houseCard.png";
import { useNavigate } from "react-router-dom";
import CustomButtonContained from "../../component/CustomButtonContained";
import FeaturesChatBot from "./FeaturesChatBot";
import FirstCover from "/twohandwithlight.jpg";

const ChatBot = () => {
  const navigate = useNavigate();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
      gap: theme.spacing(4),
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    flex: 1.3,
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const Divider = styled("div")(({ theme }) => ({
    width: "13%",
    height: "5px",
    backgroundColor: theme.palette.mode == "light" ? "#000339" : "#fff",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ my: 1, pb: 2 }}>
      <Container>
        <CustomBox>
          {!small && (
            <ImgContainer>
              <img src={FirstCover} alt="house" style={{ maxWidth: "100%" }} />
            </ImgContainer>
          )}

          <Box flex={1}>
            <Divider />
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "700",
                my: 3,
              }}
            >
              AI-Powered Chatbot for Emergency Disease Detection
            </Typography>
            {/* <Typography
              my={4}
              variant="body1"
              sx={{
                fontSize: "25px",
                lineHeight: "27px",
              }}
              textAlign="center"
            >
              Check Your Symptoms Now
            </Typography> */}
            {small && (
              <ImgContainer>
                <img
                  src={FirstCover}
                  alt="house"
                  style={{ maxWidth: "100%" }}
                />
              </ImgContainer>
            )}
            <Typography
              my={4}
              sx={{
                fontSize: "18px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
              textAlign="justify"
            >
              Worried about symptoms? Get instant guidance and peace of mind
              with our emergency disease detection feature. In times of
              uncertainty, find answers quickly, 24/7.
            </Typography>
          </Box>
        </CustomBox>
        <FeaturesChatBot />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          m={0}
          p={0}
        >
          <CustomButtonContained
            onClick={() => navigate("/doctorList")}
            text={"Try Now"}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default ChatBot;
