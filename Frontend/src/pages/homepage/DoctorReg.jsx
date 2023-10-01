import { styled, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
// import houseCard from "../media/houseCard.png";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../component/CustomButton";
import appointmentImage from "/doctor.jpeg";

const DoctorReg = () => {
  const navigate = useNavigate();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
      gap: theme.spacing(4),
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "30%",
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
    <Box sx={{ my: 1, pb: 2 }}>
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
                my: 3,
              }}
            >
              Are You a Doctor?
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
              my={4}
              sx={{
                fontSize: "18px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
              textAlign="justify"
            >
              You can register as a doctor and provide virtual consultation to
              patients.
            </Typography>

            <CustomButton onClick={() => navigate("/registerDoctor")}>
              Register now
            </CustomButton>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default DoctorReg;
