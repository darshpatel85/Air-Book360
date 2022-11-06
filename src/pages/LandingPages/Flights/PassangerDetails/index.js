import MKBox from "components/MKBox";
import React, { useContext, useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Paper } from "@mui/material";
import { GlobalContext } from "Store/GlobalState";
import MKButton from "components/MKButton";
import axios from "axios";
import DetailsForm from "./DetailsForm";
import GSTForm from "./GSTForm";
import SSRDetails from "./SSRDetails";
import FareQuote from "./FareQuote";
import FareRule from "./FareRule";

const passangerType = ["", "Adult", "Child", "Infant"];

const index = () => {
  const { searchResult, selectedFlight, userInfo } = useContext(GlobalContext);
  const [passangersDetails, setPassangersDetails] = useState([]);
  const [gstDetails, setGstDetails] = useState(false);
  const [error, setError] = useState({
    Title: false,
    FirstName: false,
    LastName: false,
    DateOfBirth: false,
    Gender: false,
    PassportNo: false,
    PassportExpiry: false,
    AddressLine1: false,
    City: false,
    CountryCode: false,
    Nationality: false,
    Email: false,
    ContactNo: false,
  });
  useEffect(() => {
    if (searchResult && selectedFlight)
      setPassangersDetails([
        {
          Title: "",
          FirstName: "",
          LastName: "",
          PaxType: 1,
          DateOfBirth: null,
          Gender: "",
          PassportNo: "",
          PassportExpiry: null,
          baggage: "0-0",
          meal: "NoMeal-0",
          AddressLine1: "",
          AddressLine2: "",
          Fare: selectedFlight.fareQuote.Fare,
          City: "",
          ContactNo: "",
          CountryCode: "IN",
          Nationality: "IN",
          Email: "",
          IsLeadPax: true,
          GSTCompanyAddress: "",
          GSTCompanyContactNumber: "",
          GSTCompanyName: "",
          GSTNumber: "",
          GSTCompanyEmail: "",
        },
        ...Array(Number(searchResult.adultCount) - 1).fill({
          Title: "",
          FirstName: "",
          LastName: "",
          PaxType: 1,
          DateOfBirth: null,
          Gender: "",
          PassportNo: "",
          PassportExpiry: null,
          baggage: "0-0",
          meal: "NoMeal-0",
          Fare: selectedFlight.fareQuote.Fare,
          Nationality: "IN",
          IsLeadPax: false,
        }),
        ...Array(Number(searchResult.childCount)).fill({
          Title: "",
          FirstName: "",
          LastName: "",
          PaxType: 2,
          DateOfBirth: null,
          Gender: "",
          PassportNo: "",
          PassportExpiry: null,
          baggage: "0-0",
          meal: "NoMeal-0",
          Fare: selectedFlight.fareQuote.Fare,
          Nationality: "IN",
          IsLeadPax: false,
        }),
        ...Array(Number(searchResult.infantCount)).fill({
          Title: "",
          FirstName: "",
          LastName: "",
          PaxType: 3,
          DateOfBirth: null,
          Gender: "",
          PassportNo: "",
          PassportExpiry: null,
          baggage: "0-0",
          meal: "NoMeal-0",
          Fare: selectedFlight.fareQuote.Fare,
          Nationality: "IN",
          IsLeadPax: false,
        }),
      ]);
  }, [searchResult, selectedFlight]);

  const handleChange = (e, ind) => {
    const t = [...passangersDetails];
    t[ind][e.target.name] = e.target.value;
    setPassangersDetails(t);
  };

  const handleSubmit = () => {
    setError(error);
    // const reqObject = {
    //   ResultIndex: selectedFlight.flightData.ResultIndex,
    //   TraceId: searchResult.Response.TraceId,
    //   passangers: passangersDetails,
    // };

    const reqObject = {
      ResultIndex: "OB2",
      TraceId: "ab7232c2-d496-4ebe-8719-deeec8ac09a2",
      passangers: [
        {
          Title: "Mr",
          FirstName: "sdsd",
          LastName: "sadsd",
          PaxType: 1,
          DateOfBirth: "2000-02-20T16:58:09.000Z",
          Gender: 1,
          PassportNo: "",
          PassportExpiry: null,
          baggage: "5-1900",
          meal: "NoMeal-0",
          AddressLine1: "dsfd",
          AddressLine2: "dfsd",
          Fare: {
            Currency: "INR",
            BaseFare: 2000,
            Tax: 510,
            TaxBreakup: [
              {
                key: "K3",
                value: 106,
              },
              {
                key: "YQTax",
                value: 0,
              },
              {
                key: "YR",
                value: 65,
              },
              {
                key: "PSF",
                value: 0,
              },
              {
                key: "UDF",
                value: 100,
              },
              {
                key: "INTax",
                value: 0,
              },
              {
                key: "TransactionFee",
                value: 0,
              },
              {
                key: "OtherTaxes",
                value: 189,
              },
            ],
            YQTax: 0,
            AdditionalTxnFeeOfrd: 0,
            AdditionalTxnFeePub: 0,
            PGCharge: 0,
            OtherCharges: 1.92,
            ChargeBU: [
              {
                key: "TBOMARKUP",
                value: 0,
              },
              {
                key: "GLOBALPROCUREMENTCHARGE",
                value: 0,
              },
              {
                key: "CONVENIENCECHARGE",
                value: 0,
              },
              {
                key: "OTHERCHARGE",
                value: 1,
              },
            ],
            Discount: 0,
            PublishedFare: 2511.92,
            CommissionEarned: 0,
            PLBEarned: 0,
            IncentiveEarned: 0,
            OfferedFare: 2511.92,
            TdsOnCommission: 0,
            TdsOnPLB: 0,
            TdsOnIncentive: 0,
            ServiceFee: 0,
            TotalBaggageCharges: 0,
            TotalMealCharges: 0,
            TotalSeatCharges: 0,
            TotalSpecialServiceCharges: 0,
          },
          City: "dsds",
          ContactNo: "9999999999",
          CountryCode: "IN",
          Nationality: "IN",
          Email: "dsds@d.nh",
          IsLeadPax: true,
          GSTCompanyAddress: "",
          GSTCompanyContactNumber: "",
          GSTCompanyName: "",
          GSTNumber: "",
          GSTCompanyEmail: "",
        },
      ],
    };
    const data = JSON.stringify(reqObject);

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/booking`,
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
            console.log(response?.data?.Response?.Results);
          } else if (response?.data?.Response?.Error) {
            setError(response?.data?.Response?.Error.ErrorMessage);
          } else {
            setError("Something went wrong");
          }
        } else {
          setError(JSON.parse(response.data).message);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      });
  };

  return (
    <>
      <MKBox display="flex" justifyContent="space-between">
        <MKBox sx={{ width: "60vw", mr: 4 }}>
          {passangersDetails.map((passanger, ind) => (
            <MKBox mb={2} px={1}>
              Passanger {ind + 1} ({passangerType[passanger.PaxType]})
              <DetailsForm
                error={error}
                index={ind}
                international={
                  searchResult.origin.split(",")[1] !== searchResult.destination.split(",")[1]
                }
                passangersDetails={passangersDetails}
                handleChange={handleChange}
                passanger={passanger}
                setPassangersDetails={setPassangersDetails}
                isMain={passanger.IsLeadPax}
              />
              {passanger.IsLeadPax ? (
                <>
                  <FormGroup px={1} row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={gstDetails}
                          onChange={() => setGstDetails(!gstDetails)}
                        />
                      }
                      label="GST Details"
                    />
                  </FormGroup>
                  {gstDetails ? (
                    <GSTForm index={ind} passanger={passanger} handleChange={handleChange} />
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {passanger.passangerType !== "infant" ? (
                <SSRDetails
                  index={ind}
                  handleChange={handleChange}
                  passanger={passanger}
                  ssr={selectedFlight.ssr}
                />
              ) : (
                <></>
              )}
            </MKBox>
          ))}
        </MKBox>
        <MKBox>
          <Paper>
            <FareQuote passangersDetails={passangersDetails} fareQuote={selectedFlight.fareQuote} />
          </Paper>
        </MKBox>
      </MKBox>
      <MKBox m={2}>
        <FareRule fareRule={selectedFlight.fareRule} />
      </MKBox>
      <MKBox m={4} display="flex" justifyContent="flex-end">
        <MKButton color="info" onClick={handleSubmit}>
          Proceed to Booking Review
        </MKButton>
      </MKBox>
    </>
  );
};

export default index;
