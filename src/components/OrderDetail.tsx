import { Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getRequest } from "../utils/requests";
import Address from "./Address";

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
        minHeight: "70vh",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 0,
        justifyContent: { xs: "flex-start", lg: "center" },
        gap: 2,
        backgroundColor: "primary.main",
        p: { sx: 0, lg: 5 },
      }}
    >
      {!loading && (
        <div className="p-2 h-full w-full lg:w-2/3">
          <div className="p-2 bg-[#135638]/5 rounded-xl border-1 flex flex-col items-center">
            <Typography variant="h6">Order #{order.referenceNumber}</Typography>
            <div className="w-full bg-slate-500/10 rounded-xl p-2 text-center">
              <div className="flex flex-col lg:flex-row justify-around gap-3">
                <div>
                  <Typography
                    variant="body1"
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                  >
                    {order.name}
                  </Typography>
                  <div className="flex flex-row justify-around">
                    <Typography variant="body2">Size: {order.size}</Typography>
                    <Typography variant="body2">
                      Quantity: {order.quantity}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2">
                      Total order price: INR {order.price}
                    </Typography>
                  </div>
                </div>
                <div>
                  <Address address={order.address}></Address>
                </div>
              </div>
              <div>
                <Typography variant="body2" fontWeight={"bold"}>
                  Contact us:
                </Typography>
                <div className="flex flex-col">
                  <Typography variant="caption">
                    Call or WhatsApp: +91 70759 67089
                  </Typography>
                  <Typography variant="caption">
                    Email: support@thetruetouch.in
                  </Typography>
                </div>
              </div>
            </div>

            {/* <div className="w-full mt-1 text-center bg-slate-150">
              <Typography variant="body1">Issues / Queries</Typography>
              <TextArea></TextArea>
            </div> */}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default OrderDetail;
