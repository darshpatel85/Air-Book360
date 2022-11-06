/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import SignInPage from "layouts/pages/authentication/sign-in";
import Store, { GlobalContext } from "Store/GlobalState";
import SignUpPage from "layouts/pages/authentication/sign-up";
import ForgotPassword from "layouts/pages/authentication/forgot-password";
import ResetPassword from "layouts/pages/authentication/reset-password";
import ChangePassword from "layouts/pages/authentication/change-password";

import FlightSearch from "layouts/pages/flight-search";
import AppNavBar from "components/AppNavBar";
import MKBox from "components/MKBox";
import Profile from "pages/LandingPages/Profile";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(GlobalContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function NoAuthRoute({ children }) {
  const { isLoggedIn } = useContext(GlobalContext);
  return !isLoggedIn ? children : <Navigate to="/flights" />;
}

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <Store>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MKBox width="100%">
          <AppNavBar />
          <MKBox
            width="100%"
            height="auto"
            sx={{
              backgroundColor: "grey",
            }}
          >
            <Routes>
              <Route
                path="/login"
                element={
                  <NoAuthRoute>
                    <SignInPage />
                  </NoAuthRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <NoAuthRoute>
                    <SignUpPage />
                  </NoAuthRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <NoAuthRoute>
                    <ForgotPassword />
                  </NoAuthRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <NoAuthRoute>
                    <ResetPassword />
                  </NoAuthRoute>
                }
              />

              <Route
                path="/flights"
                element={
                  <PrivateRoute>
                    <FlightSearch />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <PrivateRoute>
                    <ChangePassword />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </MKBox>
        </MKBox>
      </ThemeProvider>
    </Store>
  );
}
