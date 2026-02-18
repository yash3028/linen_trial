import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
// import { useNavigate } from "react-router";
import { order_status_master } from "../utils/utils";
// import CustomButton from "./CustomButton";
import { states } from "../utils/master";
import { useEffect, useState } from "react";
import { postRequest } from "../utils/requests";
import { Snackbar, Alert } from "@mui/material";

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
      addressLine2: string;
      addressLine3: string;
      city: string;
      state: string;
      contactNumber: string;
      emailAddress: string;
      createdAt: string;
    };
    cartId: string;
    createdAt: Date;
  };
}) => {
  // const navigate = useNavigate();
  const [Status, setStatus] = useState(order.status);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success",
  );
  const updateOrder = async () => {
    try {
      console.log("Sending Status:", Status);

      const response = await postRequest("/products/orders/update-status", {
        id: order.id,
        status: Status,
      });
      console.log("Sending payload:", response);

      console.log("API RESPONSE:", response);

      if (response.error) {
        throw new Error(response.message);
      }
      setSnackMessage("Status updated successfully");
      setSnackSeverity("success");
      setSnackOpen(true);
    } catch (err: any) {
      console.log("ERROR:", err);
      setSnackMessage(err.message || "Failed to update status");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  };
  return (
    <div className="flex flex-col w-full p-2 bg-[#135638]/5 rounded-lg border-1 gap-2">
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
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
            {new Date(order.createdAt || "").toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </div>
        <div className="flex flex-row justify-between">
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
            {/* 
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
            )} */}
          </div>
        </div>
        {order.address && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
                gap: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Typography variant="body2">
                  {order.address?.customerName}
                </Typography>

                <Typography variant="body2">
                  {order.address?.emailAddress}
                </Typography>

                <Typography variant="body2">
                  {order.address?.contactNumber}
                </Typography>
              </div>

              <div style={{ flex: 1, textAlign: "right" }}>
                <Typography variant="body2">Address:</Typography>

                <Typography variant="body2">
                  {order.address?.addressLine1}
                </Typography>

                {order.address?.addressLine2 && (
                  <Typography variant="body2">
                    {order.address?.addressLine2}
                  </Typography>
                )}

                {order.address?.addressLine3 && (
                  <Typography variant="body2">
                    {order.address?.addressLine3}
                  </Typography>
                )}

                <Typography variant="body2">
                  City: {order.address?.city}
                </Typography>

                <Typography variant="body2">
                  State:{" "}
                  {
                    states.find((state) => state.key == order.address?.state)
                      ?.name
                  }
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={Status}
                  label="Status"
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setStatus(newStatus);
                  }}
                >
                  {Object.keys(order_status_master).map((key) => (
                    <MenuItem key={key} value={key}>
                      {
                        order_status_master[
                          key as keyof typeof order_status_master
                        ]
                      }
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" onClick={updateOrder}>
                Update
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrderItem;
