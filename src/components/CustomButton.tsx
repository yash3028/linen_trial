import "../styles/CustomButton.css";

import { Typography } from "@mui/material";
import React from "react";

const CustomButton = (props: {
  label: string;
  type: "button" | "reset" | "submit";
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <>
      <button
        className={`hover:bg-secondary hover:text-primary rounded-full border min-w-20 w-full bg-primary text-secondary p-3`}
        style={{ cursor: "pointer" }}
        onClick={(event) => props.onClick(event)}
        type={props.type}
      >
        <Typography variant="body2"> {props.label}</Typography>
      </button>
    </>
  );
};

export default CustomButton;
