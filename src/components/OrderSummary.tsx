import { Box, Divider, Typography } from "@mui/material";
import { order_status_master } from "../utils/utils";

const OrderSummary = ({
  orders,
  total_price,
}: {
  orders: any[];
  total_price: number;
}) => {
  return (
    <div className="flex flex-col gap-1 bg-slate-100 p-2 pt-1 rounded-xl border-1">
      <Typography variant="h6" className="">
        Order summary
      </Typography>
      {orders.map((order, index) => (
        <Box key={index}>
          <Divider />
          <Typography variant="body2" pt={1}>
            Product: {order.name}
          </Typography>
          <div className="flex flex-row justify-between lg:justify-around">
            <Typography variant="body2">Size: {order.size}</Typography>
            <Typography variant="body2">Quantity: {order.quantity}</Typography>
          </div>
          <Typography variant="body2">
            Total price: INR {order.price}
          </Typography>
          <Typography variant="body2">
            Status:{" "}
            {
              order_status_master[
                order.status as keyof typeof order_status_master
              ]
            }
          </Typography>
          {order.referenceNumber && (
            <Typography variant="body2">
              Order id: {order.referenceNumber}
            </Typography>
          )}
        </Box>
      ))}
      <Typography className="text-center">
        Total price: {total_price.toFixed(2)}
      </Typography>
    </div>
  );
};

export default OrderSummary;
