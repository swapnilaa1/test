import React, { useEffect, useImperativeHandle } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Tab,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { postStatus } from "../../redux/postStatusUpdateSlice";
import { getMyTasks } from "../../redux/myTasksSlice";

const CompleteModal = ({
  config,
  open,
  setOpen,
  heading,
  MessageDisplay,
  dispatchFun,
  buttonName,
}) => {
 
  const {isPostLoading} =useSelector(state=>state.postStatusUpdateReducer);
  const {isDeleting}=useSelector(state=>state.deleteTaskReducer)
  const dispatch = useDispatch();
  const { Message } = useSelector((state) => state.postStatusUpdateReducer);

  return (
    <Dialog open={open}>
     {(isDeleting || isPostLoading )&& <div> <LinearProgress /></div>}  
      <DialogTitle>
        <h6 className="complteTitle">{heading}</h6>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <div className="completeModal">{MessageDisplay}</div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} size="small" variant="text"    sx={{height:27 ,fontSize:13 ,padding:1}}>
          <Typography
            sx={{ fontSize: 14, textTransform: "capitalize", color: "black" }}
          >
            Cancel
          </Typography>
        </Button>
        <Button
          size="small"
          variant="text"
          color="primary"
          onClick={() => dispatchFun({ data: config, fun: () => setOpen() })}
          sx={{height:27 ,fontSize:13 ,padding:1 ,m:1 , mr:3}}
        >
          <Typography sx={{ fontSize: 14, textTransform: "capitalize" }}>
            {buttonName}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteModal;
