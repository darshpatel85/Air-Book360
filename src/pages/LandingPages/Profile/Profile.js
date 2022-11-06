/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { CheckCircle } from "@mui/icons-material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "Store/GlobalState";

// Images

function ProfilePage() {
  const { setError, logout } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enabled: false,
    isVerified: false,
    referenceUserName: "",
    role: "",
  });
  const { userInfo } = useContext(GlobalContext);
  useEffect(() => {
    const config = {
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/user`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data);
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
  }, []);

  return (
    <MKBox component="section" py={{ xs: 2, sm: 4 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <Grid container justifyContent="center">
            <Grid item xs={12} md={12} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox alignItems="center" mb={1}>
                <MKTypography variant="h3" sx={{ whiteSpace: "nowrap" }} component="div">
                  {userData.firstName} {userData.lastName}
                </MKTypography>
                <MKTypography color="mute" variant="h6">
                  @{userData.username}
                </MKTypography>
              </MKBox>
              <Grid spacing={3} mb={3}>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Email :
                  </MKTypography>
                  <MKTypography
                    component="span"
                    sx={{ alignItems: "center" }}
                    variant="body2"
                    color="text"
                  >
                    {userData.email}
                    {"   "}
                    {userData.isVerified ? <CheckCircle /> : <></>}
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    Phone Number :
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    {userData.phone}
                  </MKTypography>
                </Grid>
              </Grid>
              <MKButton onClick={() => navigate("/change-password")} color="info">
                Change Password
              </MKButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default ProfilePage;
