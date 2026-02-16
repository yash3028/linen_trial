import { Box, Divider, IconButton, Typography } from "@mui/material";
import {
  get_discount,
  get_discounted_price,
  order_status_master,
} from "../utils/utils";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const OrderSummary = ({
  orders,
  total_price,
  delete_item,
  total_items,
  isDiscountApplicable = true,
}: {
  orders: any[];
  total_price: number;
  total_items: number;
  delete_item: any | null;
  isDiscountApplicable: boolean;
}) => {
  const onDelete = (referenceNumber: string) => {
    delete_item(referenceNumber);
  };
  return (
    <div className="flex flex-col gap-1 bg-slate-100 p-2 pt-1 rounded-xl border-1">
      <Typography variant="h6">Order summary</Typography>
      {orders.map((order, index) => (
        <Box key={index}>
          <Divider />
          <div className="flex flex-row justify-between">
            <div className="w-6/8 lg:w-1/2">
              <Typography
                variant="body2"
                pt={1}
                textTransform={"uppercase"}
                fontWeight={"bold"}
              >
                {order.name}
              </Typography>
              <div className="flex flex-row justify-between">
                <Typography variant="body2">Size: {order.size}</Typography>
                <Typography variant="body2">
                  Quantity: {order.quantity}
                </Typography>
              </div>
              <Typography variant="body2">
                Total price: INR{" "}
                {isDiscountApplicable ? (
                  <>
                    <s>{order.price}</s>{" "}
                    {get_discounted_price(order.price, total_items)}
                  </>
                ) : (
                  <>{order.price}</>
                )}
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
            </div>

            <div>
              {order.referenceNumber != order.cartId && delete_item != null && (
                <IconButton
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    onDelete(order.referenceNumber);
                  }}
                >
                  <DeleteOutlineIcon color="error"></DeleteOutlineIcon>
                </IconButton>
              )}
            </div>
          </div>
          <Divider />
        </Box>
      ))}
      <Typography className="text-center">
        Total price: INR{" "}
        {isDiscountApplicable ? (
          <>
            <s>{total_price.toFixed(2)}</s>{" "}
            {get_discounted_price(total_price, total_items)} (
            {get_discount(total_items)})
          </>
        ) : (
          <>{total_price.toFixed(2)}</>
        )}
      </Typography>
    </div>
  );
};

export default OrderSummary;
