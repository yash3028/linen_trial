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
  const handleMobileNumberChange = (newPhone: string) => {
    setPhone(newPhone);
  };
  const handleOtpChange = (otp: string) => {
    setOtp(otp);
  };
  const sendOtp = () => {
    if (matchIsValidTel(phone, { onlyCountries: ["IN"] })) {
      // API call to send OTP here
      setIsOtpSent(true);
      snackBarFunction("OTP sent successfully", "success");
    } else {
      snackBarFunction("Please enter a valid phone number", "error");
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
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
                onClick={handleModalOpen}
              >
                Login / Sign up
              </Button>
              <Button variant="text" color="secondary">
                Orders
              </Button>
            </Stack>
          </Popover>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} display={"flex"} flexDirection={"column"} gap={1}>
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
                  defaultCountry="IN"
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "4px",
                    // 1. Style the default border
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main !important", // Light gray (Tailwind border-slate-200)
                    },
                    // 2. Style the border on Hover
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main !important", // Medium gray
                      borderWidth: "1px !important",
                    },
                    // 3. Style the border on Focus (The Dark Border)
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "secondary.main !important",
                      borderWidth: "2px !important",
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
                    onChange={handleOtpChange}
                    sx={{
                      backgroundColor: "primary.main",
                      borderRadius: "4px",
                      // 1. Style the default border
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.main !important", // Light gray (Tailwind border-slate-200)
                      },
                      // 2. Style the border on Hover
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.main !important", // Medium gray
                        borderWidth: "1px !important",
                      },
                      // 3. Style the border on Focus (The Dark Border)
                      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "secondary.main !important",
                        borderWidth: "2px !important",
                      },
                    }}
                  />
                </>
              )}
              {!isOtpSent && (
                <CustomButton label="Send OTP" onClick={sendOtp}></CustomButton>
              )}
              {isOtpSent && (
                <CustomButton
                  label="Verify OTP"
                  onClick={() => {}}
                ></CustomButton>
              )}
            </Box>
          </Modal>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
