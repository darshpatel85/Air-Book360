/* eslint-disable react/prop-types */
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoaderScreen = () => (
  <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default LoaderScreen;
