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
  Typography,
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
      <DialogTitle><h6 className="complteTitle">COMPLETE TASK</h6></DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
        <div className="completeModal">Are you sure this Task is complete?</div>  
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} size="small" variant="text">
        <Typography sx={{fontSize:14 , textTransform:"capitalize" , color:"black"}}>Cancel</Typography>
        </Button>
        <Button
          size="small"
          variant="text"
          onClick={() => dispatch(postStatus({data:config , fun:()=>setOpen()}))}
        sx={{m:1 , mr:3}}
        >
        <Typography sx={{fontSize:14 , textTransform:"capitalize"}}>Yes</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteModal;
