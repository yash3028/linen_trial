import { Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router";

const OrderItem = ({
  order,
}: {
  order: {
    id: number;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    status: string;
    referenceNumber: string;
  };
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full p-2 bg-slate-100 rounded-lg border-1">
      <div className="flex flex-row justify-between">
        <Typography fontWeight={"bold"} textTransform={"uppercase"}>
          {order.name}
        </Typography>
        <Typography textTransform={"uppercase"} variant="body2">
          {order.referenceNumber}
        </Typography>
      </div>

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
            onClick={() => {
              navigate(`./${order.id}`, { relative: "route" });
            }}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
