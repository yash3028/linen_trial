import { Box, Link, Paper, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CopyrightIcon from "@mui/icons-material/Copyright";
export const Footer = () => {
  return (
    <Paper sx={{ backgroundColor: "secondary.main", borderRadius: 0, p: 2 }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        sx={{ alignItems: { xs: "start", md: "center" } }}
        gap={3}
      >
        <Box
          display={"flex"}
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 15 },
          }}
        >
          <Box display={"flex"} sx={{ flexDirection: "column" }} gap={0.4}>
            <Typography
              color="text.secondary"
              textAlign={"start"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              Contact us
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="inherit" sx={{ color: "text.secondary" }} />

              <Typography
                color="text.secondary"
                textAlign={"start"}
                variant="caption"
              >
                <span> +91 70759 67089</span>
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon fontSize="inherit" sx={{ color: "text.secondary" }} />
              <Typography
                color="text.secondary"
                textAlign={"start"}
                variant="caption"
              >
                <span> support@thetruetouch.in</span>
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} sx={{ flexDirection: "column" }} gap={0.4}>
            <Typography
              color="text.secondary"
              textAlign={"start"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              THE TRUE TOUCH
            </Typography>
            <Typography
              color="text.secondary"
              textAlign={"start"}
              variant="caption"
            >
              Conscious clothing choices for a greener tomorrow
            </Typography>

            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={2}
              flexWrap={"wrap"}
            >
              <Typography
                color="text.secondary"
                textAlign={"start"}
                variant="caption"
                noWrap
              >
                <Link
                  href="/shipping-policy"
                  color="text.secondary"
                  fontSize={"inherit"}
                  underline="hover"
                >
                  Privacy policy
                </Link>
              </Typography>
              <Typography
                color="text.secondary"
                textAlign={"start"}
                variant="caption"
                noWrap
              >
                <Link
                  href="/shipping-policy"
                  color="text.secondary"
                  fontSize={"inherit"}
                  underline="hover"
                >
                  Terms of service
                </Link>
              </Typography>
              <Typography
                color="text.secondary"
                textAlign={"start"}
                variant="caption"
                noWrap
              >
                <Link
                  href="/policies/shipping-policy"
                  color="text.secondary"
                  fontSize={"inherit"}
                  underline="hover"
                >
                  Shipping policy
                </Link>
              </Typography>
              <Typography
                color="text.secondary"
                textAlign={"start"}
                variant="caption"
                noWrap
              >
                <Link
                  href="/policies/refund-policy"
                  color="text.secondary"
                  fontSize={"inherit"}
                  underline="hover"
                >
                  Refund policy
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <CopyrightIcon fontSize="inherit" sx={{ color: "text.secondary" }} />
          <Typography
            color="text.secondary"
            textAlign={"start"}
            variant="caption"
          >
            <span>Copyright 2026 Ecovibe Apparel Private Limited</span>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
