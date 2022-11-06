/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import * as React from "react";
import PropTypes from "prop-types";
import MKBox from "./MKBox";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <MKBox sx={{ p: 3 }}>{children}</MKBox>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;
