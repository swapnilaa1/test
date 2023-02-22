import React, { useEffect, useId, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { postStatus } from "../../redux/postStatusUpdateSlice";
import { getTaskStatus } from "../../redux/getTaskStatusSlice";
import "../../style/pages.css"
import "./modal.css";
const PartialModal = ({ config, open, setOpen }) => {
  const {isPostLoading} =useSelector(state=>state.postStatusUpdateReducer);

  const [transferConfig, setTransferConfig] = useState(config);
  const [selectedConfig, setSelectedConfig] = useState(config);
  
  const id = useId();
  const { statusMaster  , isTaskStatusLoading} = useSelector((state) => state.getTaskStatusReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskStatus());
    setTransferConfig(config);
  }, []);

  const handleClick = (data) => {
    const configToTransfer = { TaskId: config.TaskId, TaskStatusValue: data };
    setTransferConfig(configToTransfer);
  };

  const getClasses=(value)=>{
    return transferConfig.TaskStatusValue==value?"internal int-border":"internal"

  }

  const handle2 = () => {
  };
  return (
    <Dialog open={open}>
      { isPostLoading && <div> <LinearProgress /></div>}
      <DialogTitle><h6 className="modalTitle">Partial Complete</h6></DialogTitle>
      <DialogContent dividers>
      { isTaskStatusLoading ?<div className="circular-par" ><CircularProgress color="primary"/></div>  : <DialogContentText>
          <div className="partial">
            {statusMaster.map((data) => (
              <div
              className={getClasses(data.Value)}
                id={id}
                key={data.id}
              
                onClick={() => handleClick(data.Value)}
              >
                {`${data.Value}%`}
              </div>
            ))}{" "}
          </div>
        </DialogContentText>}
        
      </DialogContent>
      <DialogActions>
        
        <Button className="cancelb" variant="text" onClick={() => setOpen(false)} size="small">
          Cancel
        </Button>

        <Button
          className="doneb"
          color="primary"
          variant="contained"
          size="small"
          onClick={() => dispatch(postStatus({data:transferConfig , fun:()=>setOpen()}))}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartialModal;
