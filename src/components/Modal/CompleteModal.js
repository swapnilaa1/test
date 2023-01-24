import React, { useEffect, useImperativeHandle } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { postStatus } from "../../redux/postStatusUpdateSlice";
import { getMyTasks } from "../../redux/myTasksSlice";

const CompleteModal = ({ config, open, setOpen }) => {
  // useImperativeHandle(ref, () => {
  //   return {
  //     press: () => {
  //       setOpen(false);
  //     },
  //   };
  // });
  const dispatch = useDispatch();
  const { Message } = useSelector((state) => state.postStatusUpdateReducer);
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
          ref={ref}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteModal;
