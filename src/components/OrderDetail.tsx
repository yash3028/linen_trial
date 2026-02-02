import { Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRequest } from "../utils/requests";

const OrderDetail = ({
  snackBarFunction,
}: {
  snackBarFunction: (message: string, type: "success" | "error") => void;
}) => {
  const { id } = useParams();

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
      {!loading && (
        <div className="p-2">
          <div className="p-2 bg-slate-100 rounded-xl border-1 flex flex-col gap-10">
            <div>
              <Typography variant="h6">
                Order #{order.referenceNumber}
              </Typography>

              <Typography variant="body1">{order.name}</Typography>
              <div className="w-2/3 flex flex-row justify-between">
                <Typography variant="body2">Size: {order.size}</Typography>
                <Typography variant="body2">
                  Quantity: {order.quantity}
                </Typography>
              </div>
            </div>
            <div className="border-t-1 pt-2">
              <Typography variant="body1">Issues / Queries</Typography>
            </div>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default OrderDetail;
