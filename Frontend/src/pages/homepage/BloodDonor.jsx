import {Button, styled, Typography, useMediaQuery} from "@mui/material";
import {Box, Container} from "@mui/system";
import React from "react";
import homeIllustration from "/bloodDonation.png";
import {useNavigate} from "react-router-dom";

const BloodDonor = () => {
  const navigate = useNavigate()
  const CustomContainer = styled(Container)(({theme}) => ({
    backgroundColor: "#aadbeb",
    height: "416px",
    borderRadius: "15px",
    display: "flex",
    // margin: theme.spacing(1 ),
    padding: theme.spacing(2),
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(3, 3, 0, 3),
      width: "90%",
    },
  }));

  const CustomBox = styled(Box)(({theme}) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
      gap: theme.spacing(4),
    },
  }));
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));


  return (
    <Box sx={{my: 2}}>
      <Container>

        <CustomBox>
          <CustomContainer>
            <Box>
              <Typography
                sx={{
                  fontSize: "35px",
                  color: "black",
                  fontWeight: "700",
                  marginBottom: small? "2vh": "8vh",
                  textAlign: "center",
                }}
              >
                Discover Nearby Blood Donors
              </Typography>

              {small &&
                <img
                  src={homeIllustration}
                  alt="illustration"
                  height={270}
                  width={270}
                />

              }


              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/bloodpost");
                }}

                sx={{
                  marginY: small? "3vh": "0vh",
                  color: "black",
                  paddingX: { xs: 10,md: 12},
                  paddingY: 1.5,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <Typography variant="button" sx={{fontSize: {md: '19px', sm: '15px' }}}>Find Now</Typography>
              </Button>
            </Box>

            {/* <ImgContainer> */}
            {!small &&
            <img
              src={homeIllustration}
              alt="illustration"
              height={270}
              width={270}
            />}
            {/* </ImgContainer> */}
          </CustomContainer>
        </CustomBox>

      </Container>
    </Box>
  );
};

export default BloodDonor;
