import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskStatus } from "../redux/getTaskStatusSlice";
import { getMyTasks } from "../redux/myTasksSlice";
import { postStatus } from "../redux/postStatusUpdateSlice";
import AddTask from "./Modal/AddTask";

const MyTasksList = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const { localData } = useSelector((state) => state.mytasksReducer);
  const dispatch = useDispatch();
  const callApi = () => {};

  useEffect(() => {
    dispatch(
      getMyTasks({
        From: 1,
        To: 50,
        Title: "",
        UserId: "",
        IsArchive: false,
        UserIds: [],
        Priority: "",
        TaskStatus: "",
        FromDueDate: "",
        ToDueDate: "",
        SortByDueDate: "",
      })
    );
  }, []);
  console.log("local Data", localData);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button>Filter</button>
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
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
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
                <TableCell>
                  {data.TaskStatus === "Pending" ? (
                    <button>Accept</button>
                  ) : (
                    "Accept"
                  )}
                </TableCell>
                <TableCell>
                  <button>complete</button>
                </TableCell>
                <TableCell>
                  <button onClick={() => dispatch(getTaskStatus())}>
                    Partial Complete
                  </button>
                </TableCell>
                <TableCell>
                  <button>Delete</button>
                </TableCell>
                <TableCell>
                  <button onClick={() => dispatch(postStatus())}>
                    Partial Send
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTask open={openDialogue} setOpen={(data) => setOpenDialogue(data)} />
    </div>
  );
};

export default MyTasksList;
