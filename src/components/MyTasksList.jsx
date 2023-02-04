import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { getMonth } from "date-fns";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskStatus } from "../redux/getTaskStatusSlice";
import {
  getMyTasks,
  setDifference,
  setEndFromAndTo,
  setFromAndTo,
  setSearchParams,
  setSortData,
  setStartFromAndTo,
} from "../redux/myTasksSlice";
import { postGetTeams } from "../redux/postGetTeamsSlice";
import { postStatus } from "../redux/postStatusUpdateSlice";
import AddTask from "./Modal/AddTask";
import CompleteModal from "./Modal/CompleteModal";

import PartialModal from "./Modal/PartialModal";
import "../style/pages.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { deleteTask } from "../redux/deletetaskSlice";

const MyTasksList = () => {
  const [createDateOrder, setCreateDateOrder] = useState("1");
  const [dueDateOrder, setDueDateOrder] = useState("1");
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
  const [deleteConfig, setDeleteConfig] = useState({
    TaskId: 0,
  });

  const { localData, count, sendData, difference, toToDisplay } = useSelector(
    (state) => state.mytasksReducer
  );
  // const {toToDisplay
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
  const setOpen = () => {
    setOpenCompleteModal(false);
  };
  //console.log("teamMembers in component", TeamMembers);
  //console.log("send Data ", sendData);
  // useEffect(() => {
  //   dispatch(
  //     getMyTasks({
  //       From: 1,
  //       To: 50,
  //       Title: "",
  //       UserId: "",
  //       IsArchive: false,
  //       Priority: "",
  //       TaskStatus: "",
  //       FromDueDate: "",
  //       ToDueDate: "",
  //       SortByDueDate: "",
  //     })
  //   );

  //   dispatch(
  //     postGetTeams({
  //       from: 1,
  //       to: -1,
  //       text: "",
  //     })
  //   );
  // }, []);
  // useEffect(() => {
  //   dispatch(getMyTasks(sendData));
  // }, [
  //   sendData.FromDueDate,
  //   sendData.ToDueDate,
  //   sendData.From,
  //   sendData.To,
  //   sendData.UserId,
  //   sendData.UserIds,
  //   sendData.Priority,
  //   sendData.TaskStatus,
  //   sendData.SortByDueDate,
  //   sendData.IsArchive,
  //   sendData.Title,
  // ]);
  // console.log("local Data", localData);
  //console.log("message", Message);

  const handleComplete = (id) => {
    const obj = { TaskId: id, TaskStatusValue: 100 };
    setCompleteConfig(obj);
    //  console.log(openCompleteModal);
    setOpenCompleteModal(true);
  };

  const handleDelete = (id) => {
    const obj = { taskId: id };
    setDeleteConfig(obj);
    setOpenDeleteModal(true);
  };

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
  // console.log(" complteconfig ", completeConfig);
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
  //console.log("filter object", filterObject, userIds);

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
    //  console.log("form submitted", fromdate, toduedate);
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

  // const getMonth=(num)=>{
  //   let arr=["Jan" , "Feb" ,"Mar" ,"Apr" ,"May" ,"Jun" ,"Jul" ,"Aug" ,"Sep" ,"Oct" ,"Nov" , "Dec"]
  //   return arr[]
  // }

  const getDisplayDate = (Date) => {
    let arr2 = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    //  console.log("dtae", Date);
    const arr = Date.substr(0, 10).split("-");
    const str2 = `${arr[1]} ${arr2[0]} ${arr[2]}`;

    return str2;
  };

  const handlefromDate = (date) => {
    const arr = date.split("-");
    const newStr = `${arr[1]}/${arr[2]}/${arr[0]}`;
    return newStr;
  };

  const handleCreateDate = (value) => {
    setCreateDateOrder(value);
    value !== "1" && setDueDateOrder("1");
    if (value === "2") {
      dispatch(setSortData({ order: "desc", column: "CreateDate" }));
    }
    if (value === "3") {
      dispatch(setSortData({ order: "asc", column: "CreateDate" }));
    }
  };

  const handleDueDate = (value) => {
    value !== "1" && setCreateDateOrder("1");
    setDueDateOrder(value);

    if (value === "2") {
      dispatch(setSortData({ order: "desc", column: "DueDate" }));
    }
    if (value === "3") {
      dispatch(setSortData({ order: "asc", column: "DueDate" }));
    }
  };

  return (
    <div>
      {/* <div style={{ display: "flex", flexDirection: "row" }}>
        <List>
          <ListItem divider>
            <ListItemButton onClick={() => setListOpen(true)}>
              <ListItemText primary={"Expand List"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Collapse in={listOpen}>
         
        </Collapse>
        <input />
        <button onClick={() => setOpenDialogue(true)}>Add Task</button>
        <button>Export</button>
      </div> */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <span className="cell">Title</span>
              </TableCell>
              <TableCell>
                <span className="cell">Customer Name</span>
              </TableCell>
              <TableCell>
                <span className="cell">Assigned By</span>
              </TableCell>
              <TableCell>
                <span className="cell">Assigned Date</span>{" "}
                {createDateOrder === "1" ? (
                  <IconButton onClick={() => handleCreateDate("2")}>
                    <img
                      height="12px"
                      src=" https://testffc.nimapinfotech.com/assets/media/icons/sort.svg"
                    />
                  </IconButton>
                ) : createDateOrder === "2" ? (
                  <IconButton onClick={() => handleCreateDate("3")}>
                    <img
                      height="12px"
                      src="https://testffc.nimapinfotech.com/assets/media/icons/downarrow.svg"
                    />
                  </IconButton>
                ) : createDateOrder === "3" ? (
                  <IconButton onClick={() => handleCreateDate("2")}>
                    <img
                      height="12px"
                      src="https://testffc.nimapinfotech.com/assets/media/icons/uparrow.svg"
                    />
                  </IconButton>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>
                <span className="cell">Due Date</span> {}{" "}
                {dueDateOrder === "1" ? (
                  <IconButton onClick={() => handleDueDate("2")}>
                    <img
                      height="12px"
                      src=" https://testffc.nimapinfotech.com/assets/media/icons/sort.svg"
                    />
                  </IconButton>
                ) : dueDateOrder === "2" ? (
                  <IconButton onClick={() => handleDueDate("3")}>
                    <img
                      height="12px"
                      src="https://testffc.nimapinfotech.com/assets/media/icons/downarrow.svg"
                    />
                  </IconButton>
                ) : dueDateOrder === "3" ? (
                  <IconButton onClick={() => handleDueDate("2")}>
                    <img
                      height="12px"
                      src="https://testffc.nimapinfotech.com/assets/media/icons/uparrow.svg"
                    />
                  </IconButton>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>
                <span className="cell">Priority</span>
              </TableCell>
              <TableCell>
                <span className="cell ">Status</span>
              </TableCell>
              <TableCell padding="none"></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localData?.map((data, index) => (
              <TableRow>
                <TableCell>
                  <span className="cell span-link">{data.Title}</span>
                </TableCell>
                <TableCell>
                  <span className="cell span-link">{data.LeadName}</span>
                </TableCell>
                <TableCell>
                  <span className="cell">{data.AssignedByUserName}</span>
                </TableCell>
                <TableCell>
                  <span className="cell">
                    {getDisplayDate(data.CreateDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="cell">
                    {getDisplayDate(data.TaskEndDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="cell">{data.Priority}</span>
                </TableCell>

                <TableCell>
                  {data.TaskStatus > 0 && data.TaskStatus < 100 ? (
                    <span className="cell status-partial">
                      {`Partial Complete (${data.TaskStatus}%)`}{" "}
                    </span>
                  ) : data.TaskStatus === 0 ? (
                    <span className="cell status-accepted">Accepted</span>
                  ) : data.TaskStatus === -1 ? (
                    <span className="cell status-not-accepted">
                      Not Accepted
                    </span>
                  ) : data.TaskStatus === 100 ? (
                    <span className="cell status-completed">Completed</span>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell component="td" className="cell">
                  <Tooltip title="Taskarchieve" placement="top" arrow>
                    <IconButton>
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskArchive.svg"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell component="td" className="cell">
                  {data.TaskStatus === -1 && (
                    <Tooltip title="Accept" placement="top" arrow>
                      <IconButton
                        onClick={() =>
                          dispatch(
                            postStatus({
                              data: { TaskId: data.TaskId, TaskStatusValue: 0 },
                            })
                          )
                        }
                      >
                        <img
                          height="20px"
                          src="https://testffc.nimapinfotech.com/assets/media/task/TaskAccept.svg"
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell component="td" className="cell">
                  <Tooltip title="Coverage" placement="top" arrow>
                    <IconButton>
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskViewTaskCoverage.svg"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell component="td" className="cell">
                  <Tooltip title="Delete" placement="top" arrow>
                    <IconButton onClick={() => handleDelete(data.TaskId)}>
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskDelete.svg"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell component="td" className="cell">
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <Tooltip title="Complete" placement="top" arrow>
                      <IconButton onClick={() => handleComplete(data.TaskId)}>
                        <img
                          height="20px"
                          src="https://testffc.nimapinfotech.com/assets/media/task/TaskComplete.svg"
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>

                <TableCell component="td" className="cell">
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <Tooltip title="Partial Complete" placement="top" arrow>
                      <IconButton
                        onClick={() =>
                          handlePartial(data.TaskId, data.TaskStatus)
                        }
                      >
                        <img
                          height="20px"
                          src="https://testffc.nimapinfotech.com/assets/media/task/TaskPartialComplete.svg"
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTask open={openDialogue} setOpen={(data) => setOpenDialogue(data)} />
      {/* <DeleteModal

        open={openDeleteModal}
        setOpen={(data) => setOpenDeleteModal(data)}
      /> */}
      {openPartialModal && (
        <PartialModal
          config={partialConfig}
          open={openPartialModal}
          setOpen={(data) => setOpenPartialModal(data)}
        />
      )}

      {openDeleteModal && (
        <CompleteModal
          heading="DELETE TASK"
          MessageDisplay="Do you want to delete this Task?"
          buttonName="Delete"
          dispatchFun={(dataObject) => dispatch(deleteTask(dataObject))}
          config={deleteConfig}
          open={openDeleteModal}
          setOpen={(data) => setOpenDeleteModal(data)}
        />
      )}

      {openCompleteModal && (
        <CompleteModal
          heading="COMPLETE TASK"
          MessageDisplay="Are you sure this Task is complete?"
          dispatchFun={(dataObject) => dispatch(postStatus(dataObject))}
          buttonName="Yes"
          config={completeConfig}
          open={openCompleteModal}
          setOpen={(data) => setOpenCompleteModal(data)}
        />
      )}
      <div className="pagination">
        <div>
          <IconButton
            onClick={() => dispatch(setStartFromAndTo())}
            disabled={sendData.From === 1}
          >
            <span style={{ fontSize: "12px" }}>{`|`}</span>
            <NavigateBeforeIcon fontSize="medium" />
          </IconButton>
          <IconButton
            disabled={sendData.From === 1}
            onClick={() => dispatch(setFromAndTo({ direction: "rtl" }))}
          >
            <NavigateBeforeIcon fontSize="medium" />
          </IconButton>
          <IconButton
            disabled={sendData.To >= count}
            onClick={() => dispatch(setFromAndTo({ direction: "ltr" }))}
          >
            <NavigateNextIcon fontSize="medium" />
          </IconButton>
          <IconButton
            onClick={() => dispatch(setEndFromAndTo())}
            disabled={sendData.To >= count}
          >
            <NavigateNextIcon fontSize="medium" />
            <span style={{ fontSize: "12px" }}>{`|`}</span>
          </IconButton>
        </div>
        <div className="item-page">
          <span>
            {sendData.From}-{toToDisplay}of{count}
          </span>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <FormControl
            variant="standard"
            size="small"
            sx={{ mb: 3, mr: 2, minWidth: 60, fontStretch: 3 }}
          >
            <Select
              value={difference}
              onChange={(e) => dispatch(setDifference(e.target.value))}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="item-page">
          <span>Items Per Pages: </span>
        </div>{" "}
      </div>
    </div>
  );
};

export default MyTasksList;
