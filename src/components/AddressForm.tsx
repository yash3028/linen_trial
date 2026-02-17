import { useEffect, useState } from "react";
import { states } from "../utils/master";
import { Typography } from "@mui/material";

const AddressForm = ({
  sendData,
  savedAddress,
}: {
  sendData: any;
  savedAddress: {
    customerName: string;
    emailAddress: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  } | null;
}) => {
  const [address, setAddress] = useState<{
    customerName: string;
    emailAddress: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }>({
    customerName: "",
    emailAddress: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });
  useEffect(() => {
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    sendData(address);
  }, [address]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const updatedAddress = { ...address, [name]: value };
    setAddress(updatedAddress);
    sendData(updatedAddress);
  };
  return (
    <div className="flex flex-col gap-2 bg-slate-100 rounded-xl p-2 border-1">
      <Typography variant="h6" className="border-b-1 pb-3">
        Shipping address
      </Typography>
      <div className="flex flex-col">
        <label htmlFor="customerName" aria-required>
          <Typography variant="body2" fontWeight={"bold"}>
            {" "}
            Name*
          </Typography>
        </label>
        <input
          id="customerName"
          type="text"
          className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
          name="customerName"
          value={address.customerName}
          style={{ outline: "none" }}
          onChange={handleChange}
          required
          autoComplete="off"
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="customerName" aria-required>
          <Typography variant="body2" fontWeight={"bold"}>
            {" "}
            Email*
          </Typography>
        </label>
        <input
          id="customerName"
          type="emailAddress"
          className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
          name="emailAddress"
          value={address.emailAddress}
          style={{ outline: "none" }}
          onChange={handleChange}
          required
          autoComplete="off"
        ></input>
      </div>
      <div className="flex flex-row gap-1">
        <div className="flex flex-col">
          <label htmlFor="country" aria-required>
            <Typography variant="body2" fontWeight={"bold"}>
              Country
            </Typography>
          </label>
          <select
            id="country"
            className="min-w-40 max-w-48 md:max-w-64 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
            style={{ outline: "none" }}
            name="country"
            value={address.country}
            onChange={handleChange}
            disabled
          >
            <option value={"India"}>India</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="pincode" aria-required>
            <Typography variant="body2" fontWeight={"bold"}>
              {" "}
              Pincode*
            </Typography>
          </label>
          <input
            id="pincode"
            type="text"
            className="max-w-42 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
            name="pincode"
            value={address.pincode}
            style={{ outline: "none" }}
            onChange={handleChange}
            maxLength={6}
          ></input>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="addressLine1" aria-required>
          <Typography variant="body2" fontWeight={"bold"}>
            {" "}
            Address line 1*
          </Typography>
        </label>
        <input
          id="addressLine1"
          type="text"
          className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
          name="addressLine1"
          value={address.addressLine1}
          style={{ outline: "none" }}
          onChange={handleChange}
          autoComplete="off"
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="addressLine2" aria-required>
          <Typography variant="body2" fontWeight={"bold"}>
            Address line 2
          </Typography>
        </label>
        <input
          id="addressLine2"
          type="text"
          className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
          name="addressLine2"
          value={address.addressLine2}
          style={{ outline: "none" }}
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="addressLine3" aria-required>
          <Typography variant="body2" fontWeight={"bold"}>
            Address line 3
          </Typography>
        </label>
        <input
          id="addressLine3"
          type="text"
          className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
          name="addressLine3"
          value={address.addressLine3}
          style={{ outline: "none" }}
          onChange={handleChange}
          autoComplete="off"
        ></input>
      </div>

      <div className="flex flex-row gap-1">
        <div className="flex flex-col">
          <label htmlFor="city" aria-required>
            <Typography variant="body2" fontWeight={"bold"}>
              City*
            </Typography>
          </label>
          <input
            id="city"
            type="text"
            className="max-w-40 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
            name="city"
            value={address.city}
            style={{ outline: "none" }}
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" aria-required>
            <Typography variant="body2" fontWeight={"bold"}>
              {" "}
              State*
            </Typography>
          </label>
          <select
            id="state"
            className="max-w-40 md:max-w-64 border-1 border-primary rounded-lg p-2 focus:border-2 focus:border-primary"
            style={{ outline: "none" }}
            name="state"
            value={address.state}
            onChange={handleChange}
          >
            <option value={""} key={"X"}>
              Select state
            </option>
            {states.map((state, index) => (
              <option value={state.key} key={index}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
