import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Carousel = () => {
  const items = [
    { url: "", text: "Contact for more details" },
    { url: "", text: "Buy 1 - 5% OFF | Buy 2 - 10% OFF | Buy 3 - 15% OFF" },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 1500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        m: 0,
        backgroundColor: "secondary.main",
        py: 1,
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          color: "text.secondary",
          fontSize: "0.6em",
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
        }}
      >
        {items[index].text}
      </Typography>
    </Box>
  );
};

export default Carousel;
