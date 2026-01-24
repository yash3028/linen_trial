import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import CustomButton from "./CustomButton";
import { getRequest } from "../utils/requests";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

const Checkout = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [currentAddress, setCurrentAddress] = useState<{
    addressLine1: string;
  }>();
  const handelAddress = (data: {
    customerName: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }) => {
    setCurrentAddress(data);
  };
  // const [modalOpen, setModalOpen] = React.useState(false);
  // const handleModalOpen = () => setModalOpen(true);
  // const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [addresses_response, order_response]: any[] = await Promise.all([
          await getRequest(`/products/orders/get-addresses`),
          await getRequest(`/products/orders/get-order/${id}`),
        ]);

        if (addresses_response.error || order_response.error) {
          throw new Error(
            `HTTP error! status: ${addresses_response.message || order_response.message}`,
          );
        }
        setOrder(order_response.data);
        setAddresses(addresses_response.data.addresses[0]);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
        snackBarFunction("err.message", "error");
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
        <Box width={{ xs: "100%", lg: "50%" }} p={1}>
          {!loading && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h6">Address</Typography>
              {addresses.length > 0 && false && (
                <CustomButton
                  label="Add"
                  onClick={() => {}}
                  type="button"
                ></CustomButton>
              )}
            </Box>
          )}
          <AddressForm sendData={handelAddress}></AddressForm>
        </Box>
        <Box width={{ xs: "100%", lg: "50%" }} p={1}>
          {!loading && (
            <>
              <Typography variant="h6">Order details</Typography>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Typography variant="body1">Product: {order.name}</Typography>
                <Typography variant="body1">Size: {order.size}</Typography>
                <Typography variant="body1">
                  Quantity: {order.quantity}
                </Typography>
                <div>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="payment-mode-options"
                      name="row-radio-buttons-group"
                      defaultValue={"cod"}
                    >
                      <FormControlLabel
                        value="cod"
                        control={
                          <Radio
                            color="secondary"
                            sx={{ color: "secondary.main" }}
                          />
                        }
                        label="Cash on delivery"
                      />
                      <FormControlLabel
                        value="pay_now"
                        control={
                          <Radio
                            color="secondary"
                            sx={{ color: "secondary.main" }}
                          />
                        }
                        label="Pay now"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>{" "}
                <CustomButton
                  label={"Confirm order"}
                  onClick={() => {
                    console.log(currentAddress);
                  }}
                  type="button"
                ></CustomButton>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default Checkout;
