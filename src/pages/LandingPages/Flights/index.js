/* eslint-disable no-nested-ternary */
import MKBox from "components/MKBox";
import React, { useContext } from "react";
import { Grid, Paper, Step, StepButton, Stepper } from "@mui/material";

import { GlobalContext } from "Store/GlobalState";
import FlightSearch from "./FlightSearch";
import FlightsList from "./FlightListing";
import PassangerDetails from "./PassangerDetails";

const pages = [
  "Flight Search",
  "Flight Results",
  "Passenger Details",
  "Review Booking",
  "Booking Confirmation",
];
const Flights = () => {
  const { page, setPage } = useContext(GlobalContext);
  return (
    <>
      <MKBox px={1} width="100%" py={10} sx={{ minHeight: "100vh" }} mx="auto" zIndex={2}>
        <Grid
          container
          xs={12}
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Paper elevation={3}>
            <MKBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              display="flex"
              justifyContent="center"
              sx={{ alignItems: "center" }}
              textAlign="center"
            >
              <MKBox sx={{ width: "100%" }}>
                <Stepper activeStep={page} alternativeLabel>
                  {pages.map((label, index) => (
                    <Step key={label}>
                      <StepButton
                        onClick={() => (index < page ? setPage(index) : "")}
                        color="inherit"
                      >
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </MKBox>
            </MKBox>
            {page === 0 ? (
              <FlightSearch setPage={setPage} />
            ) : page === 1 ? (
              <FlightsList setPage={setPage} />
            ) : page === 2 ? (
              <PassangerDetails />
            ) : (
              <></>
            )}
          </Paper>
        </Grid>
      </MKBox>
    </>
  );
};

export default Flights;
