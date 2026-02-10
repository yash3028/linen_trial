import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
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
  const { cartId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [total_price, setTotalPrice] = useState<number>(0);

  const [paymentMode, setPaymentMode] = useState<string>("cod");
  const handlePaymentModeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setPaymentMode(value);
  };
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [addresses_response, order_response]: any[] = await Promise.all([
          await getRequest(`/products/orders/get-addresses`),
          await getRequest(
            `/products/orders/view-cart${cartId ? `/${cartId}` : ""}`,
          ),
        ]);

        if (addresses_response.error || order_response.error) {
          throw new Error(
            `HTTP error! status: ${addresses_response.message || order_response.message}`,
          );
        }
        setOrders(order_response.data.orders);
        setTotalPrice((order_response as any).data.total_price);

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
          "/products/orders/confirm-cart",
          {
            cartId: orders[0].cartId,
            paymentMode,
            address: { ...currentAddress },
          },
        );
        if (error) {
          snackBarFunction(message, "error");
        } else {
          snackBarFunction(data.message, "success");
          if (data.payment_url) {
            window.location.replace(data.payment_url);
          } else {
            navigate(`/checkout/summary/${data.id}`);
          }
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
          minHeight: "80dvh",
          boxSizing: "border-box",
          borderRadius: 0,
          justifyContent: "flex-start",
          gap: 2,
          backgroundColor: "primary.main",
          p: { sx: 0, lg: 5 },
        }}
      >
        <Typography
          variant="body2"
          className="p-2 text-center bg-[#135638]/20"
          textTransform={"uppercase"}
          letterSpacing={5}
          fontWeight={"bold"}
        >
          Cart
        </Typography>{" "}
        {orders.length > 0 ? (
          <>
            <Box width={{ xs: "100%", lg: "50%" }} p={1}>
              {!loading && (
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <AddressForm
                    sendData={handelAddress}
                    savedAddress={addresses.length > 0 ? addresses[0] : null}
                  ></AddressForm>
                </Box>
              )}
            </Box>
            <Box width={{ xs: "100%", lg: "50%" }} p={1}>
              <div>
                {!loading && (
                  <Box display={"flex"} flexDirection={"column"} gap={1}>
                    <OrderSummary
                      orders={orders}
                      total_price={total_price}
                    ></OrderSummary>

                    <div>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="payment-mode-options"
                          name="row-radio-buttons-group"
                          defaultValue={paymentMode}
                          onChange={handlePaymentModeChange}
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
          </>
        ) : (
          <>
            <Box className="p-2 flex flex-col items-center gap-2">
              {" "}
              <Typography variant="h6" className="text-center">
                Your cart is empty!
              </Typography>
              <Box className="w-1/2">
                {" "}
                <CustomButton
                  label="Shop now"
                  type="button"
                  onClick={() => {
                    navigate("/");
                  }}
                ></CustomButton>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};

export default Checkout;
