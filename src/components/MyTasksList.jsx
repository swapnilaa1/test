import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskStatus } from "../redux/getTaskStatusSlice";
import { getMyTasks, setSearchParams } from "../redux/myTasksSlice";
import { postGetTeams } from "../redux/postGetTeamsSlice";
import { postStatus } from "../redux/postStatusUpdateSlice";
import AddTask from "./Modal/AddTask";
import CompleteModal from "./Modal/CompleteModal";
import DeleteModal from "./Modal/DeleteModal";
import PartialModal from "./Modal/PartialModal";

const MyTasksList = () => {
  const [filterObject, setFilterObject] = useState({
    TaskStatus: "",
    Priority: "",
    FromDueDate: "",
    ToDueDate: "",
    IsArchive: false,
    From: "",
    To: "",
    SortByDueDate: "",
    Title: "",
  });

  const [userIds, setUserIds] = useState([]);
  const [listOpen, setListOpen] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [openPartialModal, setOpenPartialModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [completeConfig, setCompleteConfig] = useState({
    TaskId: 0,
    TaskStatusValue: 0,
  });
  const [partialConfig, setPartialConfig] = useState({
    TaskId: 0,
    TaskStatusValue: 0,
  });
  const [deleteConfig, setDeleteConfig] = useState({});

  const { localData, sendData } = useSelector((state) => state.mytasksReducer);
  // const {
  //   FromDueDate,
  //   ToDueDate,
  //   From,
  //   To,
  //   UserId,
  //   UserIds,
  //   Priority,
  //   TaskStatus,
  //   SortByDueDate,
  //   IsArchive,
  //   Title,
  // } = sendData;
  const { Message } = useSelector((state) => state.postStatusUpdateReducer);
  const { TeamMembers } = useSelector((state) => state.postTeamReducer);

  const dispatch = useDispatch();
  const callApi = () => {};

  console.log("teamMembers in component", TeamMembers);
  console.log("send Data ", sendData);
  useEffect(() => {
    dispatch(
      getMyTasks({
        From: 1,
        To: 50,
        Title: "",
        UserId: "",
        IsArchive: false,
        Priority: "",
        TaskStatus: "",
        FromDueDate: "",
        ToDueDate: "",
        SortByDueDate: "",
      })
    );

    dispatch(
      postGetTeams({
        from: 1,
        to: -1,
        text: "",
      })
    );
  }, []);
  useEffect(() => {
    dispatch(getMyTasks(sendData));
  }, [
    sendData.FromDueDate,
    sendData.ToDueDate,
    sendData.From,
    sendData.To,
    sendData.UserId,
    sendData.UserIds,
    sendData.Priority,
    sendData.TaskStatus,
    sendData.SortByDueDate,
    sendData.IsArchive,
    sendData.Title,
  ]);
  console.log("local Data", localData);
  console.log("message", Message);
  // useEffect(()=>{

  //   getMyTasks({
  //     From: 1,
  //     To: 50,
  //     Title: "",
  //     UserId: "",
  //     IsArchive: false,
  //     UserIds: [],
  //     Priority: "",
  //     TaskStatus: "",
  //     FromDueDate: "",
  //     ToDueDate: "",
  //     SortByDueDate: "",
  //   })

  // } ,[Message==="Success"])

  const handleComplete = (id) => {
    const obj = { TaskId: id, TaskStatusValue: 100 };
    setCompleteConfig(obj);
    console.log(openCompleteModal);
    setOpenCompleteModal(true);
  };

  const handleDelete = (id) => {};

  const handlePartial = (id, percentage) => {
    const obj = { TaskId: id, TaskStatusValue: percentage };
    setPartialConfig(obj);
    setOpenPartialModal(true);

    // dispatch(
    //   postStatus({
    //     TaskId: data.TaskId,
    //     TaskStatusValue: 80, // percentage
    //   })
    // )

    //dispatch(getTaskStatus());
  };
  console.log(" complteconfig ", completeConfig);
  const handleTeam = (Id) => {
    const index = userIds.indexOf(Id);
    if (index === -1) {
      setUserIds([...userIds, Id]);
    } else {
      let newAr = userIds.filter((user) => {
        //  console.log("user", user, element.UserId);
        return user !== Id;
      });
      setUserIds(newAr);
    }
  };
  console.log("filter object", filterObject, userIds);

  const handleSubmit = (e) => {
    let fromdate = "";
    let toduedate = "";
    e.preventDefault();
    const UserId = localStorage.getItem("userId");
    if (filterObject.FromDueDate !== "") {
      fromdate = handlefromDate(filterObject.FromDueDate);
    }
    if (filterObject.ToDueDate !== "") {
      toduedate = handlefromDate(filterObject.ToDueDate);
    }
    console.log("form submitted", fromdate, toduedate);
    dispatch(
      setSearchParams({
        filterObject,
        UserId: Number(UserId),
        userIds,
        FromDueDate: fromdate,
        ToDueDate: toduedate,
      })
    );
  };

  const handlefromDate = (date) => {
    const arr = date.split("-");
    const newStr = `${arr[1]}/${arr[2]}/${arr[0]}`;
    return newStr;
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <List>
          <ListItem divider>
            <ListItemButton onClick={() => setListOpen(true)}>
              <ListItemText primary={"Expand List"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Collapse in={listOpen}>
          <List SX={{ width: "500px", background: "grey" }}>
            <ListItem divider>
              <ListItemButton>
                <ListItemText>
                  <Paper sx={{ width: "500", height: "500" }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>By Status</Typography>
                          <TextField
                            value={filterObject.TaskStatus}
                            select
                            fullWidth
                            variant="standard"
                            label="Status"
                            onChange={(e) =>
                              setFilterObject({
                                ...filterObject,
                                TaskStatus: e.target.value,
                              })
                            }
                          >
                            <MenuItem value="0">Accepeted</MenuItem>
                            <MenuItem value="-1">Not Accepted</MenuItem>
                            <MenuItem value="-2">Partial Completed</MenuItem>
                            <MenuItem value="100">Completed</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>By Priority</Typography>
                          <TextField
                            value={filterObject.Priority}
                            select
                            fullWidth
                            variant="standard"
                            label="Status"
                            onChange={(e) =>
                              setFilterObject({
                                ...filterObject,
                                Priority: e.target.value,
                              })
                            }
                          >
                            <MenuItem value="High">High Priority</MenuItem>
                            <MenuItem value="Low">Low Priority</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>By Member</Typography>
                          <TextField select fullWidth variant="standard">
                            {TeamMembers.map((members) => (
                              <List>
                                <ListItem>
                                  <ListItemButton
                                    onClick={() => handleTeam(members.UserId)}
                                  >
                                    <ListItemText primary={members.UserName} />
                                    {/* <CheckBox checked={false} /> */}
                                    <Checkbox
                                      checked={userIds.includes(members.UserId)}
                                    />
                                  </ListItemButton>
                                </ListItem>
                              </List>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>From Date</Typography>
                          <TextField
                            type="date"
                            name="FromDueDate"
                            variant="standard"
                            value={filterObject.FromDueDate}
                            onChange={(e) =>
                              setFilterObject({
                                ...filterObject,
                                FromDueDate: e.target.value,
                              })
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>To Date</Typography>
                          <TextField
                            type="date"
                            name="ToDueDate"
                            variant="standard"
                            value={filterObject.ToDueDate}
                            onChange={(e) =>
                              setFilterObject({
                                ...filterObject,
                                ToDueDate: e.target.value,
                              })
                            }
                          />
                        </Grid>
                      </Grid>
                      <button type="submit">Click Me</button>
                    </form>
                  </Paper>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
        <input />
        <button onClick={() => setOpenDialogue(true)}>Add Task</button>
        <button>Export</button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Assigned By</TableCell>
              <TableCell>Assigned Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localData?.map((data, index) => (
              <TableRow>
                <TableCell>{data.Title}</TableCell>
                <TableCell>{data.LeadName}</TableCell>
                <TableCell>{data.AssignedByUserName}</TableCell>
                <TableCell>{data.CreateDate}</TableCell>
                <TableCell>{data.TaskEndDate}</TableCell>
                <TableCell>{data.Priority}</TableCell>
                <TableCell>{data.Priority}</TableCell>
                <TableCell>
                  {data.TaskStatus > 0 && data.TaskStatus < 100
                    ? `Partial Complete (${data.TaskStatus}%)`
                    : data.TaskStatus === 0
                    ? "Accepted"
                    : data.TaskStatus === -1
                    ? "Not Accepted"
                    : data.TaskStatus === 100
                    ? "Completed"
                    : ""}
                </TableCell>
                <TableCell>
                  <button>Archieve</button>
                </TableCell>
                <TableCell>
                  {data.TaskStatus === -1 && (
                    <button
                      onClick={() =>
                        dispatch(
                          postStatus({
                            TaskId: data.TaskId,
                            TaskStatusValue: 0,
                          })
                        )
                      }
                    >
                      Accept
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <button>Coverage</button>
                </TableCell>
                <TableCell>
                  <button onClick={() => setOpenDeleteModal(true)}>
                    Delete
                  </button>
                </TableCell>
                <TableCell>
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <button onClick={() => handleComplete(data.TaskId)}>
                      complete
                    </button>
                  )}
                </TableCell>

                <TableCell>
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <button
                      onClick={() =>
                        handlePartial(data.TaskId, data.CompletionPercentage)
                      }
                    >
                      Partial Complete
                    </button>
                  )}
                </TableCell>

                <TableCell>
                  <button onClick={() => handlePartial(data.TaskId)}>
                    Partial Send
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTask open={openDialogue} setOpen={(data) => setOpenDialogue(data)} />
      <DeleteModal
        open={openDeleteModal}
        setOpen={(data) => setOpenDeleteModal(data)}
      />
      {openPartialModal && (
        <PartialModal
          config={partialConfig}
          open={openPartialModal}
          setOpen={(data) => setOpenPartialModal(data)}
        />
      )}

      {openCompleteModal && (
        <CompleteModal
          config={completeConfig}
          open={openCompleteModal}
          setOpen={(data) => setOpenCompleteModal(data)}
        />
      )}
    </div>
  );
};

export default MyTasksList;
