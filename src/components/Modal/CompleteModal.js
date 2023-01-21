import React from "react";
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
import { useDispatch } from "react-redux";
import { postStatus } from "../../redux/postStatusUpdateSlice";

const CompleteModal = ({ config, open, setOpen }) => {
  const dispatch = useDispatch();
  console.log("open ", config);
  return (
    <Dialog open={open}>
      <DialogTitle>Complete Task</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <Box>Are You Sure You Have Complted The Task</Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(postStatus(config))}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteModal;
