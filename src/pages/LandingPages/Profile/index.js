import { Card } from "@mui/material";
import MKBox from "components/MKBox";
import React from "react";
import ProfilePage from "./Profile";

const Profile = () => (
  <>
    <MKBox bgColor="grey">
      <MKBox
        minHeight="100vh"
        width="100%"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
        display="fixed"
      >
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <ProfilePage />
        </Card>
      </MKBox>
    </MKBox>
  </>
);

export default Profile;
