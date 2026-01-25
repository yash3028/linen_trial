import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest } from "../utils/requests";
import { useNavigate, useParams } from "react-router";
import OrderSummary from "./OrderSummary";
import CustomButton from "./CustomButton";

const FinalSummary = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error, message } = await getRequest(
          `/products/orders/get-order/${id}`,
        );

        if (error) {
          throw new Error(`HTTP error! status: ${message}`);
        }
        setOrder(data);
      } catch (err: any) {
        console.log(err.message || "Something went wrong");
        snackBarFunction(err.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
      <div className="flex flex-col p-2">
        {!loading && order.status == "order_confirmed" ? (
          <Typography variant="h6">Order placed successfully!</Typography>
        ) : (
          <Typography variant="h6" color="warning">
            Order pending
          </Typography>
        )}
        {!loading && (
          <>
            {" "}
            <Typography>Please note the below reference number.</Typography>
            <Typography>{order.referenceNumber}</Typography>
            <OrderSummary order={order}></OrderSummary>
            <CustomButton
              label="Shop more"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            ></CustomButton>
          </>
        )}
      </div>
    </Paper>
  );
};

export default FinalSummary;
