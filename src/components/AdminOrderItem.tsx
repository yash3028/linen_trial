import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { order_status_master } from "../utils/utils";
import CustomButton from "./CustomButton";

const AdminOrderItem = ({
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
    address?: {
      customerName: string;
      addressLine1: string;
      city: string;
      state: string;
      contactNumber: string;
      emailAddress: string;
      createdAt: string;
    };
    cartId: string;
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
      <div className="bg-slate-500/10 p-2 rounded-xl flex flex-col gap-2 h-full">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {
              order_status_master[
                order.status as keyof typeof order_status_master
              ]
            }
          </Typography>

          <Typography variant="body2">
            Date:{" "}
            {new Date(order.address?.createdAt || "").toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              },
            )}
          </Typography>
        </div>
        <div className="flex flex-row justify-between">
          <div className="user-info">
            <Typography variant="body2">
              Name: {order.address?.customerName}
            </Typography>
            <Typography variant="body2">
              Email: {order.address?.emailAddress}
            </Typography>
            <Typography variant="body2">
              Address: {order.address?.addressLine1}
            </Typography>
            <Typography variant="body2">City: {order.address?.city}</Typography>
            <Typography variant="body2">
              Phone: {order.address?.contactNumber}
            </Typography>
          </div>
          <div className="w-40">
            <Typography variant="body2">Size: {order.size}</Typography>
            <Typography variant="body2">Color: {order.color}</Typography>
            <Typography variant="body2">Quantity: {order.quantity}</Typography>
          </div>
          <div className="flex flex-col h-full justify-between gap-2 items-end">
            <Typography variant="body2">Total: INR {order.price}</Typography>
            <Typography variant="body2">
              Order id: {order.referenceNumber}
            </Typography>

            {order.status == "order_initiated" && (
              <CustomButton
                label="Complete order"
                type="button"
                onClick={() => {
                  navigate(`../checkout/view-cart/${order.cartId}`, {
                    relative: "route",
                  });
                }}
              ></CustomButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderItem;
