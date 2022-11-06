/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import React, { useContext, useState } from "react";
import DateAdapter from "@mui/lab/AdapterMoment";
import cityData from "assets/cityCode.json";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { GlobalContext } from "Store/GlobalState";
import axios from "axios";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const CalenderFare = ({ setIsLoading }) => {
  const { userInfo, setError, setFlightSearch, setPage } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  const [searchInfo, setSearchInfo] = useState({
    origin: "",
    destination: "",
    month: null,
    sources: ["AMADEUS_GALILEO", "SPICE_JET", "INDIGO", "GO_AIR"],
    flightCabinClass: "",
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
    month: false,
    flightCabinClass: false,
  });
  const getFare = (customDate) => {
    setIsLoading(true);
    const d = new Date(searchInfo.month);
    if (customDate) {
      d.setDate(customDate.getDate());
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
    reqObject.preferredDepartureTime = `${d.toISOString().split("T")[0]}T00:00:00`;

    if (reqObject.sources.length === 4) {
      reqObject.sources = null;
    }
    reqObject.isUpdateCalendarFareOfDay = !!customDate;
    const data = JSON.stringify(reqObject);
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/flights/calendar-fare`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data,
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          if (response?.data?.Response?.SearchResults) {
            const current = new Date(reqObject.preferredDepartureTime);
            const month = current.getMonth();
            let days;
            if (customDate) {
              days = dateArray;
            } else {
              days = [];
              current.setDate(1);
              while (current.getMonth() === month) {
                const obj = { date: new Date(current) };
                days.push(obj);
                current.setDate(current.getDate() + 1);
              }
            }
            response.data.Response.SearchResults.forEach((item) => {
              const obj = days.findIndex(
                (it) => it.date.getDate() === new Date(item.DepartureDate).getDate()
              );
              if (obj !== -1) {
                days[obj].data = item;
              }
            });
            setDateArray(days);
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
        if (error?.response?.data?.message) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      })
      .then(() => setIsLoading(false));
  };
  const handleSubmit = () => {
    const temp = searchInfoError;

    Object.keys(searchInfo).forEach((i) => {
      temp[i] =
        searchInfo[i] === "" ||
        searchInfo[i] === null ||
        searchInfo[i] === undefined ||
        searchInfo[i] === [];
    });

    if (Object.values(temp).every((item) => !item)) {
      getFare();
    }
    setSearchInfoError(temp);
  };

  const handleChange = (e) => {
    if (e.target.name === "sources") {
      if (searchInfo.sources.includes(e.target.value)) {
        setSearchInfo({
          ...searchInfo,
          sources: searchInfo.sources.filter((item) => item !== e.target.value),
        });
      } else {
        setSearchInfo({
          ...searchInfo,
          sources: [...searchInfo.sources, e.target.value],
        });
      }
    } else {
      setSearchInfo({ ...searchInfo, [e.target.name]: e.target.value });
    }
  };

  const handleSearch = () => {
    setOpenModal(false);
    setIsLoading(true);

    const reqObject = { ...searchInfo };
    reqObject.origin = searchInfo.origin.substring(
      searchInfo.origin.indexOf("(") + 1,
      searchInfo.origin.indexOf(")")
    );
    reqObject.destination = searchInfo.destination.substring(
      searchInfo.destination.indexOf("(") + 1,
      searchInfo.destination.indexOf(")")
    );

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
        if (error?.response?.data?.message) {
          setError(error.response.data.message);
        } else if (error.message) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      })
      .then(() => setIsLoading(false));
  };

  return (
    <MKBox sx={{ m: 5, mt: 3 }}>
      <MKBox mb={2}>
        <Grid container justifyContent="space-between">
          <Grid xs={3.5}>
            <InputLabel> From </InputLabel>
            <Autocomplete
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
          <Grid xs={3.5}>
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
          <Grid xs={3.5}>
            <InputLabel> Month & Year </InputLabel>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                views={["year", "month"]}
                // minDate={new Date("2012-03-01")}
                // maxDate={new Date("2023-06-01")}
                value={searchInfo.month}
                onChange={(newValue) => {
                  setSearchInfo({ ...searchInfo, month: newValue });
                }}
                renderInput={(params) => <MKInput {...params} />}
              />
            </LocalizationProvider>
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
      <MKBox mb={2}>
        <MKBox sx={{ display: "flex" }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Restrict my search</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchInfo.sources.includes("AMADEUS_GALILEO")}
                    onChange={handleChange}
                    name="sources"
                    value="AMADEUS_GALILEO"
                  />
                }
                label="AMADEUS GALILEO"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchInfo.sources.includes("SPICE_JET")}
                    onChange={handleChange}
                    name="sources"
                    value="SPICE_JET"
                  />
                }
                label="SPICE JET"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchInfo.sources.includes("INDIGO")}
                    onChange={handleChange}
                    name="sources"
                    value="INDIGO"
                  />
                }
                label="INDIGO"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={searchInfo.sources.includes("GO_AIR")}
                    onChange={handleChange}
                    name="sources"
                    value="GO_AIR"
                  />
                }
                label="GO AIR"
              />
            </FormGroup>
          </FormControl>
        </MKBox>
      </MKBox>
      <MKBox mt={4} mb={1}>
        <MKButton variant="gradient" onClick={handleSubmit} color="info" fullWidth>
          Search
        </MKButton>
      </MKBox>
      {dateArray.length > 0 ? (
        <MKBox mt={2}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <thead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell />
                </TableRow>
              </thead>
              <TableBody>
                {dateArray?.map((row, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                      <p style={{ color: "blue", whiteSpace: "nowrap" }}>
                        {moment(row.date).format("Do MMM YYYY")}
                      </p>
                    </TableCell>
                    <TableCell>
                      {row.data ? (
                        <MKBox display="flex" justifyContent="space-between">
                          <div style={{ whiteSpace: "nowrap" }}>
                            {row.data.AirlineName}
                            <p style={{ color: "blue", whiteSpace: "nowrap" }}>
                              Rs. {row.data.BaseFare}
                            </p>
                          </div>
                          <MKButton
                            onClick={() => {
                              setOpenModal(true);
                              setSearchInfo({
                                ...searchInfo,
                                preferredDepartureTime: moment(row.date).format(
                                  "yyyy-MM-DT00:00:00"
                                ),
                                preferredArrivalTime: moment(row.date).format("yyyy-MM-DT00:00:00"),
                              });
                            }}
                            color="info"
                          >
                            Search
                          </MKButton>
                        </MKBox>
                      ) : (
                        <MKButton onClick={() => getFare(row.date)} color="info">
                          Update
                        </MKButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MKBox>
      ) : (
        <></>
      )}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MKBox sx={style}>
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
          <MKBox mt={4} mb={1}>
            <MKButton variant="gradient" onClick={handleSearch} color="info" fullWidth>
              Search
            </MKButton>
          </MKBox>
        </MKBox>
      </Modal>
    </MKBox>
  );
};

export default CalenderFare;
