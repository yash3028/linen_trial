import { Paper } from "@mui/material";

const RefundPolicy = () => {
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
      }}
    >
      <iframe
        src="https://thetruetouch.in/mdms/static/refund_policy.html"
        style={{
          display: "flex",
          width: "100%",
          height: "80vh",
          overflow: "hidden",
          flexGrow: 1,
        }}
      ></iframe>
    </Paper>
  );
};

export default RefundPolicy;
