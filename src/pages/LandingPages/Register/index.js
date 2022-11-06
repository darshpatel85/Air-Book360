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
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "Store/GlobalState";

function Register() {
  const { setError, setSuccess, logout } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    referenceUserName: "",
    role: "",
  });
  const [userInfoError, setUserInfoError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    phone: false,
    referenceUserName: false,
    role: false,
  });
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = userInfoError;

    Object.keys(userInfo).forEach((i) => {
      temp[i] = i !== "referenceUserName" && userInfo[i] === "";
    });

    if (Object.values(temp).every((item) => !item)) {
      let data = { ...userInfo };
      if (data.referenceUserName === "") {
        data.referenceUserName = "AD-admin";
      }
      data = JSON.stringify(data);

      const config = {
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      };

      axios(config)
        .then((response) => {
          if (response.status === 201) {
            setSuccess("Registration successfull! please verify Email to Login");
            navigate("/login");
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
    setUserInfoError({ ...temp });
  };
  return (
    <>
      <MKBox
        px={1}
        sx={{
          backgroundColor: "grey",
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
                  Sign up
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      name="email"
                      value={userInfo.email}
                      error={userInfoError.email}
                      onChange={handleChange}
                      label="Email"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      name="password"
                      value={userInfo.password}
                      error={userInfoError.password}
                      onChange={handleChange}
                      label="Password"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox display="flex" justifyContent="space-between" mb={2}>
                    <Grid item xs={5.5}>
                      <MKInput
                        type="text"
                        name="firstName"
                        error={userInfoError.firstName}
                        value={userInfo.firstName}
                        onChange={handleChange}
                        label="First Name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5.5}>
                      <MKInput
                        name="lastName"
                        error={userInfoError.lastName}
                        value={userInfo.lastName}
                        onChange={handleChange}
                        type="text"
                        label="Last Name"
                        fullWidth
                      />
                    </Grid>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="tel"
                      name="phone"
                      error={userInfoError.phone}
                      value={userInfo.phone}
                      onChange={handleChange}
                      label="Phone"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Role</InputLabel>
                      <Select
                        sx={{ height: 45 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Role"
                        name="role"
                        error={userInfoError.role}
                        value={userInfo.role}
                        onChange={handleChange}
                      >
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="SUB_ADMIN">SUB_ADMIN</MenuItem>
                        <MenuItem value="MS_DISTRIBUTOR">MS_DISTRIBUTOR</MenuItem>
                        <MenuItem value="DISTRIBUTOR">DISTRIBUTOR</MenuItem>
                        <MenuItem value="RETAILER">RETAILER</MenuItem>
                      </Select>
                    </FormControl>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      name="referenceUserName"
                      value={userInfo.referenceUserName}
                      onChange={handleChange}
                      label="Reference UserName(optional)"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" type="submit" color="info" fullWidth>
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/login"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign in
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </form>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Register;
