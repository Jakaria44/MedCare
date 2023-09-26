import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
const quickSymptom = "/humanbody.jpg";
const peaceOfMind = "/contentful.jpg";
const anonymous = "/anonymous.jpg";
const mobile = "mobile.png";
const FeaturesChatBot = () => {
  const features = [
    {
      title: "Quick symptom assessment",
      text: "Instantly assess your symptoms to understand their severity and potential causes.",
      media: quickSymptom,
    },
    {
      media: peaceOfMind,
      title: "Peace of mind in emergencies",
      text: "Gain confidence in your health decisions, especially in critical situations.",
    },
    {
      media: anonymous,
      title: "Anonymous and private",
      text: "Your data and interactions with the chatbot are kept confidential, respecting your privacy.",
    },
    {
      media: mobile,
      title: "Seamless integration",
      text: "Easily incorporate our chatbot into your daily life, whether on the web or mobile.",
    },
  ];
  return (
    <Grid container spacing={2} my={2}>
      {features.map((item, i) => (
        <Grid item key={i} xs={12} md={6}>
          <FeatureCard
            seq={i % 2}
            media={item.media}
            title={item.title}
            text={item.text}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturesChatBot;

const FeatureCard = ({ seq, media, title, text }) => {
  const small = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Card
      elevation={0}
      sx={{
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: small ? "row" : "row",
        borderRadius: 0,
        border: 0,
        backgroundColor: "background.paper",
      }}
    >
      {/* // <Card sx={{ display: "flex", flexDirection: small ? "row" : "row" }}> */}
      {seq === 0 && (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image={media}
            alt="Quick Symptom"
            sx={{ height: "100%", width: "100%" }}
          />
        </Box>
      )}
      <CardContent sx={{ flex: 1 }}>
        <Typography
          mb={1}
          sx={{
            fontWeight: "700",
            fontSize: "18px",
            lineHeight: "27px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#5A6473",
          }}
        >
          {text}
        </Typography>
      </CardContent>
      {seq !== 0 && (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image={media}
            alt="Quick Symptom"
            sx={{ height: "100%", width: "100%" }}
          />
        </Box>
      )}
    </Card>
  );
};
