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
  const { id, cartId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const [orders, setOrders] = useState<any[]>([]);

  const [total_price, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error, message } = id
          ? await getRequest(`/products/orders/view-cart/${id}`)
          : await getRequest(`/products/orders/get-cart/${cartId}`);

        if (error) {
          throw new Error(`HTTP error! status: ${message}`);
        }
        setOrders((data as any).orders);
        setTotalPrice((data as any).total_price);
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
        justifyContent: "center",
        gap: 2,
        backgroundColor: "primary.main",
        p: { sx: 0, lg: 5 },
      }}
    >
      <div className="flex flex-col p-2 gap-2 w-full lg:w-2/3 lg:text-center">
        {!loading && (
          <Typography variant="h6">Order placed successfully!</Typography>
        )}
        {!loading && (
          <>
            <OrderSummary
              orders={orders}
              total_price={total_price}
            ></OrderSummary>
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
