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
const PartialModal = ({ config, open, setOpen }) => {
  const [transferConfig, setTransferConfig] = useState(config);
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
    dispatch(postStatus(configToTransfer));
  };
  console.log("config", config);
  console.log("transfer config ", transferConfig);

  const handle2 = () => {
    console.log("transfer", transferConfig);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Partial Complete</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <Box>
            {statusMaster.map((data) => (
              <div
                id={id}
                key={data.id}
                style={{ height: "50px", width: "50px" }}
                onClick={() => handleClick(data.Value)}
              >
                {data.Value}
              </div>
            ))}{" "}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => dispatch(postStatus(transferConfig))}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartialModal;
