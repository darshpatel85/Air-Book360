/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import React, { useContext, useState } from "react";
import cityData from "assets/cityCode.json";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { GlobalContext } from "Store/GlobalState";
import axios from "axios";

const OneWay = ({ setIsLoading, setPage }) => {
  const { userInfo, setError, logout, setFlightSearch } = useContext(GlobalContext);
  const [searchInfo, setSearchInfo] = useState({
    origin: "",
    destination: "",
    flightCabinClass: "",
    departureDate: null,
    departureTime: "",
    directFlight: true,
    oneStopFlight: true,
    journeyType: "ONE_WAY",
    adultCount: "1",
    childCount: "0",
    infantCount: "0",
  });

  const [searchInfoError, setSearchInfoError] = useState({
    origin: false,
    destination: false,
    flightCabinClass: false,
    departureDate: false,
    departureTime: false,
    directFlight: true,
    oneStopFlight: true,
    journeyType: false,
    adultCount: false,
    childCount: false,
    infantCount: false,
  });

  const handleSubmit = () => {
    const temp = searchInfoError;

    Object.keys(searchInfo).forEach((i) => {
      temp[i] = searchInfo[i] === "" || searchInfo[i] === null || searchInfo[i] === undefined;
    });

    if (Object.values(temp).every((item) => !item)) {
      setIsLoading(true);
      const d = new Date(searchInfo.departureDate);
      let t;
      switch (searchInfo.departureTime) {
        case "Morning":
          t = "08:00:00";
          break;
        case "Afternoon":
          t = "14:00:00";
          break;
        case "Evening":
          t = "19:00:00";
          break;
        case "Night":
          t = "01:00:00";
          break;
        default:
          t = "00:00:00";
          break;
      }

      const reqObject = { ...searchInfo };
      reqObject.origin = searchInfo.origin.substring(
        searchInfo.origin.indexOf("(") + 1,
        searchInfo.origin.indexOf(")")
      );
      reqObject.destination = searchInfo.destination.substring(
        searchInfo.destination.indexOf("(") + 1,
        searchInfo.destination.indexOf(")")
      );
      reqObject.preferredDepartureTime = `${d.toISOString().split("T")[0]}T${t}`;
      reqObject.preferredArrivalTime = `${d.toISOString().split("T")[0]}T${t}`;

      const data = JSON.stringify(reqObject);

      const config = {
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/flights/search-flights`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        data,
      };

      axios(config)
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.Response?.Results) {
              setFlightSearch({ ...searchInfo, Response: response.data.Response });
              setPage(1);
            } else if (response?.data?.Response?.Error) {
              setError(response?.data?.Response?.Error.ErrorMessage);
            } else {
              setError("Something went wrong");
            }
          } else {
            setError(JSON.parse(response.data).message);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.status === 401) {
            logout();
          } else if (error?.response?.data?.message) {
            setError(error.response.data.message);
          } else if (error.message) {
            setError(error.message);
          } else {
            setError("Something went wrong");
          }
        })
        .then(() => setIsLoading(false));
    } else {
      setSearchInfoError(temp);
    }
  };

  const handleChange = (e) => {
    setSearchInfo({ ...searchInfo, [e.target.name]: e.target.value });
  };
  return (
    <MKBox sx={{ m: 5, mt: 3 }}>
      <MKBox mb={2}>
        <Grid container justifyContent="space-between">
          <Grid xs={5.5}>
            <InputLabel> From </InputLabel>
            <Autocomplete
              disablePortal
              name="origin"
              value={searchInfo.origin}
              onChange={(event, newValue) => {
                setSearchInfo({ ...searchInfo, origin: newValue });
              }}
              id="free-solo-demo"
              options={cityData
                .map(
                  (item) =>
                    `${item.AIRPORTNAME} (${item.AIRPORTCODE}) - ${item.CITYNAME},${item.COUNTRYNAME}`
                )
                .filter((item) => item !== searchInfo.destination)}
              renderInput={(params) => <MKInput {...params} placeholder="Enter Origin" />}
            />
          </Grid>
          <Grid xs={5.5}>
            <InputLabel> To </InputLabel>

            <Autocomplete
              onChange={(event, newValue) => {
                setSearchInfo({ ...searchInfo, destination: newValue });
              }}
              id="free-solo-demo"
              value={searchInfo.destination}
              name="destination"
              options={cityData
                .map(
                  (item) =>
                    `${item.AIRPORTNAME} (${item.AIRPORTCODE}) - ${item.CITYNAME},${item.COUNTRYNAME}`
                )
                .filter((item) => item !== searchInfo.origin)}
              renderInput={(params) => <MKInput {...params} placeholder="Enter Destination" />}
            />
          </Grid>
        </Grid>
      </MKBox>
      <MKBox display="flex" mb={2}>
        <Grid>
          <InputLabel> Depart </InputLabel>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              value={searchInfo.departureDate}
              onChange={(newValue) => {
                setSearchInfo({ ...searchInfo, departureDate: newValue });
              }}
              renderInput={(params) => <MKInput {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={4} sx={{ mt: 2, pl: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Time</InputLabel>
            <Select
              value={searchInfo.departureTime}
              sx={{ height: 47 }}
              onChange={handleChange}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Time"
              name="departureTime"
            >
              <MenuItem value="Any Time">Any Time</MenuItem>
              <MenuItem value="Morning">Morning</MenuItem>
              <MenuItem value="Afternoon">Afternoon</MenuItem>
              <MenuItem value="Evening">Evening</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </MKBox>
      <MKBox mb={2}>
        <Grid justifyContent="space-between" display="flex">
          <Grid xs={3.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Adult (12+ year)</InputLabel>
              <Select
                value={searchInfo.adultCount}
                sx={{ height: 47 }}
                onChange={handleChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Adult (12+ year)"
                name="adultCount"
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-1">Children (2-11 year)</InputLabel>
              <Select
                value={searchInfo.childCount}
                sx={{ height: 47 }}
                labelId="demo-simple-select-label-1"
                onChange={handleChange}
                id="demo-simple-select"
                label="Children (2-11 year)"
                name="childCount"
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label-2">Infant (Under 2 year)</InputLabel>
              <Select
                value={searchInfo.infantCount}
                sx={{ height: 47 }}
                onChange={handleChange}
                labelId="demo-simple-select-label-2"
                id="demo-simple-select"
                label="Infant (Under 2 year)"
                name="infantCount"
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox mb={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label-3">Class</InputLabel>
          <Select
            value={searchInfo.flightCabinClass}
            sx={{ height: 47 }}
            labelId="demo-simple-select-label-3"
            id="demo-simple-select"
            onChange={handleChange}
            label="Class"
            name="flightCabinClass"
          >
            <MenuItem value="ALL">Any</MenuItem>
            <MenuItem value="ECONOMY">Economy</MenuItem>
            <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
            <MenuItem value="BUSINESS">Bussiness</MenuItem>
            <MenuItem value="PREMIUM_BUSINESS">Premium Bussiness</MenuItem>
            <MenuItem value="FIRST">First</MenuItem>
          </Select>
        </FormControl>
      </MKBox>
      <MKBox mt={4} mb={1}>
        <MKButton variant="gradient" onClick={handleSubmit} color="info" fullWidth>
          Search
        </MKButton>
      </MKBox>
    </MKBox>
  );
};

export default OneWay;
