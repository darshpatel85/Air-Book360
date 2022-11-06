/* eslint-disable react/prop-types */
import { AccountCircle } from "@mui/icons-material";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "Store/GlobalState";
import MKBox from "./MKBox";
import MKButton from "./MKButton";
import MKTypography from "./MKTypography";
import Toast from "./Toast";

const AppNavBar = () => {
  const { isLoggedIn, toastMsg, logout, setSelectedFlight, setSearchResult, setPage } =
    useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    logout();
    handleClose();
    navigate("/login");
  };
  return (
    <>
      <AppBar color="inherit" enableColorOnDark position="sticky">
        <Toolbar>
          <MKTypography variant="h6" component="div" sx={{ flexGrow: 0, mr: 5 }}>
            Skyago
          </MKTypography>

          {isLoggedIn && (
            <>
              <MKBox sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <MKButton
                  color="info"
                  onClick={() => {
                    navigate("/flights");
                    setPage(0);
                    setSelectedFlight(null);
                    setSearchResult(null);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  New Search
                </MKButton>
              </MKBox>
              <MKBox display="flex" sx={{ alignItems: "center" }}>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </Menu>
                </div>
              </MKBox>
            </>
          )}
        </Toolbar>
      </AppBar>
      {toastMsg === "" ? <></> : <Toast />}
    </>
  );
};

export default AppNavBar;
