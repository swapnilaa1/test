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
  TableHead,
  TableRow,
  TextField,
  Toolbar,
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
import DeleteModal from "./Modal/DeleteModal";
import PartialModal from "./Modal/PartialModal";
import "../style/pages.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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
  const [deleteConfig, setDeleteConfig] = useState({});

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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
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
                <span className="cell">Status</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localData?.map((data, index) => (
              <TableRow>
                <TableCell>
                  <span className="cell">{data.Title}</span>
                </TableCell>
                <TableCell>
                  <span className="cell">{data.LeadName}</span>
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
                  <span className="cell">
                    {data.TaskStatus > 0 && data.TaskStatus < 100
                      ? `Partial Complete (${data.TaskStatus}%)`
                      : data.TaskStatus === 0
                      ? "Accepted"
                      : data.TaskStatus === -1
                      ? "Not Accepted"
                      : data.TaskStatus === 100
                      ? "Completed"
                      : ""}
                  </span>
                </TableCell>
                <TableCell component="td" className="cell">
                  <IconButton>
                    <img
                      height="20px"
                      src="https://testffc.nimapinfotech.com/assets/media/task/TaskArchive.svg"
                    />
                  </IconButton>
                </TableCell>
                <TableCell component="td" className="cell">
                  {data.TaskStatus === -1 && (
                    <IconButton
                      onClick={() =>
                        dispatch(
                          postStatus({
                            TaskId: data.TaskId,
                            TaskStatusValue: 0,
                          })
                        )
                      }
                    >
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskAccept.svg"
                      />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell component="td" className="cell">
                  <IconButton>
                    <img
                      height="20px"
                      src="https://testffc.nimapinfotech.com/assets/media/task/TaskViewTaskCoverage.svg"
                    />
                  </IconButton>
                </TableCell>
                <TableCell component="td" className="cell">
                  <IconButton onClick={() => setOpenDeleteModal(true)}>
                    <img
                      height="20px"
                      src="https://testffc.nimapinfotech.com/assets/media/task/TaskDelete.svg"
                    />
                  </IconButton>
                </TableCell>
                <TableCell component="td" className="cell">
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <IconButton onClick={() => handleComplete(data.TaskId)}>
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskComplete.svg"
                      />
                    </IconButton>
                  )}
                </TableCell>

                <TableCell component="td" className="cell">
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <IconButton
                      onClick={() =>
                        handlePartial(data.TaskId, data.CompletionPercentage)
                      }
                    >
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskPartialComplete.svg"
                      />
                    </IconButton>
                  )}
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
