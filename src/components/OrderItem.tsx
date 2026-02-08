import { Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router";
import Address from "./Address";
import { order_status_master } from "../utils/utils";

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
    address: any;
  };
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full p-2 bg-[#135638]/5 rounded-lg border-1 gap-2">
      <div className="flex flex-row justify-between">
        <Typography fontWeight={"bold"} textTransform={"uppercase"}>
          {order.name}
        </Typography>
      </div>
      <div className="bg-slate-500/10 p-2 rounded-xl flex flex-col gap-2">
        <div className="text-center">
          <Typography>
            Status:{" "}
            {
              order_status_master[
                order.status as keyof typeof order_status_master
              ]
            }
          </Typography>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <Typography variant="body2">Size: {order.size}</Typography>
            <Typography variant="body2">Color: {order.color}</Typography>
            <Typography variant="body2">Quantity: {order.quantity}</Typography>
          </div>
          <div className="flex flex-col h-full justify-between gap-2 items-end">
            <Typography variant="body2">Total: INR {order.price}</Typography>
            <Typography variant="body2">
              Order id: {order.referenceNumber}
            </Typography>
            <CustomButton
              label="Get support"
              type="button"
              onClick={() => {
                navigate(`./${order.id}`, { relative: "route" });
              }}
            ></CustomButton>
            {order.status == "order_initiated" && (
              <CustomButton
                label="Complete order"
                type="button"
                onClick={() => {
                  navigate(`../checkout/view-cart/${order.id}`, {
                    relative: "route",
                  });
                }}
              ></CustomButton>
            )}
          </div>
        </div>
        <div className="text-center">
          <Address address={order.address}></Address>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
