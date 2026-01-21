import { states } from "../utils/master";
import CustomButton from "./CustomButton";

const AddressForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-3 focus:border-primary"
        placeholder="Address line 1"
        style={{ outline: "none" }}
      ></input>
      <input
        type="text"
        className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-3 focus:border-primary"
        placeholder="Address line 2"
        style={{ outline: "none" }}
      ></input>
      <input
        type="text"
        className="min-w-80 border-1 border-primary rounded-lg p-2 focus:border-3 focus:border-primary"
        placeholder="Address line 3"
        style={{ outline: "none" }}
      ></input>
      <div className="flex flex-row gap-1">
        <input
          type="text"
          className="max-w-40 border-1 border-primary rounded-lg p-2 focus:border-3 focus:border-primary"
          placeholder="City"
          style={{ outline: "none" }}
        ></input>
        <select
          className="max-w-48 border-1 border-primary rounded-lg p-2 focus:border-3 focus:border-primary"
          style={{ outline: "none" }}
        >
          {states.map((state, index) => (
            <option value={state.key} key={index}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <select
        disabled
        className="max-w-40 border-1 border-primary rounded-lg p-2 focus:border-3 focus:border-primary"
        style={{ outline: "none" }}
      >
        <option>INDIA</option>
      </select>
      <CustomButton
        type="submit"
        label="Add Address"
        onClick={() => {}}
      ></CustomButton>
    </div>
  );
};

export default AddressForm;
