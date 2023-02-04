import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import AssignOthers from "./AssignOthers";
import AssignToOthers from "./AssignToOthers";

const AddTask = ({ open, setOpen }) => {
  const [formObj, setFormObj] = useState({});
  const buttonRef = useRef();
  const [value, setValue] = useState("1");

  const handleChange = (e, nextValue) => {
    setValue(nextValue);
  };

  const submitForm = (data) => {
    console.log("data in submit form", data);
    setFormObj();
    //buttonRef.current.handleSubmit1;
    console.log("data in submit form", data);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  textColor="black"
                  indicatorColor="primary"
                >
                  <Tab label="Assigned to Others" value="1" />
                  <Tab label="Assigned to Me" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {/* <AssignOthers
                  setOpen={(data) => setOpen(data)}
                  submitForm={(data) => submitForm(data)}
                  ref={buttonRef}
                /> */}
                <AssignToOthers
                  setOpen={(data) => setOpen(data)}
                  submitForm={(data) => submitForm(data)}
                />
              </TabPanel>
              <TabPanel value="2">Hello me</TabPanel>
            </TabContext>
          </Box>
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained">Add</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default AddTask;
