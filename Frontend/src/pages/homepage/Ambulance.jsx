import { styled, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
// import houseCard from "../media/houseCard.png";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../component/CustomButton";
import AmbulanceImage from "/Ambulance.png";

const Ambulance = () => {
  const navigate = useNavigate();

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(14),
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
      gap: theme.spacing(4),
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
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
    <Box sx={{ my: 2, py: 2 }}>
      <Container>
        <CustomBox>
          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "700",
                my: 3,
              }}
            >
              Locate Nearest Ambulance
            </Typography>
            {small && (
              <ImgContainer>
                <img
                  onClick={() => {
                    navigate("/ambulance");
                  }}
                  src={AmbulanceImage}
                  alt="Ambulance"
                  style={{ maxWidth: "100%" }}
                />
              </ImgContainer>
            )}
            <Typography
              my={small ? 1 : 4}
              sx={{
                fontSize: "18px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
              textAlign="justify"
            >
              Instant Access to Emergency Services - Get Help Fast When You Need
              It Most
            </Typography>

            <CustomButton
              onClick={() => {
                navigate("/ambulance");
              }}
            >
              Find Now
            </CustomButton>
          </Box>
          {!small && (
            <ImgContainer>
              <img
                onClick={() => {
                  navigate("/ambulance");
                }}
                src={AmbulanceImage}
                alt="Ambulance"
                style={{ maxWidth: "100%" }}
              />
            </ImgContainer>
          )}
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Ambulance;
