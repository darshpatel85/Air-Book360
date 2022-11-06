/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";
import MKButton from "components/MKButton";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const convertToHHMM = (time) => `${Math.floor(time / 60)}h ${time % 60}m`;

const FlightList = ({ searchResult, handleBook }) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <thead>
        <TableRow>
          <TableCell />
          <TableCell>Departure</TableCell>
          <TableCell>Arrival</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>
            <div style={{ whiteSpace: "nowrap" }}>Pub Price</div>
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </thead>
      <TableBody>
        {searchResult?.map((row, index) => (
          <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>
              {row.Segments[0].map((item) => (
                <>
                  <div style={{ whiteSpace: "nowrap" }}>{item.Airline.AirlineName}</div>
                  <div style={{ whiteSpace: "nowrap" }}>
                    {item.Airline.AirlineCode}-{item.Airline.FlightNumber}
                    {item.Airline.FareClass}
                  </div>
                </>
              ))}
            </TableCell>
            <TableCell>
              {row.Segments[0].map((item) => (
                <>
                  <div style={{ whiteSpace: "nowrap" }}>
                    {`${item.Origin.Airport.AirportCode} (${moment(item.Origin.DepTime).format(
                      "HH:mm"
                    )})`}
                  </div>
                </>
              ))}
            </TableCell>
            <TableCell>
              {row.Segments[0].map((item) => (
                <>
                  <div style={{ whiteSpace: "nowrap" }}>{`${
                    item.Destination.Airport.AirportCode
                  } (${moment(item.Destination.ArrTime).format("HH:mm")})`}</div>
                </>
              ))}
            </TableCell>
            <TableCell>
              {row.Segments[0].map((item) => (
                <>
                  <div style={{ whiteSpace: "nowrap" }}>{convertToHHMM(item.Duration)} </div>
                  <div style={{ whiteSpace: "nowrap" }}>
                    <p style={{ color: "red" }}>{item.NoOfSeatAvailable} seat(s) left</p>
                  </div>
                </>
              ))}
            </TableCell>
            <TableCell>
              <p style={{ color: "blue", whiteSpace: "nowrap" }}>Rs. {row.Fare.PublishedFare}</p>
            </TableCell>
            <TableCell />
            <TableCell>
              <MKButton onClick={() => handleBook(row)} color="info">
                Book Now{" "}
              </MKButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default FlightList;
