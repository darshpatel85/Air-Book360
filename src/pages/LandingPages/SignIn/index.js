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

// Images
import { GlobalContext } from "Store/GlobalState";
import { useContext, useState } from "react";
import axios from "axios";

function SignInBasic() {
  // const [rememberMe, setRememberMe] = useState(false);
  const { login, setError } = useContext(GlobalContext);
  const navigate = useNavigate();
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify(userInfo);

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          userInfo.token = response.data.token;
          userInfo.username = response.data.username;
          login(userInfo);
          navigate("/flights");
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
      });
    setError(process.env);
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
                  Sign in
                </MKTypography>
              </MKBox>
              <form onSubmit={(e) => handleSubmit(e)}>
                <MKBox pt={4} pb={3} px={3}>
                  <MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="email"
                        onChange={handleChange}
                        value={userInfo.email}
                        name="email"
                        label="Email"
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="password"
                        onChange={handleChange}
                        value={userInfo.password}
                        name="password"
                        label="Password"
                        fullWidth
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKTypography
                        component={Link}
                        to="/forgot-password"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Forgot Password?
                      </MKTypography>
                    </MKBox>
                    <MKBox mt={4} mb={1}>
                      <MKButton type="submit" variant="gradient" color="info" fullWidth>
                        sign in
                      </MKButton>
                    </MKBox>
                    <MKBox mt={3} mb={1} textAlign="center">
                      <MKTypography variant="button" color="text">
                        Don&apos;t have an account?{" "}
                        <MKTypography
                          component={Link}
                          to="/register"
                          variant="button"
                          color="info"
                          fontWeight="medium"
                          textGradient
                        >
                          Sign up
                        </MKTypography>
                      </MKTypography>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </form>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;
