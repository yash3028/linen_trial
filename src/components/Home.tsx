import Box from "@mui/material/Box";
import Carousel from "./Carousel";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Themes";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router";
import { Footer } from "./Footer";
import { FeedbackForm } from "./FeedbackForm";
import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { FeedbackCards } from "./FeedbackCard";
import { Chat } from "./Chat";
import { ProductGrid } from "./ProductGrid";
import { Product } from "./Product";
// import BreadCrumb from "./BreadCrumb";

export const Home = () => {
  const [snackBar, setSnackBar] = React.useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });
  const openSnackBar = (message: string, type: "success" | "error") => {
    setSnackBar({ open: true, message, type });
  };

  const closeSnackBar = () => {
    setSnackBar({ ...snackBar, open: false });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          margin: "0%",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBar.open}
          autoHideDuration={3000}
          onClose={closeSnackBar}
        >
          <Alert severity={snackBar.type}>{snackBar.message}</Alert>
        </Snackbar>
        <Carousel />
        <Navbar snackBarFunction={openSnackBar} />
        {/* <BreadCrumb /> */}
        <Routes>
          <Route path="/" element={<ProductGrid></ProductGrid>} />
          <Route
            path="/product/:id"
            element={<Product snackBarFunction={openSnackBar} />}
          />

          <Route
            path="/feedback"
            element={
              <FeedbackForm snackBarFunction={openSnackBar}></FeedbackForm>
            }
          />
          <Route
            path="/get-feedbacks"
            element={<FeedbackCards></FeedbackCards>}
          />
          <Route path="/chat" element={<Chat></Chat>} />
        </Routes>
        <Footer></Footer>
      </Box>
    </ThemeProvider>
  );
};
