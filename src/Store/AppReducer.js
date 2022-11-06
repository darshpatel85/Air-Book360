const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true, userInfo: action.payload };
    case "ERROR":
      return {
        ...state,
        toastMsg: action.payload,
      };
    case "SET_FLIGHT_SEARCH":
      return {
        ...state,
        searchResult: action.payload,
      };
    case "SUCCESS":
      return {
        ...state,
        toastType: "success",
        toastMsg: action.payload,
      };
    case "RESET_TOAST":
      return {
        ...state,
        toastType: "error",
        toastMsg: "",
      };
    case "LOGOUT":
      return action.payload;
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SELECTED_FLIGHT":
      return {
        ...state,
        selectedFlight: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
