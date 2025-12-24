import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Popover,
  Button,
  Stack,
  //  Modal,
} from "@mui/material";
import logo from "../assets/mark_svg.svg";
import { Link } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
//import { CustomButton } from "./CustomButton";

const Navbar = () => {
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
              <Button variant="text" color="secondary">
                Login / Sign up
              </Button>
              <Button variant="text" color="secondary">
                Orders
              </Button>
            </Stack>
          </Popover>
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
