/* eslint-disable react/prop-types */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
import MKBox from "components/MKBox";
import React from "react";

const SSRDetails = ({ index, handleChange, passanger, ssr }) => (
  <MKBox m={2}>
    Baggage Details :
    <Table>
      <TableRow>
        <TableCell>Sector</TableCell>
        <TableCell>Cabin</TableCell>
        <TableCell>Check-in</TableCell>
        <TableCell>OperatedBy</TableCell>
      </TableRow>
      {ssr.Baggage ? (
        ssr.Baggage.map((item) => (
          <TableRow>
            <TableCell>
              {item[0].Origin}-{item[0].Destination}
            </TableCell>
            <TableCell>7 KG</TableCell>
            <TableCell>15 KG</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        ))
      ) : (
        <></>
      )}
    </Table>
    {ssr.Baggage ? (
      <Grid container mt={2} justifyContent="space-between">
        <Grid xs={4}>
          <InputLabel sx={{ whiteSpace: "pre-wrap" }}>
            {" "}
            Select Excess Baggage <br />
            (Extra charges will be applicable)
          </InputLabel>
        </Grid>
        <Grid xs={7.5}>
          <FormControl fullWidth>
            <Select
              sx={{ height: 47 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="baggage"
              value={passanger.baggage}
              onChange={(e) => handleChange(e, index)}
            >
              {ssr?.Baggage[0].map((i) => (
                <MenuItem key={i.Code} value={`${i.Weight}-${i.Price}`}>
                  {i.Weight === "0" ? i.Code : `${i.Weight}-KG Rs.${i.Price}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    ) : (
      <></>
    )}
    <Grid container mt={2} justifyContent="space-between">
      <Grid xs={4}>
        <InputLabel> Meal Preferences : </InputLabel>
      </Grid>
      <Grid xs={7.5}>
        <FormControl fullWidth>
          <Select
            sx={{ height: 47 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="meal"
            value={passanger.meal}
            onChange={(e) => handleChange(e, index)}
          >
            {ssr?.MealDynamic
              ? ssr.MealDynamic[0].map((i) => (
                  <MenuItem key={i.Code} value={`${i.Code}-${i.Price}`}>
                    {i.AirlineDescription === ""
                      ? i.Code
                      : `ADD ${i.AirlineDescription} Rs.${i.Price}`}
                  </MenuItem>
                ))
              : ssr?.Meal.map((i) => (
                  <MenuItem key={i.Code} value={i.code}>
                    {i.Description === "" ? i.Code : `ADD ${i.Description}`}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </MKBox>
);

export default SSRDetails;
