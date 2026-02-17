import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#e2eced",
    },
    secondary: { main: "#135638" },
    text: {
      primary: "#135638",
      secondary: "#e2eced",
    },
  },

  typography: {
    fontFamily: "Montserrat",
    h5: {
      letterSpacing: "0.1em",
    },
    h6: {
      letterSpacing: "0.1em",
    },
    body1: {
      letterSpacing: "0.1em",
    },
    body2: {
      letterSpacing: "0.1em",
    },
  },
});
