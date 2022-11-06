/* eslint-disable react/prop-types */
import MKBox from "components/MKBox";
import React from "react";
import ReactHtmlParser from "react-html-parser";

const FareRule = ({ fareRule }) => (
  <>
    FareRule
    {fareRule.map((item) => (
      <MKBox>
        {item.Airline} : {item.Origin}-{item.Destination} <br />
        {ReactHtmlParser(item.FareRuleDetail)}
      </MKBox>
    ))}
  </>
);

export default FareRule;
