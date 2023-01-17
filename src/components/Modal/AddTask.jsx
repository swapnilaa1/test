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
import React, { useState } from "react";

const AddTask = ({ open, setOpen }) => {
  const [value, setValue] = useState("1");

  const handleChange = (e, nextValue) => {
    setValue(nextValue);
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
              <TabPanel value="1">Hello others</TabPanel>
              <TabPanel value="2">Hello me</TabPanel>
            </TabContext>
          </Box>
          adfh lsh lfsdf sdf sldhfls dfhs dfhsld flsd flshdl fsf dsf sdfsldfsl
          dflsdl fhsldhf lsdhfl sfhls dfsd fsldf lsdhflsf s;df; sdjfs dfjsd;
          fj;sdf sdjf; sjd;f s;s a;dj;dja sdfjs; fjs asjh;asjd sd a;sd; a;sdja;s
          da;sd asdj ;asdja;sjd;sa das d;as d; a'd aksd asd' skd' sdk'skd asdk'a
          sd'sd asd ads'ad sas'd asdk as s dka' dk d'ak a'sd'kas d'as '' adfh
          lsh lfsdf sdf sldhfls dfhs dfhsld flsd flshdl fsf dsf sdfsldfsl dflsdl
          fhsldhf lsdhfl sfhls dfsd fsldf lsdhflsf s;df; sdjfs dfjsd; fj;sdf
          sdjf; sjd;f s;s a;dj;dja sdfjs; fjs asjh;asjd sd a;sd; a;sdja;s da;sd
          asdj ;asdja;sjd;sa das d;as d; a'd aksd asd' skd' sdk'skd asdk'a sd'sd
          asd ads'ad sas'd asdk as s dka' dk d'ak a'sd'kas d'as '
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
