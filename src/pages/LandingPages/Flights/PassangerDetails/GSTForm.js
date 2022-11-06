/* eslint-disable react/prop-types */
import { Grid, InputLabel } from "@mui/material";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import React from "react";

const GSTForm = ({ index, handleChange, passanger }) => (
  <MKBox>
    <Grid container m={2} justifyContent="space-between">
      <Grid xs={5.5}>
        <InputLabel> GST Number </InputLabel>
        <MKInput
          fullWidth
          value={passanger.GSTNumber}
          name="GSTNumber"
          onChange={(e) => handleChange(e, index)}
          hiddenlabel
        />
      </Grid>
      <Grid xs={5.5}>
        <InputLabel> GST Company Name </InputLabel>
        <MKInput
          fullWidth
          value={passanger.GSTCompanyName}
          name="GSTCompanyName"
          onChange={(e) => handleChange(e, index)}
          hiddenlabel
        />
      </Grid>
    </Grid>
    <Grid container m={2} justifyContent="space-between">
      <Grid xs={5.5}>
        <InputLabel> GST Company Contact No. </InputLabel>
        <MKInput
          fullWidth
          value={passanger.GSTCompanyContactNumber}
          name="GSTCompanyContactNumber"
          onChange={(e) => handleChange(e, index)}
          type="tel"
          hiddenlabel
        />
      </Grid>
      <Grid xs={5.5}>
        <InputLabel> GST Company Address </InputLabel>
        <MKInput
          fullWidth
          value={passanger.GSTCompanyAddress}
          name="GSTCompanyAddress"
          onChange={(e) => handleChange(e, index)}
          hiddenlabel
        />
      </Grid>
    </Grid>
    <Grid container m={2} justifyContent="space-between">
      <Grid xs={5.5}>
        <InputLabel> GST Company Email </InputLabel>
        <MKInput
          fullWidth
          value={passanger.GSTCompanyEmail}
          name="GSTCompanyEmail"
          onChange={(e) => handleChange(e, index)}
          type="email"
          hiddenlabel
        />
      </Grid>
    </Grid>
  </MKBox>
);

export default GSTForm;
