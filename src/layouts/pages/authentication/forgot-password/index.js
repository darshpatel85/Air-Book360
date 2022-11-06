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
import { useContext, useState } from "react";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { GlobalContext } from "Store/GlobalState";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { setError, setSuccess } = useContext(GlobalContext);
  const handleSubmit = () => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/auth/forget-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ email }),
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(JSON.parse(response.data));
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
                  Forgot Password
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" onClick={handleSubmit} color="info" fullWidth>
                      Reset Password
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

export default ForgotPassword;
