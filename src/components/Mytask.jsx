//import { TabsContext } from "@mui/base";
//import { Box } from "@mui/system";
//import { Box , Tab } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AppBar,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Toolbar,
  Box,
  Button,
  Grid,
  Tab,
  TextField,
  Typography,
  Menu,
  Collapse,
  Card,
} from "@mui/material";
import { getMyTasks, setSearchParams, setTitle } from "../redux/myTasksSlice";
import React, { useState } from "react";
import { postGetTeams } from "../redux/postGetTeamsSlice";
import { useDispatch, useSelector } from "react-redux";
import MyTasksList from "./MyTasksList";
import SignIn from "./SignIn";
import "../style/pages.css";
import { useEffect } from "react";
import { useTransition } from "react";
//import { TabContext, TabPanel } from "@mui/lab";

const Mytask = () => {
  const [isPending, startTransition] = useTransition();
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
  const [teamValue, setTeamValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [teamCount, setTeamCount] = useState(0);
  const { TeamMembers } = useSelector((state) => state.postTeamReducer);
  const dispatch = useDispatch();
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
  const [userIdsWithName, setUserIdsWithName] = useState([]);

  const [personAnchr, setPersonAnchr] = useState(null);
  const isPersonOPen = Boolean(personAnchr);

  const [value, setValue] = useState("1");
  const handlefromDate = (date) => {
    const arr = date.split("-");
    const newStr = `${arr[1]}/${arr[2]}/${arr[0]}`;
    return newStr;
  };
  const handleChange = (e, newValue) => {
    //console.log("e");
    setValue(newValue);
  };
  const handleTeam = (Id, userObject) => {
    const index = userIds.indexOf(Id);
    if (index === -1) {
      setUserIds([...userIds, Id]);
      setUserIdsWithName([...userIdsWithName, userObject]);
    } else {
      let newAr = userIds.filter((user) => {
        //  console.log("user", user, element.UserId);
        return user !== Id;
      });
      setUserIds(newAr);
      let newArr2 = userIdsWithName.filter(
        (user) => user.UserId != userObject.UserId
      );

      setUserIdsWithName(newArr2);
    }
    // setTeamValue();
  };
  //console.log("userids with name ", userIdsWithName);
  // console.log("value", value);
  const openPerson = (e) => {
    setPersonAnchr(e.currentTarget);
  };

  const closePerson = () => {
    setPersonAnchr(null);
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
    // console.log("form submitted", fromdate, toduedate);
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

  // const handleOnChange = () => {
  //   if (userIdsWithName.length === 0) {
  //     setTeamValue("");
  //   } else if (userIdsWithName.length === 1) {
  //     setTeamValue(`${userIdsWithName[0].UserName}`);
  //   } else if (userIdsWithName.length > 1) {
  //     setTeamValue(
  //       `${userIdsWithName[0].UserName}+${userIdsWithName.length - 1}`
  //     );
  //   }
  //   console.log("chnage event called");
  // };

  const Person = (
    <Menu
      anchorEl={personAnchr}
      id="person"
      keepMounted
      open={isPersonOPen}
      onClose={() => setPersonAnchr(null)}
    >
      <div style={{ width: "450px" }}>
        <div className="buttonDiv">
          <span>x</span>
        </div>
        <div style={{ margin: "15px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12" style={{ marginBottom: "15px" }}>
                <div className="filter-label">By Status</div>
                <TextField
                  id="standard-size-small"
                  value={filterObject.TaskStatus}
                  select
                  fullWidth
                  size="small"
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
              </div>
              <div className="col-12" style={{ marginBottom: "15px" }}>
                <div className="filter-label">By Priority</div>
                <TextField
                  value={filterObject.Priority}
                  select
                  fullWidth
                  size="small"
                  variant="standard"
                  label="Priority"
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
              </div>
              <div className="col-12" style={{ marginBottom: "15px" }}>
                <div className="filter-label">By Member</div>
                <TextField
                  select
                  fullWidth
                  variant="standard"
                  label="Members"
                  value={userIdsWithName[0]?.UserName}
                >
                  {TeamMembers?.map((members) => (
                    <List>
                      <ListItem>
                        <ListItemButton
                          onClick={() => handleTeam(members.UserId, members)}
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
              </div>
              <div className="col-6" style={{ marginBottom: "15px" }}>
                <div className="filter-label">From Date</div>
                <TextField
                  type="date"
                  name="FromDueDate"
                  size="small"
                  variant="standard"
                  value={filterObject.FromDueDate}
                  onChange={(e) =>
                    setFilterObject({
                      ...filterObject,
                      FromDueDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-6" style={{ marginBottom: "15px" }}>
                <div className="filter-label">To Date</div>
                <TextField
                  type="date"
                  name="ToDueDate"
                  size="small"
                  variant="standard"
                  value={filterObject.ToDueDate}
                  onChange={(e) =>
                    setFilterObject({
                      ...filterObject,
                      ToDueDate: e.target.value,
                    })
                  }
                />
              </div>
              <hr />
              <div className="buttonDiv">
                <Button type="submit">Submit</Button>
                <Button onClick={() => closePerson()}>Cancel</Button>
              </div>
              {/* <button type="submit">Click Me</button> */}
            </div>
          </form>
        </div>
      </div>
    </Menu>
  );

  const handleSearch = (e) => {
    setSearchValue((prevState) => e.target.value);
    startTransition(() => {
      dispatch(setTitle(e.target.value));
    });
  };

  console.log("search value", searchValue);

  useEffect(() => {
    dispatch(
      getMyTasks({
        From: 1,
        To: 10,
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
    sendData.SortColumn,
    sendData.SortOrder,
  ]);

  return (
    <div>
      <Grid
        container
        component="div"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Button color="secondary" onClick={openPerson}>
          Filter
        </Button>

        {Person}
        <TextField
          label="Search"
          variant="standard"
          onChange={(e) => handleSearch(e)}
        />
        <Button>Add Task</Button>
        <Button>Export</Button>
      </Grid>
      <Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              textColor="black"
              indicatorColor="primary"
            >
              <Tab label="My Task" value="1" />
              <Tab label="CC" value="2" />
              <Tab label="Assigned By Me" value="3" />
              <Tab label="Archive List" value="4" />
              <Tab label="Calendar View" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <MyTasksList />
          </TabPanel>
          <TabPanel value="2">
            <SignIn />
          </TabPanel>
          <TabPanel value="3">panel three</TabPanel>
          <TabPanel value="4">panel four</TabPanel>
          <TabPanel value="5">panel five</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Mytask;
