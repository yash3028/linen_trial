import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import CustomButton from "./CustomButton";
import { getRequest, postRequest } from "../utils/requests";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import { apiError } from "../utils/error";
import OrderSummary from "./OrderSummary";

const Checkout = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<any>(null);
  const [addresses, setAddresses] = useState<
    {
      customerName: string;
      emailAddress: string;
      addressLine1: string;
      addressLine2: string;
      addressLine3: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
    }[]
  >([]);
  const [currentAddress, setCurrentAddress] = useState<{
    customerName: string;
    emailAddress: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }>();
  const handelAddress = (data: {
    customerName: string;
    emailAddress: string;
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
        setAddresses(addresses_response.data.addresses[0] as any[]);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
        snackBarFunction(err.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirm_order = async () => {
    try {
      if (
        !currentAddress?.customerName ||
        !currentAddress?.emailAddress ||
        !currentAddress?.addressLine1 ||
        !currentAddress?.city ||
        !currentAddress?.state ||
        !currentAddress?.country ||
        !currentAddress?.pincode ||
        currentAddress.pincode.length != 6
      ) {
        console.log(currentAddress);
        throw new apiError(500, "Please fill required address fields");
      } else {
        const { data, error, message } = await postRequest<any>(
          "/products/orders/confirm-order",
          {
            orderId: order.id,
            address: { ...currentAddress },
          },
        );
        if (error) {
          snackBarFunction(message, "error");
        } else {
          snackBarFunction(data.message, "success");
          navigate(`/checkout/summary/${order.id}`);
        }
      }
    } catch (error: any) {
      snackBarFunction(error.message, "error");
    }
  };
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
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <AddressForm
                sendData={handelAddress}
                savedAddress={addresses.length > 0 ? addresses[0] : null}
              ></AddressForm>
            </Box>
            // <Box
            //   display={"flex"}
            //   flexDirection={"row"}
            //   gap={2}
            //   alignItems={"center"}
            //   justifyContent={"space-between"}
            // >
            //   <Typography variant="h6" className="border-b-2">
            //     Address
            //   </Typography>
            //   {addresses.length > 0 && false && (
            //     <CustomButton
            //       label="Add"
            //       onClick={() => {}}
            //       type="button"
            //     ></CustomButton>
            //   )}
            // </Box>
          )}
        </Box>
        <Box width={{ xs: "100%", lg: "50%" }} p={1}>
          <div>
            {!loading && (
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <OrderSummary order={order}></OrderSummary>

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
                </div>
                <CustomButton
                  label={"Confirm order"}
                  onClick={confirm_order}
                  type="button"
                ></CustomButton>
              </Box>
            )}
          </div>
        </Box>
      </Paper>
    </>
  );
};

export default Checkout;
