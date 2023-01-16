//import { TabsContext } from "@mui/base";
//import { Box } from "@mui/system";
//import { Box , Tab } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";

import React, { useState } from "react";
import MyTasksList from "./MyTasksList";
import SignIn from "./SignIn";
//import { TabContext, TabPanel } from "@mui/lab";

const Mytask = () => {
  const [value, setValue] = useState("1");
  const handleChange = (e, newValue) => {
    console.log("e");
    setValue(newValue);
  };
  console.log("value", value);
  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
          >
            <Tab label="My Task" value="1" />
            <Tab label="CC" value="2" />
            <Tab label="Assigned By Me" value="3" />
            <Tab label="Archive List" value="4" />
            <Tab label="Calendar View" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MyTasksList />
        </TabPanel>
        <TabPanel value="2">
          <SignIn />
        </TabPanel>
        <TabPanel value="3">panel three</TabPanel>
        <TabPanel value="4">panel four</TabPanel>
        <TabPanel value="5">panel five</TabPanel>
      </TabContext>
    </Box>
  );
};

export default Mytask;
