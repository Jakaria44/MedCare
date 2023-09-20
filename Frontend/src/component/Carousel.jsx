import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

const Carousel_demo = ({ children }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrev = () => {
    setSlideIndex((slideIndex - 1) % children.length);
  };

  const handleNext = () => {
    setSlideIndex((slideIndex + 1) % children.length);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
    >
      <IconButton onClick={handlePrev}>
        <ArrowBackIos />
      </IconButton>
      <Box display="flex" justifyContent="center">
        {children[Math.abs(slideIndex)]}
      </Box>
      <IconButton onClick={handleNext}>
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default function Carousel({ items }) {
  const small = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Carousel_demo>
      {items?.map((item, index) => (
        <img
          src={item}
          key={index}
          alt=""
          height={300}
          width={small ? 250 : 400}
        />
      ))}
    </Carousel_demo>
  );
}
