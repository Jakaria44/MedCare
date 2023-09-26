import { Button, styled, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
// import houseCard from "../media/houseCard.png";
import CustomButton from "../../component/CustomButton";
import appointmentImage from "/donate3.png";
import { useNavigate } from "react-router-dom";

const FundRaise = () => {
  const navigate = useNavigate();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(15),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      textAlign: "center",
      gap: theme.spacing(4),
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "50%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      width: "100%",
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
    <Box sx={{ my: 1 }}>
      <Container>
        <CustomBox>
          {!small && (
            <ImgContainer>
              <img
                src={appointmentImage}
                alt="house"
                style={{ maxWidth: "100%" }}
              />
            </ImgContainer>
          )}
          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "700",
                my: { md: 3, xs: 1 },
              }}
            >
              Fundraise with Heart
            </Typography>
            {small && (
              <ImgContainer>
                <img
                  src={appointmentImage}
                  alt="house"
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
            >
              Fundraise for your passions, connect with supporters, and make a
              difference. Join us in creating positive change, one donation at a
              time.
            </Typography>

            <CustomButton
              onClick={() => {
                navigate("/fundpost");
              }}
            >
              Find Now
            </CustomButton>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default FundRaise;
