import { Typography } from "@mui/material";
import { states } from "../utils/master";

const Address = (props: {
  address: {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
}) => {
  return (
    <>
      {props.address && (
        <div>
          <Typography variant="body2" fontWeight={"bold"}>
            DELIVERY ADDRESS:
          </Typography>
          <div className="flex flex-col">
            <Typography variant="body2">
              {props.address.addressLine1}
            </Typography>
            {props.address.addressLine2 && (
              <Typography variant="body2">
                {props.address.addressLine3}
              </Typography>
            )}
            {props.address.addressLine3 && (
              <Typography variant="body2">
                {props.address.addressLine3}
              </Typography>
            )}
            <div className="flex flex-row justify-center gap-2">
              <Typography variant="body2">{props.address.city},</Typography>
              <Typography variant="body2">
                {
                  states?.find((state) => {
                    return state.key == props.address.state;
                  })?.name
                }
              </Typography>
            </div>
            <div className="flex flex-row justify-center gap-2">
              <Typography variant="body2">{props.address.country},</Typography>
              <Typography variant="body2">{props.address.pincode}</Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;
