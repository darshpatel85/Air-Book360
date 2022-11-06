/* eslint-disable react/prop-types */
import MKBox from "components/MKBox";
import React from "react";
import FlightList from "./FlightList";

const OneWayList = ({ searchResult, handleBook }) => (
  <>
    <MKBox px={1} width="100%" mx="auto" sx={{ overflow: "hidden" }} zIndex={2}>
      <FlightList handleBook={handleBook} searchResult={searchResult.Response.Results[0]} />
    </MKBox>
  </>
);

export default OneWayList;
