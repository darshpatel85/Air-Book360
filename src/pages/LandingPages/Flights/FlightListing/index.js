/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import axios from "axios";
import LoaderScreen from "components/LoaderScreen";
import React, { useContext, useState } from "react";
import { GlobalContext } from "Store/GlobalState";
import OneWayList from "./OneWayList";
import ReturnList from "./ReturnList";

const Flights = ({ setPage }) => {
  const { searchResult, userInfo, logout, setError, setSelectedFlight } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const getSSR = (resultIndex, traceId, isLcc) =>
    new Promise((resolve, reject) => {
      const config = {
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/flights/ssr/${resultIndex}?trace-id=${traceId}&isLcc=${isLcc}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios(config)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.Response.Error.ErrorCode === 0)
              return resolve(response.data.Response);
            return reject(setError(response.data.Response.Error.ErrorMessage));
          }
          return reject(setError(JSON.parse(response.data).message));
        })
        .catch((error) => {
          if (error?.response?.data?.status === 401) {
            logout();
          } else if (error?.response?.data?.message) {
            reject(setError(error.response.data.message));
          } else if (error.message) {
            reject(setError(error.message));
          } else {
            reject(setError("Something went wrong"));
          }
        });
    });
  const getFareRule = (resultIndex, traceId) =>
    new Promise((resolve, reject) => {
      const config = {
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/flights/fare-rule/${resultIndex}?trace-id=${traceId}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios(config)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.Response.Error.ErrorCode === 0)
              return resolve(response.data.Response.FareRules);
            return reject(setError(response.data.Response.Error.ErrorMessage));
          }
          return reject(setError(JSON.parse(response.data).message));
        })
        .catch((error) => {
          if (error?.response?.data?.status === 401) {
            logout();
          } else if (error?.response?.data?.message) {
            reject(setError(error.response.data.message));
          } else if (error.message) {
            reject(setError(error.message));
          } else {
            reject(setError("Something went wrong"));
          }
        });
    });

  const getFareQuote = (resultIndex, traceId) =>
    new Promise((resolve, reject) => {
      const config = {
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/flights/fare-quote/${resultIndex}?trace-id=${traceId}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios(config)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.Response.Error.ErrorCode === 0)
              return resolve(response.data.Response.Results);
            return reject(setError(response.data.Response.Error.ErrorMessage));
          }
          return reject(setError(JSON.parse(response.data).message));
        })
        .catch((error) => {
          if (error?.response?.data?.status === 401) {
            logout();
          } else if (error?.response?.data?.message) {
            reject(setError(error.response.data.message));
          } else if (error.message) {
            reject(setError(error.message));
          } else {
            reject(setError("Something went wrong"));
          }
        });
    });

  const handleBook = async (searchedFlight) => {
    setIsLoading(true);
    const { TraceId } = searchResult.Response;
    const { ResultIndex, IsLCC } = searchedFlight;
    try {
      const fareQuote = await getFareQuote(ResultIndex, TraceId);
      const fareRule = await getFareRule(ResultIndex, TraceId);
      const ssr = await getSSR(ResultIndex, TraceId, IsLCC);
      setSelectedFlight({
        flightData: searchedFlight,
        ssr,
        fareRule,
        fareQuote,
      });
      setPage(2);
    } catch (error) {
      setError("Please try again");
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <LoaderScreen /> : <></>}
      {searchResult.Response.Results.length === 1 ? (
        <OneWayList searchResult={searchResult} handleBook={handleBook} />
      ) : searchResult.Response.Results.length === 2 ? (
        <ReturnList searchResult={searchResult} handleBook={handleBook} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Flights;
