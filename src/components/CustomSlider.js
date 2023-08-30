import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const CustomSlider = ({
  title,
  range,
  disabled,
  onBlur,
  onChange,
  min,
  max,
  steps,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF0066",
        darker: "#053e85",
      },
    },
  });
  return (
    <div className="">
      <ThemeProvider theme={theme}>
        <div className=" flex justify-between">
          <p className=" text-primary">{title}</p>
          <p className=" text-primary">{range}</p>
        </div>
        <Box>
          <Slider
            onChange={onChange}
            aria-label="Temperature"
            value={range}
            min={min}
            max={max}
            step={steps}
            disabled={disabled}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default CustomSlider;
