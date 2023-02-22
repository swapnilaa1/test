import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/postStatusUpdateSlice";
import { sendDate, sendDisplayDate } from "../../utility";
import AssignOthers from "./AssignOthers";
import "./modal.css";
import SaveIcon from "@mui/icons-material/Save";

const AddTask = ({ open, setOpen, refresh }) => {
  const { isLoading } = useSelector((state) => state.postStatusUpdateReducer);
  const [error, setError] = useState({
    TaskOwners: "",
  });

  const [submitObj, setSubmitObj] = useState({
    Id: "",
    AssignedToUserId: "",
    AssignedDate: "",
    CompletedDate: "",
    IntercomGroupIds: [],
    IsActive: true,
    Latitude: "",
    Location: "",
    Longitude: "",
    TaskStatus: "",
  });

  const submit = {
    Id: "",
    AssignedToUserId: "",
    AssignedDate: "",
    CompletedDate: "",
    IntercomGroupIds: [],
    IsActive: true,
    Latitude: "",
    Location: "",
    Longitude: "",
    TaskStatus: "",
  };

  const dispatch = useDispatch();
  const formRef = useRef();

  const [formObj, setFormObj] = useState({});
  const buttonRef = useRef();
  const [value, setValue] = useState("1");

  const handleChange = (e, nextValue) => {
    setValue(nextValue);
  };

  const handle = () => {
    formRef.current.submitForm();
  };

  const handleSubmit = async (
    values,
    MediaObject,
    users1,
    usersObj,
    valuelen
  ) => {
    const TaskEndDate = sendDate(values.TaskEndDate, "TaskEndDate");
    const TaskEndDateDisplay = sendDisplayDate(
      values.TaskEndDate,
      "TaskEndDateDisplay"
    );

    let obj = submitObj;

    obj.Priority = values.Priority;
    obj.Description = values.Description;
    obj.Title = values.Title;
    obj.TaskDisplayOwners = valuelen;
    obj.TaskOwners = usersObj;
    obj.TaskEndDate = TaskEndDate;
    obj.TaskEndDateDisplay = TaskEndDateDisplay;
    obj.Image = MediaObject.MultimediaData;
    obj.MultimediaData = MediaObject.MultimediaData;
    obj.MultimediaExtension = MediaObject.MultimediaExtension;
    obj.MultimediaFileName = MediaObject.MultimediaFileName;
    obj.MultimediaType = MediaObject.MultimediaType;
    obj.AssignedBy = Number(localStorage.getItem("userId"));
    obj.UserIds = [obj.AssignedBy];
    obj.LeadId = values.LeadId;

    const response = await dispatch(addTask({ data: obj }));
    if (response.error === undefined) {
      refresh();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    setError({ TaskOwners: "" });

    return () => {
      setError({ TaskOwners: "" });
    };
  }, []);

  return (
    <div className="add-main">
      <Dialog open={open}>
        <DialogTitle
          className="d-title"
          style={{ fontSize: "15px", fontWeight: "400" }}
        >
          Add Task
        </DialogTitle>
        <DialogContent
          className="add-d-content"
          dividers
          style={{ height: "510px", minWidth: "600px" }}
        >
          <DialogContentText>
            <Box>
              <TabContext value={value}>
                <Box
                  className="add-d-box"
                  sx={{ borderColor: "divider", borderBottom: 1, height: 22 }}
                >
                  <TabList
                    className="add-t-list"
                    style={{
                      position: "absolute",
                      top: "45px",
                      left: "14px",
                      height: "50px",
                      width: "",
                    }}
                    onChange={handleChange}
                    textColor="black"
                    indicatorColor="primary"
                  >
                    <Tab
                      className="add-tab-1"
                      label="Assigned to Others"
                      value="1"
                    />
                    <Tab
                      className="add-tab-2"
                      label="Assigned to Me"
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <AssignOthers
                    error={error}
                    setOpen={(data) => setOpen(data)}
                    handleSubmit={(values, MediaObject, a, b, c) =>
                      handleSubmit(values, MediaObject, a, b, c)
                    }
                    ref={formRef}
                  />
                </TabPanel>
                <TabPanel value="2">{"Some Text Here"}</TabPanel>
              </TabContext>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{ height: 27, fontSize: 13, padding: 1 }}
          >
            Cancel
          </Button>
          <LoadingButton
            size="small"
            onClick={() => handle()}
            loading={isLoading}
            variant="contained"
            color="primary"
            type="submit"
            loadingPosition="end"
            sx={{ height: 27, fontSize: 13, padding: 1 }}
            endIcon={isLoading ? <SaveIcon /> : ""}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTask;
