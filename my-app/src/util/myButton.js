import React from "react";

// mui
import { Tooltip, IconButton } from "@mui/material";

const myButton = ({
  content,
  tip,
  onClick,
  color,
  className,
  size,
  sx,
  disabled,
}) => {
  return (
    <Tooltip title={tip} arrow>
      <span>
        <IconButton
          size={size}
          sx={sx}
          onClick={onClick}
          color={color}
          className={className}
          disabled={disabled}
        >
          {content}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default myButton;
