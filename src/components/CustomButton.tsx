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
        className={`hover:bg-secondary hover:text-primary rounded-sm border min-w-20 bg-primary text-secondary`}
        style={{ padding: "1%", cursor: "pointer" }}
        onClick={(event) => props.onClick(event)}
        type={props.type}
      >
        <Typography> {props.label}</Typography>
      </button>
    </>
  );
};

export default CustomButton;
