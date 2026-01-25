import { Typography } from "@mui/material";
import { order_status_master } from "../utils/utils";

const OrderSummary = ({ order }: { order: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h6" className="border-b-1 pb-3">
        Order summary
      </Typography>
      <Typography variant="body2" fontWeight={"bold"}>
        Product: {order.name}
      </Typography>
      <Typography variant="body2" fontWeight={"bold"}>
        Size: {order.size}
      </Typography>
      <Typography variant="body2" fontWeight={"bold"}>
        Quantity: {order.quantity}
      </Typography>
      <Typography variant="body2" fontWeight={"bold"}>
        Total price: INR {order.price}
      </Typography>
      <Typography variant="body2" fontWeight={"bold"}>
        Status:{" "}
        {order_status_master[order.status as keyof typeof order_status_master]}
      </Typography>
    </div>
  );
};

export default OrderSummary;
