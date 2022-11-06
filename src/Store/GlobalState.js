/* eslint-disable react/prop-types */
import Reducer from "./AppReducer";

const { createContext, useReducer, useEffect } = require("react");

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  toastMsg: "",
  toastType: "error",
  searchResult: null,
  selectedFlight: null,
  page: 0,
};

export const GlobalContext = createContext(initialState);
const Store = ({ children }) => {
  const currentState = localStorage.getItem("context")
    ? JSON.parse(localStorage.getItem("context"))
    : initialState;
  const [state, dispatch] = useReducer(Reducer, currentState);

  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(state));
  }, [state]);
  const resetToast = () => {
    dispatch({
      type: "RESET_TOAST",
    });
  };

  // global method to set the error
  const setError = (text) => {
    dispatch({
      type: "ERROR",
      payload: text,
    });
  };
  // global method to set the Success Message
  const setSuccess = (text) => {
    dispatch({
      type: "SUCCESS",
      payload: text,
    });
  };
  const login = (data) => {
    dispatch({ type: "LOGIN", payload: data });
  };
  const logout = () => {
    dispatch({ type: "LOGOUT", payload: initialState });
  };
  const setPage = (data) => {
    dispatch({
      type: "SET_PAGE",
      payload: data,
    });
  };
  const setFlightSearch = (data) => {
    dispatch({ type: "SET_FLIGHT_SEARCH", payload: data });
  };
  const setSelectedFlight = (data) => {
    dispatch({
      type: "SET_SELECTED_FLIGHT",
      payload: data,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
        toastMsg: state.toastMsg,
        toastType: state.toastType,
        searchResult: state.searchResult,
        selectedFlight: state.selectedFlight,
        page: state.page,
        login,
        logout,
        setFlightSearch,
        resetToast,
        setSuccess,
        setError,
        setPage,
        setSelectedFlight,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Store;
