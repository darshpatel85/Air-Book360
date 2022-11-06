/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "Store/GlobalState";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const { setError, setSuccess, userInfo } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleSubmit = () => {
    if (password === "") {
      setError("Enter Password");
    } else if (password !== cpassword) {
      setError("Password not match");
    } else {
      const data = JSON.stringify({
        email: userInfo.email,
        oldPassword,
        newPassword: password,
      });

      const config = {
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/auth/change-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        data,
      };
      axios(config)
        .then((response) => {
          if (response.status === 200) {
            setSuccess(response.data);
            navigate("/profile");
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
        });
    }
  };
  return (
    <>
      <MKBox
        px={1}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        width="100%"
        height="100vh"
        mx="auto"
        position="fixed"
        zIndex={2}
      >
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Change Password
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      label="Old Password"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label="New Password"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      value={cpassword}
                      onChange={(e) => setCpassword(e.target.value)}
                      label="Confirm Password"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                      Change Password
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default ChangePassword;
