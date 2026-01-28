import { Typography } from "@mui/material";
import CustomButton from "./CustomButton";

const OrderItem = ({
  order,
}: {
  order: {
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    status: string;
  };
}) => {
  return (
    <div className="flex flex-col w-full p-2 bg-slate-100 rounded-lg border-1">
      <Typography fontWeight={"bold"} textTransform={"uppercase"}>
        {order.name}
      </Typography>
      <div className="flex flex-row justify-between">
        <div>
          <Typography variant="body2">Size: {order.size}</Typography>
          <Typography variant="body2">Color: {order.color}</Typography>
          <Typography variant="body2">Quantity: {order.quantity}</Typography>
        </div>
        <div className="flex flex-col h-full justify-between">
          <Typography variant="body2">Total: INR {order.price}</Typography>

          <CustomButton
            label="Get support"
            type="button"
            onClick={() => {}}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
