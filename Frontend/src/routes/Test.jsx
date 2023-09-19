import { Box, Button, Paper } from "@mui/material";
import React, { useEffect } from "react";

const Carousel = ({ children }) => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  useEffect(() => {
    // console.log(slideIndex);
  }, [slideIndex]);
  const handlePrev = () => {
    setSlideIndex((slideIndex - 1) % children.length);
  };

  const handleNext = () => {
    setSlideIndex((slideIndex + 1) % children.length);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        {children[Math.abs(slideIndex)]}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button onClick={handlePrev}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </Box>
  );
};

const CarouselItem = ({ image }) => {
  return (
    <Paper>
      <img src={image} alt="" />
    </Paper>
  );
};

export default function Test() {
  const items = [
    "https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div>
      <Carousel>
        {items.map((item, index) => (
          <CarouselItem key={index} image={item} />
        ))}
      </Carousel>
    </div>
  );
}
