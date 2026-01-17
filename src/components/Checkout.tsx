import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router";
import CustomButton from "./CustomButton";
import { getRequest } from "../utils/requests";
import { useEffect, useState } from "react";
import React from "react";

const Checkout = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("here");
        const { data, error, message } = await getRequest(
          `/products/orders/get-order/${id}`,
        );

        if (error) {
          throw new Error(`HTTP error! status: ${message}`);
        }
        setProduct(data);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Paper
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          width: "100%",
          boxSizing: "border-box",
          borderRadius: 0,
          justifyContent: "flex-start",
          gap: 2,
          backgroundColor: "primary.main",
          p: { sx: 0, lg: 5 },
        }}
      >
        <Box width={{ xs: "100%", lg: "50%" }}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={2}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            <Typography>Addresses</Typography>
            <CustomButton
              label="Add"
              onClick={() => {}}
              type="button"
            ></CustomButton>
          </Box>
        </Box>
        <Box>
          <Typography>Order details</Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Checkout;
