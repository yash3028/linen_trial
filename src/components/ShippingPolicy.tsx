import { Paper } from "@mui/material";

const ShippingPolicy = () => {
  return (
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
        minHeight: "100vh",
      }}
    >
      <iframe
        src="https://thetruetouch.in/mdms/static/shipping_policy.html"
        scrolling="no"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      ></iframe>
    </Paper>
  );
};

export default ShippingPolicy;
