/* eslint-disable react/prop-types */
import { Table, TableCell, TableRow } from "@mui/material";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import React from "react";

const passanger = ["", "Adult", "Child", "Infant"];

const FareQuote = ({ fareQuote, passangersDetails }) => (
  <MKBox m={2}>
    <MKTypography varient="h6">Sale Summary</MKTypography>
    {fareQuote.FareBreakdown.map((item) => (
      <Table key={item.PassengerType} aria-label="simple table">
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>{passanger[item.PassengerType]}</TableCell>
          <TableCell>Rs.{item.BaseFare / item.PassengerCount}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>Tax</TableCell>
          <TableCell>Rs.{item.Tax / item.PassengerCount}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>T. Fee and S. Charges</TableCell>
          <TableCell>
            Rs. {fareQuote.Fare.TaxBreakup.filter((it) => it.key === "TransactionFee")[0].value}
          </TableCell>
        </TableRow>
        <TableRow sx={{ backgroundColor: "#EFF3F7" }}>
          <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
          <TableCell>
            Rs.
            {item.BaseFare / item.PassengerCount +
              item.Tax / item.PassengerCount +
              Number(
                fareQuote.Fare.TaxBreakup.filter((it) => it.key === "TransactionFee")[0].value
              )}
          </TableCell>
        </TableRow>
      </Table>
    ))}
    <MKTypography varient="h6">Total Fare</MKTypography>
    <Table aria-label="simple table">
      <TableRow>
        <TableCell sx={{ fontWeight: "bold" }}>
          Adult x{" "}
          {fareQuote.FareBreakdown.find((item) => item.PassengerType === 1)
            ? fareQuote.FareBreakdown.find((item) => item.PassengerType === 1).PassengerCount
            : 0}
        </TableCell>
        <TableCell align="right">
          Rs.
          {fareQuote.FareBreakdown.find((item) => item.PassengerType === 1)
            ? fareQuote.FareBreakdown.find((item) => item.PassengerType === 1).BaseFare
            : 0}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold" }}>
          Child x{" "}
          {fareQuote.FareBreakdown.find((item) => item.PassengerType === 2)
            ? fareQuote.FareBreakdown.find((item) => item.PassengerType === 2).PassengerCount
            : 0}
        </TableCell>
        <TableCell align="right">
          Rs.
          {fareQuote.FareBreakdown.find((item) => item.PassengerType === 2)
            ? fareQuote.FareBreakdown.find((item) => item.PassengerType === 2).BaseFare
            : 0}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ fontWeight: "bold" }}>
          Infant x{" "}
          {fareQuote.FareBreakdown.find((item) => item.PassengerType === 3)
            ? fareQuote.FareBreakdown.find((item) => item.PassengerType === 3).PassengerCount
            : 0}
        </TableCell>
        <TableCell align="right">
          Rs .{" "}
          {fareQuote.FareBreakdown.find((item) => item.PassengerType === 3)
            ? fareQuote.FareBreakdown.find((item) => item.PassengerType === 3).BaseFare
            : 0}{" "}
        </TableCell>
      </TableRow>
      {passangersDetails.length > 0 ? (
        <>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              Excess Baggage (
              {passangersDetails
                ?.map((item) => Number(item.baggage.split("-")[0]))
                .reduce((prev, item) => item + prev)}
              KG )
            </TableCell>
            <TableCell align="right">
              Rs .{" "}
              {passangersDetails
                ?.map((item) => Number(item.baggage.split("-")[1]))
                .reduce((prev, item) => item + prev)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              Meal (
              {passangersDetails?.filter((item) => item.meal.split("-")[0] !== "NoMeal").length}{" "}
              Platter )
            </TableCell>
            <TableCell align="right">
              Rs .{" "}
              {passangersDetails
                ?.map((item) => Number(item.meal.split("-")[1]))
                .reduce((prev, item) => item + prev)}
            </TableCell>
          </TableRow>
        </>
      ) : (
        <></>
      )}
      <TableRow sx={{ backgroundColor: "#EFF3F7" }}>
        <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
        <TableCell align="right">
          Rs.
          {fareQuote.FareBreakdown.map((item) => item.BaseFare).reduce(
            (prev, item) => item + prev
          ) +
            (passangersDetails.length > 0
              ? passangersDetails
                  ?.map((item) => Number(item.baggage.split("-")[1]))
                  .reduce((prev, item) => item + prev) +
                passangersDetails
                  ?.map((item) => Number(item.meal.split("-")[1]))
                  .reduce((prev, item) => item + prev)
              : 0)}
        </TableCell>
      </TableRow>
    </Table>
  </MKBox>
);

export default FareQuote;
