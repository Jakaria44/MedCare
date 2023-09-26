import {Button, styled, Typography} from "@mui/material";
import {Box, Container} from "@mui/system";
import React from "react";
import homeIllustration from "/donate3_grayed.png";
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
                  marginBottom: "8vh",
                  textAlign: "center",
                }}
              >
                Fundraise with Heart: Making Dreams a Reality
              </Typography>
              <Typography

                variant={"subtitle2"}
                sx={{display: {md: 'block', xs: 'none'}, fontSize: "24px",  fontWeight: "500", my: 3 , mb :5, px: 2}}
              >
                Fundraise for your passions, connect with supporters, and make a difference. Join us in creating positive change, one donation at a time.
              </Typography>

              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/bloodpost");
                }}
                sx={{
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
            <img
              src={homeIllustration}
              alt="illustration"
              height={300}
              width={300}
            />
            {/* </ImgContainer> */}
          </CustomContainer>
        </CustomBox>

      </Container>
    </Box>
  );
};

export default BloodDonor;
