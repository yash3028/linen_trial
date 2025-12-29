import "../styles/CustomButton.css";

import { Typography } from "@mui/material";
import React from "react";

const CustomButton = (props: {
  label: string;

  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <>
      {" "}
      <button
        className={`hover:bg-primary hover:text-secondary rounded-xs border min-w-20 bg-secondary text-primary`}
        style={{ padding: "1%", cursor: "pointer" }}
        onClick={(event) => props.onClick(event)}
      >
        <Typography> {props.label}</Typography>
      </button>
    </>
  );
};

export default CustomButton;
