import { Paper } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Paper
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        width: "100%",
        minHeight: "100dvh",
        boxSizing: "border-box",
        borderRadius: 0,
        justifyContent: "flex-start",
        gap: 2,
        backgroundColor: "primary.main",
        p: { sx: 0, lg: 5 },
      }}
    >
      <iframe
        src="https://thetruetouch.in/mdms/static/privacy_policy.html"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          flexGrow: 1,
        }}
      ></iframe>
    </Paper>
  );
};

export default PrivacyPolicy;
