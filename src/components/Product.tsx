import { Box, Modal, Paper, Typography } from "@mui/material";
import { ImageSlider } from "./ImageSlider";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/requests";
import { SizeButton } from "./SizeButton";
import NumberSpinner from "./NumberSpinner";
import CustomButton from "./CustomButton";
import React from "react";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { save_data, save_token } from "../utils/authentication";
import { MuiOtpInput } from "mui-one-time-password-input";
import { size_master } from "../utils/utils";

export const Product = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "primary.main",
    boxShadow: 24,
    p: 4,
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<any>(null);
  const [sizeArray, setSizeArray] = useState<Array<boolean>>(
    new Array(5).fill(false),
  );
  const [quantity, setQuantity] = useState<number | null>(1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [phone, setPhone] = React.useState("");
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const handleMobileNumberChange = (value: string) => {
    setPhone(value);
  };
  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };
  const sendOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(phone);
    if (matchIsValidTel(phone, { onlyCountries: ["IN"] })) {
      // API call to send OTP here
      const { data, error, message } = await postRequest<any>(
        "/users/users/send-otp",
        {
          countryCode: "+91",
          mobileNumber: phone.replace(/\s/g, "").slice(-10),
        },
      );
      if (error) {
        snackBarFunction(message, "error");
      } else {
        save_data("verificationToken", data.verificationToken);
        setIsOtpSent(true);
        snackBarFunction("OTP sent successfully", "success");
      }
    } else {
      snackBarFunction("Please enter a valid phone number", "error");
    }
  };
  const verifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error, message } = await postRequest<any>(
      "/users/users/verify-otp",
      {
        verificationToken: localStorage.getItem("verificationToken"),
        otp: otp,
      },
    );
    if (error) {
      snackBarFunction(message, "error");
    } else {
      save_token(data.token);
      setOtp("");
      setIsOtpSent(false);
      setPhone("");
      snackBarFunction("Logged in successfully", "success");
      handleModalClose();
    }
  };
  const selectSize = (
    index: number,
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const newSizeArray = new Array(5).fill(false);
    newSizeArray[index] = sizeArray[index] ? false : true;
    setSizeArray(newSizeArray);
  };
  const place_order = async () => {
    console.log(quantity);
    console.log(sizeArray);
    const index = sizeArray.findIndex((val) => val == true);
    if (index == -1) {
      snackBarFunction("Please select size", "error");
    } else {
      const { data, error, message } = await postRequest<any>(
        "/products/orders/place-order",
        {
          size: size_master[index.toString() as keyof typeof size_master],
          quantity: quantity,
          price: product.price,
          color: product.color,
          status: "order_initiated",
          productCode: product.productCode,
        },
      );
      if (error) {
        snackBarFunction(message, "error");
      } else {
        snackBarFunction(data.message, "success");
        navigate(`/checkout/${data.order.id}`);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("here");
        const { data, error, message } = await getRequest(
          `/products/products/get-product/${id}`,
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
          {!loading && product && <ImageSlider images={product.images || []} />}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          mb={2}
          mx={{ xs: 1, lg: 0 }}
        >
          <Box>
            {!loading && <Typography variant="h4">{product.name}</Typography>}
          </Box>
          <Typography>Size</Typography>
          <Box flexDirection={"row"} flexWrap={"wrap"} display={"flex"} gap={2}>
            {["XS", "S", "M", "L", "XL"].map((size: string, index: number) => (
              <SizeButton
                label={size}
                index={index}
                isSelectedArray={sizeArray}
                onClick={selectSize}
                key={index}
              ></SizeButton>
            ))}
          </Box>
          <Typography>Quantity</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <NumberSpinner
              label="Number Spinner"
              min={1}
              max={3}
              defaultValue={1}
              onValueChange={(value) => setQuantity(value)}
            />
          </Box>
          <CustomButton
            label="Buy now"
            onClick={
              localStorage.getItem("token") ? place_order : handleModalOpen
            }
            type="button"
          ></CustomButton>
        </Box>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            display={"flex"}
            flexDirection={"column"}
            gap={1}
            component={"form"}
            onSubmit={isOtpSent ? verifyOtp : sendOtp}
          >
            <Typography
              id="modal-modal-title"
              color="secondary"
              variant="h6"
              component="h2"
            >
              Login / Sign up
            </Typography>

            {!isOtpSent && (
              <MuiTelInput
                value={phone}
                onChange={handleMobileNumberChange}
                onlyCountries={["IN"]}
                forceCallingCode
                autoFocus
                defaultCountry="IN"
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "4px",

                  // Default border
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },

                  // Hover
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },

                  // Focus (IMPORTANT FIX)
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "secondary.main",
                      borderWidth: 2,
                    },
                }}
              />
            )}
            {isOtpSent && (
              <>
                <Typography
                  id="modal-modal-title"
                  color="secondary"
                  variant="subtitle1"
                  component="h2"
                >
                  Please enter OTP
                </Typography>
                <MuiOtpInput
                  value={otp}
                  length={6}
                  autoFocus
                  onChange={handleOtpChange}
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "4px",

                    // Default border
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },

                    // Hover
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main",
                    },

                    // Focus (IMPORTANT FIX)
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "secondary.main",
                        borderWidth: 2,
                      },
                  }}
                />
              </>
            )}
            {!isOtpSent && (
              <CustomButton
                label="Send OTP"
                type="submit"
                onClick={() => {}}
              ></CustomButton>
            )}
            {isOtpSent && (
              <CustomButton
                label="Verify OTP"
                onClick={() => {}}
                type="submit"
              ></CustomButton>
            )}
          </Box>
        </Modal>
      </Paper>
    </>
  );
};
