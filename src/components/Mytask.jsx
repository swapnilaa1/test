//import { TabsContext } from "@mui/base";
//import { Box } from "@mui/system";
//import { Box , Tab } from "@mui/material";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import {   AppBar,Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Toolbar,
 Box, Button, Grid, Tab, TextField, Typography , Menu, Collapse, Card } from "@mui/material";
 import { getMyTasks, setSearchParams } from "../redux/myTasksSlice";
import React, { useState } from "react";
import { useDispatch   , useSelector} from "react-redux";
import MyTasksList from "./MyTasksList";
import SignIn from "./SignIn";
//import { TabContext, TabPanel } from "@mui/lab";

const Mytask = () => {
  const { TeamMembers } = useSelector((state) => state.postTeamReducer);
const dispatch=useDispatch()
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
  const[personAnchr ,setPersonAnchr ]= useState(null)
 const isPersonOPen=Boolean(personAnchr)
 
  const [value, setValue] = useState("1");
  const handlefromDate = (date) => {
    const arr = date.split("-");
    const newStr = `${arr[1]}/${arr[2]}/${arr[0]}`;
    return newStr;
  };
  const handleChange = (e, newValue) => {
    console.log("e");
    setValue(newValue);
  };
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
  console.log("value", value);
  const openPerson=(e)=>{
    setPersonAnchr(e.currentTarget)
      }
    
      const closePerson=()=>{
        setPersonAnchr(null)
      }

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
  
      const Person=(
        <Menu anchorEl={personAnchr} id="person" keepMounted open={isPersonOPen}>
        <MenuItem onClick={()=>closePerson()} >Profile Photo</MenuItem>  
        <MenuItem >Personal Info</MenuItem>
        <MenuItem>My Tasks</MenuItem>
        <MenuItem>Sign Out</MenuItem>
        </Menu>
        )

       const Person2=(<Collapse in={isPersonOPen}  id="person2" >
        <Card component="div"  style={{position:"relarive" , top:"20px"}}>
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
                            {TeamMembers?.map((members) => (
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
      
        </Card>
       </Collapse>) 
  return (
    <div>
      <Grid container component="div" style={{display:"flex" , flexDirection:"row" }}>
        <Button  color="secondary" onClick={openPerson}>Filter</Button>{Person2}
        <TextField label="Search" variant="standard" />
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
