/* eslint-disable react/prop-types */
import MKBox from "components/MKBox";
import React, { useState } from "react";
import { Grid, Tab, Tabs } from "@mui/material";
import TabPanel from "components/TabPanel";
import OneWay from "./OneWay";
import Return from "./Return";
import CalenderFare from "./CalenderFare";
import LoaderScreen from "../../../../components/LoaderScreen";

const FlightSearch = ({ setPage }) => {
  const [tab, setTab] = useState("Oneway");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading ? <LoaderScreen /> : <></>}

      <Grid xs={12}>
        <MKBox sx={{ width: 900 }} pt={4} pb={3} px={3}>
          <Tabs
            variant="fullWidth"
            value={tab}
            onChange={(e, newTab) => setTab(newTab)}
            aria-label="basic tabs example"
          >
            <Tab label="Oneway" value="Oneway" />
            <Tab label="Return" value="Return" />
            <Tab label="Multi stop" value="Multi stop" disabled />
            <Tab label="Calender Fare" value="Calender Fare" />
            <Tab label="Advance Search" value="Advance Search" disabled />
          </Tabs>
        </MKBox>
        <MKBox sx={{ minHeight: 500 }}>
          <TabPanel value={tab} index="Oneway">
            <OneWay setIsLoading={setIsLoading} setPage={setPage} />
          </TabPanel>
          <TabPanel value={tab} index="Return">
            <Return setIsLoading={setIsLoading} setPage={setPage} />
          </TabPanel>
          <TabPanel value={tab} index="Calender Fare">
            <CalenderFare setIsLoading={setIsLoading} setPage={setPage} />
          </TabPanel>
        </MKBox>
      </Grid>
    </>
  );
};

export default FlightSearch;
