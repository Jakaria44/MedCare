import { Box, styled, Typography, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

// import heroImg from "./hero_illustration.png";
import { useNavigate } from "react-router-dom";
import CustomButtonContained from "../../component/CustomButtonContained";
import heroImg from "/med.png";

const Hero = () => {
  const navigate = useNavigate();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      gap: theme.spacing(0),
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    // color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(3, 0, 3, 0),
    [theme.breakpoints.down("lg")]: {
      fontSize: "48px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box mb={4} sx={{ backgroundColor: "background.paper" }}>
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: small ? "24px" : "18px",

                fontWeight: "500",
                mt: 0,
                mb: 0,
              }}
            >
              Welcome to MedCare
            </Typography>
            <Title variant="h1">
              Emergency Medical Services at your fingertips
            </Title>
            {small && (
              <Box
                sx={{
                  flex: "1.25",
                  margin: "auto",
                }}
              >
                <img src={heroImg} alt="heroImg" style={{ maxWidth: "100%" }} />
              </Box>
            )}
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "18px",
                // color: "#5A6473",
                my: 4,
              }}
              textAlign="justify"
            >
              Instantly Access Emergency Medical Services Online: Your Trusted
              Website for Immediate Assistance During Critical Situations.
            </Typography>

            {/*<CustomButton variant="contained">Get Started</CustomButton>*/}
            {/* <Button
              variant="contained"
              onClick={()=>{
                navigate('/signin')
              }}
              // endIcon={<KeyboardArrowRight fontSize='large' />}

              sx={{
                // color: 'text.light',
                marginY: small? '2vh':'4vh',
                paddingX: { xs: 10,md: 12},
                paddingY: 1.5,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <Typography variant="button"  sx={{fontSize: {md: '19px', sm: '15px' }}}>
                Get Started
              </Typography>
            </Button> */}
            <CustomButtonContained
              text="Get Started"
              onClick={() => {
                navigate("/signin");
              }}
            />
          </Box>
          {!small && (
            <Box
              sx={{
                flex: "1.25",

                margin: "auto",
              }}
            >
              <img
                src={heroImg}
                alt="heroImg"
                style={{ maxWidth: "100%", marginBottom: "2rem" }}
              />
            </Box>
          )}
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
