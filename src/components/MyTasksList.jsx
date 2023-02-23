import {
  AppBar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { getDisplayDate, isOverDue } from "../utility";
import { height } from "@mui/system";

const dataMap=["" ,"" ,"" ,"" , "" ,"" , "" , "","","No Records Found" ,"" ,"" ,"" ,"" , "" ,"" , "" , "",""];

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

  const {
    localData,
    count,
    sendData,
    difference,
    toToDisplay,
    isPaginationLoading,
    isListFetching,
  } = useSelector((state) => state.mytasksReducer);
  const { Message } = useSelector((state) => state.postStatusUpdateReducer);
  const { TeamMembers } = useSelector((state) => state.postTeamReducer);

  const dispatch = useDispatch();
  const callApi = () => {};
  const setOpen = () => {
    setOpenCompleteModal(false);
  };

  const handleComplete = (id) => {
    const obj = { TaskId: id, TaskStatusValue: 100 };
    setCompleteConfig(obj);
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
  };
  const handleTeam = (Id) => {
    const index = userIds.indexOf(Id);
    if (index === -1) {
      setUserIds([...userIds, Id]);
    } else {
      let newAr = userIds.filter((user) => {
        return user !== Id;
      });
      setUserIds(newAr);
    }
  };

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
      <TableContainer
      className="task-table-container"
        component={Paper}
        style={{
          position: "relative",
          top: "-33px",
          left: "-24px",
          minHeight: 500,
          backgroundColor: "",
        }}
      >
        <Table size="small" >
          <TableHead>
            <TableRow className="tasks_table_head_row">
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
                      height="14px"
                      src=" https://testffc.nimapinfotech.com/assets/media/icons/sort.svg"
                    />
                  </IconButton>
                ) : createDateOrder === "2" ? (
                  <IconButton onClick={() => handleCreateDate("3")}>
                    <img
                      height="14px"
                      src="https://testffc.nimapinfotech.com/assets/media/icons/downarrow.svg"
                    />
                  </IconButton>
                ) : createDateOrder === "3" ? (
                  <IconButton onClick={() => handleCreateDate("2")}>
                    <img
                      height="14px"
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
                      height="14px"
                      src=" https://testffc.nimapinfotech.com/assets/media/icons/sort.svg"
                    />
                  </IconButton>
                ) : dueDateOrder === "2" ? (
                  <IconButton onClick={() => handleDueDate("3")}>
                    <img
                      height="14px"
                      src="https://testffc.nimapinfotech.com/assets/media/icons/downarrow.svg"
                    />
                  </IconButton>
                ) : dueDateOrder === "3" ? (
                  <IconButton onClick={() => handleDueDate("2")}>
                    <img
                      height="14px"
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
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {/* <TableCell></TableCell> */}

              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { !isListFetching ? localData?.length!==0 ? 
             localData?.map((data, index) => (
              <TableRow className="table_row_body">
                <TableCell sx={{ maxWidth: 110 }} className="tab_cell">
                  <span className="cell span-link">{data.Title}</span>
                </TableCell>
                <TableCell className="tab_cell">
                  <span className="cell span-link">{data.LeadName}</span>
                </TableCell>
                <TableCell className="tab_cell" padding="none">
                  <span className="cell" >
                    {data.AssignedByUserName}
                  </span>
                </TableCell>
                <TableCell className="tab_cell">
                  <span className="cell">
                    {getDisplayDate(data.CreateDate, "display")}
                  </span>
                </TableCell>
                <TableCell className="tab_cell">
                  <span className="cell">
                    {getDisplayDate(data.TaskEndDate, "display")}
                  </span>
                  {isOverDue(data.TaskEndDate) && (
                    <Tooltip title="Overdue" placement="bottom" arrow>
                      <img
                        style={{ marginLeft: "2px" }}
                        height="15px"
                        src="https://testffc.nimapinfotech.com/assets/media/icons/overdue.svg"
                      />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell className="tab_cell">
                  <span className="cell">{data.Priority}</span>
                </TableCell>

                <TableCell className="tab_cell">
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
                <TableCell className="tab_cell"></TableCell>
                <TableCell className="tab_cell"></TableCell>
                <TableCell
                  component="td"
                  className="cell"
                  sx={{ maxWidth: 40 }}
                >
                  <Tooltip title="Taskarchieve" placement="bottom" arrow>
                    <IconButton>
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskArchive.svg"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell
                  component="td"
                  className="cell"
                  sx={{ maxWidth: 40 }}
                >
                  {data.TaskStatus === -1 && (
                    <Tooltip title="Accept" placement="bottom" arrow>
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
                <TableCell
                  component="td"
                  className="cell"
                  sx={{ maxWidth: 40 }}
                >
                  <Tooltip title="Coverage" placement="bottom" arrow>
                    <IconButton>
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskViewTaskCoverage.svg"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell
                  component="td"
                  className="cell"
                  sx={{ maxWidth: 40 }}
                >
                  <Tooltip title="Delete" placement="bottom" arrow>
                    <IconButton onClick={() => handleDelete(data.TaskId)}>
                      <img
                        height="20px"
                        src="https://testffc.nimapinfotech.com/assets/media/task/TaskDelete.svg"
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell
                  component="td"
                  className="cell"
                  sx={{ maxWidth: 40 }}
                >
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <Tooltip title="Complete" placement="bottom" arrow>
                      <IconButton onClick={() => handleComplete(data.TaskId)}>
                        <img
                          height="20px"
                          src="https://testffc.nimapinfotech.com/assets/media/task/TaskComplete.svg"
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>

                <TableCell
                  component="td"
                  className="cell"
                  sx={{ maxWidth: 30 }}
                >
                  {data.TaskStatus >= 0 && data.TaskStatus < 100 && (
                    <Tooltip title="Partial Complete" placement="bottom" arrow>
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
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )) : 
              <TableRow>
                <TableCell colSpan={17} style={{ textAlign:"center"}}>No Records Found</TableCell>
              </TableRow>
             : <TableRow>
             <TableCell colSpan={17}  style={{ textAlign:"center"}}>Fetching List Please Wait..... <CircularProgress style={{height:"20px" , width:"22px"}}/></TableCell>
           </TableRow>
              
          }
             
          </TableBody>
        </Table>
      </TableContainer>
      <AddTask open={openDialogue} setOpen={(data) => setOpenDialogue(data)} />
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
          <Tooltip title="First Page" placement="top" arrow>
            <IconButton
              onClick={() => dispatch(setStartFromAndTo())}
              disabled={sendData.From === 1}
            >
              <span className="icon-button-style" >{`|`}</span>
              <NavigateBeforeIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous Page" placement="top" arrow>
            <IconButton
              disabled={sendData.From === 1}
              onClick={() => dispatch(setFromAndTo({ direction: "rtl" }))}
            >
              <NavigateBeforeIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next Page" placement="top" arrow>
            <IconButton
              disabled={sendData.To >= count}
              onClick={() => dispatch(setFromAndTo({ direction: "ltr" }))}
            >
              <NavigateNextIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Last Page" placement="top" arrow>
            <IconButton
              onClick={() => dispatch(setEndFromAndTo())}
              disabled={sendData.To >= count}
            >
              <NavigateNextIcon fontSize="medium" />
              <span className="icon-button-style" >{`|`}</span>
            </IconButton>
          </Tooltip>
        </div>
        <div className="item-page">
          <span>
            {sendData.From}-{toToDisplay} of {count}
          </span>
        </div>
        <div className="nav-menu" >
          <FormControl
            variant="standard"
            size="small"
            sx={{ pt: 1, mr: 2, minWidth: 40, fontStretch: 1 }}
          >
            <Select
              sx={{ fontSize: "12px", fontWeight: "530" }}
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
        {isPaginationLoading && (
          <div id="tablePagination">
            <CircularProgress
              style={{
                marginTop: "10px",
                marginRight: "5px",
                height: "16px",
                width: "16px",
              }}
              color="inherit"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasksList;
