import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import { getRequest } from "../utils/requests";
import OrderItem from "./OrderItem";

const OrdersList = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  //   const navigate = useNavigate();
  const [orders, setOrders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error, message } = await getRequest(
          `/products/orders/get-orders?limit=${limit}&page=${page}`,
        );
        if (error) {
          throw new Error(`HTTP error! status: ${message}`);
        }
        const result: any = (data as any).orders;
        setOrders(result);
        setTotalCount((data as any).count);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
        snackBarFunction(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);
  const totalPages = Math.ceil(totalCount / limit);
  return (
    <Paper
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: { xs: "column" },
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 0,
        justifyContent: "flex-start",
        gap: 2,
        backgroundColor: "primary.main",
        p: { sx: 0, lg: 5 },
      }}
    >
      {!loading && (
        <Grid
          container
          spacing={{ xs: 0, sm: 1, md: 2 }}
          sx={{ justifyContent: "center" }}
        >
          {orders.map((order: any) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
              key={order.id}
              display={"flex"}
              gap={1}
              p={0.7}
            >
              <OrderItem order={order} key={order.id}></OrderItem>
            </Grid>
          ))}
        </Grid>
      )}
      <Box display="flex" justifyContent="center" mt={2} gap={1}>
        <Button
          variant="outlined"
          sx={{ color: "text.primary" }}
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          sx={{ color: "text.primary" }}
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default OrdersList;
