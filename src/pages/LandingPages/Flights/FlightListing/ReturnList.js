/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MKBox from "components/MKBox";
import React from "react";
import FlightList from "./FlightList";

const ReturnList = ({ searchResult, handleBook }) => (
  <>
    <MKBox
      justifyContent="space-evenly"
      display="flex"
      width="100%"
      mx="auto"
      sx={{ overflow: "hidden" }}
      zIndex={2}
    >
      <Grid xs={5.75}>
        <FlightList handleBook={handleBook} searchResult={searchResult.Response.Results[0]} />
      </Grid>
      <Grid xs={5.75}>
        <FlightList handleBook={handleBook} searchResult={searchResult.Response.Results[1]} />
      </Grid>
    </MKBox>
  </>
);

export default ReturnList;
