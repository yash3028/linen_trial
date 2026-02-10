import Box from "@mui/material/Box";
import Carousel from "./Carousel";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../Themes";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router";
import { Footer } from "./Footer";
import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { ProductGrid } from "./ProductGrid";
import { Product } from "./Product";
import Checkout from "./Checkout";
import ShippingPolicy from "./ShippingPolicy";
import FinalSummary from "./FinalSummary";
import OrdersList from "./OrdersList";
import RefundPolicy from "./RefundPolicy";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import OrderDetail from "./OrderDetail";

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
          minHeight: "100vh ",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBar.open}
          autoHideDuration={3000}
          onClose={closeSnackBar}
        >
          <Alert
            severity={snackBar.type}
            variant="filled"
            onClose={closeSnackBar}
          >
            {snackBar.message}
          </Alert>
        </Snackbar>
        <Carousel />
        <Navbar snackBarFunction={openSnackBar} />
        <Routes>
          <Route path="/">
            <Route path="" element={<ProductGrid></ProductGrid>}></Route>
            <Route
              path="the-earth-essentials/product/:id"
              element={<Product snackBarFunction={openSnackBar} />}
            ></Route>
          </Route>
          <Route path="/checkout">
            <Route
              path="cart/:cartId"
              element={<Checkout snackBarFunction={openSnackBar} />}
            ></Route>
            <Route
              path="view-cart"
              element={<Checkout snackBarFunction={openSnackBar} />}
            ></Route>
            <Route
              path="summary/:cartId"
              element={
                <FinalSummary snackBarFunction={openSnackBar}></FinalSummary>
              }
            ></Route>
          </Route>
          <Route path="/my-orders">
            <Route
              path=""
              element={
                <OrdersList snackBarFunction={openSnackBar}></OrdersList>
              }
            ></Route>
            <Route
              path=":id"
              element={
                <OrderDetail snackBarFunction={openSnackBar}></OrderDetail>
              }
            ></Route>
          </Route>
          <Route path="/policies">
            <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="terms-of-service" element={<TermsOfService />}></Route>
            <Route path="shipping-policy" element={<ShippingPolicy />}></Route>
            <Route path="refund-policy" element={<RefundPolicy />}></Route>
          </Route>
        </Routes>
        <Footer></Footer>
      </Box>
    </ThemeProvider>
  );
};
