import { Typography } from "@mui/material";
import { order_status_master } from "../utils/utils";

const OrderSummary = ({ order }: { order: any }) => {
  return (
    <div className="flex flex-col gap-2 bg-slate-100 p-2 rounded-xl border-1">
      <Typography variant="h6" className="border-b-1 pb-3">
        Order summary
      </Typography>
      <Typography variant="body2">Product: {order.name}</Typography>
      <div className="flex flex-row gap-3">
        <Typography variant="body2">Size: {order.size}</Typography>
        <Typography variant="body2">Quantity: {order.quantity}</Typography>
      </div>

      <Typography variant="body2">Total price: INR {order.price}</Typography>
      <Typography variant="body2">
        Status:{" "}
        {order_status_master[order.status as keyof typeof order_status_master]}
      </Typography>
      {order.referenceNumber && (
        <Typography variant="body2">
          Order id: {order.referenceNumber}
        </Typography>
      )}
    </div>
  );
};

export default OrderSummary;
