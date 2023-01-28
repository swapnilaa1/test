import React, { useEffect, useId, useState } from "react";
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
import { getTaskStatus } from "../../redux/getTaskStatusSlice";
import "../../style/pages.css"
const PartialModal = ({ config, open, setOpen }) => {
  const [transferConfig, setTransferConfig] = useState(config);
  const [selectedConfig, setSelectedConfig] = useState(config);
  
  const id = useId();
  const { statusMaster } = useSelector((state) => state.getTaskStatusReducer);
  const dispatch = useDispatch();
  console.log("status master", statusMaster);
  useEffect(() => {
    console.log("connfig in useEffect", config);
    dispatch(getTaskStatus());
    setTransferConfig(config);
  }, []);

  const handleClick = (data) => {
    const configToTransfer = { TaskId: config.TaskId, TaskStatusValue: data };
    console.log("config to transfer in ");
    setTransferConfig(configToTransfer);
    //dispatch(postStatus(configToTransfer));
  };

  const getClasses=(value)=>{
   //let classes="internal"
    return transferConfig.TaskStatusValue==value?"internal int-border":"internal"

  }
  console.log("config", config);
  console.log("transfer config ", transferConfig);

  const handle2 = () => {
    console.log("transfer", transferConfig);
  };
  return (
    <Dialog open={open}>
      <DialogTitle><h6 className="modalTitle">Partial Complete</h6></DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        
        <Button variant="text" onClick={() => setOpen(false)} size="small">
          Cancel
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={() => dispatch(postStatus({data:transferConfig , fun:()=>setOpen()}))}
          sx={{mr:3}}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartialModal;
