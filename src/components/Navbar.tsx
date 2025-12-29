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
import { MuiTelInput } from "mui-tel-input";
import "../styles/index.css";

import logo from "../assets/mark_svg.svg";
import { Link } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import CustomButton from "./CustomButton";

//import { CustomButton } from "./CustomButton";

const Navbar = () => {
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

  const handleChange = (newPhone: string) => {
    setPhone(newPhone);
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
                  backgroundColor: "primary.main", // or hex code like '#f50057'
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
              <MuiTelInput
                value={phone}
                onChange={handleChange}
                onlyCountries={["IN"]}
                forceCallingCode
                defaultCountry="IN"
                slotProps={
                  {
                    // input: {
                    //   sx: {
                    //     border: "none",
                    //   },
                    // },
                  }
                }
                className="sample"
              />
              <CustomButton label="Send OTP" onClick={() => {}}></CustomButton>
            </Box>
          </Modal>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
