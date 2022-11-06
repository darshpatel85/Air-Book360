/* eslint-disable react/prop-types */
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import React from "react";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const DetailsForm = ({
  index,
  error,
  handleChange,
  passanger,
  passangersDetails,
  setPassangersDetails,
  isMain,
  international,
}) => (
  <MKBox>
    <Grid container sx={{ m: 2 }} justifyContent="space-between">
      <Grid xs={1}>
        <InputLabel id="demo-simple-select-label">Title</InputLabel>
        <FormControl fullWidth>
          <Select
            value={passanger.Title}
            name="Title"
            error={error.Title}
            onChange={(e) => handleChange(e, index)}
            sx={{ height: 47 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Ms">Ms</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Mstr">Mstr</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={4.5}>
        <InputLabel> First Name </InputLabel>
        <MKInput
          error={error.FirstName}
          fullWidth
          hiddenlabel
          value={passanger.FirstName}
          name="FirstName"
          onChange={(e) => handleChange(e, index)}
        />
      </Grid>
      <Grid xs={5.5}>
        <InputLabel> Last Name </InputLabel>
        <MKInput
          fullWidth
          error={error.LastName}
          value={passanger.LastName}
          name="LastName"
          onChange={(e) => handleChange(e, index)}
          hiddenlabel
        />
      </Grid>
    </Grid>
    <Grid container sx={{ m: 2 }} justifyContent="space-between">
      <Grid xs={5.5}>
        <InputLabel> Gender </InputLabel>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            error={error.Gender}
            sx={{ height: 47 }}
            value={passanger.Gender}
            name="Gender"
            onChange={(e) => handleChange(e, index)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
          >
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={5.5}>
        <InputLabel> Date of Birth </InputLabel>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            error={error.DateOfBirth}
            value={passanger.DateOfBirth}
            onChange={(val) => {
              const t = [...passangersDetails];
              t[index].DateOfBirth = val;
              setPassangersDetails(t);
            }}
            renderInput={(params) => <MKInput fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>

    {isMain ? (
      <>
        <Grid container sx={{ m: 2 }} justifyContent="space-between">
          <Grid xs={5.5}>
            <InputLabel> Mobile Number </InputLabel>
            <MKInput
              fullWidth
              error={error.ContactNo}
              value={passanger.ContactNo}
              name="ContactNo"
              onChange={(e) => handleChange(e, index)}
              type="tel"
            />
          </Grid>

          <Grid xs={5.5}>
            <InputLabel> Email </InputLabel>
            <MKInput
              fullWidth
              error={error.Email}
              value={passanger.Email}
              name="Email"
              onChange={(e) => handleChange(e, index)}
              type="email"
            />
          </Grid>
        </Grid>
        <Grid container sx={{ m: 2 }} justifyContent="space-between">
          <Grid xs={5.5}>
            <InputLabel> Address </InputLabel>
            <MKInput
              fullWidth
              error={error.AddressLine1}
              value={passanger.AddressLine1}
              name="AddressLine1"
              onChange={(e) => handleChange(e, index)}
              mb={2}
              type="text"
              label="Address line 1"
            />
            <MKInput
              fullWidth
              value={passanger.AddressLine2}
              name="AddressLine2"
              onChange={(e) => handleChange(e, index)}
              type="text"
              label="Address line 2"
            />
          </Grid>
          <Grid xs={5.5}>
            <InputLabel> City </InputLabel>
            <MKInput
              fullWidth
              error={error.City}
              value={passanger.City}
              name="City"
              onChange={(e) => handleChange(e, index)}
              type="text"
            />
          </Grid>
        </Grid>
      </>
    ) : (
      <></>
    )}
    <Grid m={2} xs={8}>
      <FormControl fullWidth>
        <InputLabel> Country </InputLabel>
        <Select
          value={passanger.CountryCode}
          name="CountryCode"
          onChange={(e) => handleChange(e, index)}
          sx={{ height: 47 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value="IN">India</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    {international ? (
      <Grid container justifyContent="space-between" m={2} xs={8}>
        <Grid xs={5.5}>
          <InputLabel> Passport No. </InputLabel>
          <MKInput
            fullWidth
            error={error.PassportNo}
            value={passanger.PassportNo}
            name="PassportNo"
            onChange={(e) => handleChange(e, index)}
            type="tel"
          />
        </Grid>

        <Grid xs={5.5}>
          <InputLabel> Passport Expiry Date </InputLabel>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              value={passanger.PassportExpiry}
              error={error.PassportExpiry}
              onChange={(val) => {
                const t = [...passangersDetails];
                t[index].PassportExpiry = val;
                setPassangersDetails(t);
              }}
              renderInput={(params) => <MKInput fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    ) : (
      <></>
    )}
  </MKBox>
);

export default DetailsForm;
