import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Popover,
  Button,
  Stack,
  Modal,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { MuiOtpInput } from "mui-one-time-password-input";

import "../styles/index.css";

import logo from "../assets/mark_svg.svg";
import { Link } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import CustomButton from "./CustomButton";
import { getRequest, postRequest } from "../utils/requests";
import { clear_storage, save_data, save_token } from "../utils/authentication";

const Navbar = ({
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
      snackBarFunction("Logged in successfully", "success");
      handleModalClose();
    }
  };
  const logout = async () => {
    const { error, message } = await getRequest<any>("/users/users/logout");
    if (error) {
      snackBarFunction(message, "error");
    } else {
      clear_storage();
      snackBarFunction("Logged out successfully", "success");
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="sticky top-0 z-50">
      <AppBar
        position="static"
        color="inherit"
        elevation={1}
        sx={{ backgroundColor: "primary.main" }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              marginRight: 0.5,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 45, // adjust height
                width: "auto", // optional, keeps aspect ratio if square
                marginRight: 0.5, // spacing between logo and text
              }}
            />

            <Typography sx={{ fontWeight: "bold" }}>THE TRUE TOUCH</Typography>
          </Box>

          <Box sx={{ py: 1, ml: "auto" }}>
            <IconButton color="inherit" onClick={handleClick}>
              <PersonIcon fontSize="large" />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "primary.main",
                  },
                },
              }}
            >
              <Stack direction={"column"}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={
                    localStorage.getItem("token")?.length
                      ? logout
                      : handleModalOpen
                  }
                >
                  <Typography noWrap>
                    {localStorage.getItem("token")?.length
                      ? "Logout"
                      : "Login / Sign up"}
                  </Typography>
                </Button>
                <Button variant="text" color="secondary">
                  <Typography>Orders</Typography>
                </Button>
              </Stack>
            </Popover>
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
                      TextFieldsProps={{ inputProps: { inputMode: "numeric" } }}
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
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
