import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface ImageSliderProps {
  images: { url: string }[];
  autoPlay?: boolean;
  autoPlayDelay?: number; // in ms
  onClickAction: () => void;
}

export const BannerImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = true,
  autoPlayDelay = 3000,
  onClickAction,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayDelay);
    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayDelay]);

  return (
    <Paper
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 0,
        backgroundColor: "primary.main",
      }}
      elevation={0}
    >
      <Paper
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 270, sm: 400, md: 600, lg: 800 },
          overflow: "hidden",
          borderRadius: 0,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={0}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img.url}
            alt={`Slide ${index}`}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "100%",
              height: "100%",
              objectFit: "fill",
              position: "absolute",
              transition: "opacity 0.5s ease-in-out",
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
        <button
          onClick={onClickAction}
          className="top-50 left-50 z-10 rounded-full border-2 p-3 sm:p-3 lg:p-8 cursor-pointer bg-secondary opacity-80"
        >
          <Typography
            variant={"body1"}
            textTransform={"uppercase"}
            sx={{ fontWeight: { lg: "bold" } }}
          >
            Shop now
          </Typography>
        </button>
        {/* Previous Button */}
        {/* <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            color: "primary.main",
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            zIndex: 10,
          }}
        >
          <ArrowBackIos fontSize="small" />
        </IconButton> */}

        {/* Next Button */}
        {/* <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            color: "primary.main",
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
            zIndex: 10,
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton> */}
      </Paper>
    </Paper>
  );
};
