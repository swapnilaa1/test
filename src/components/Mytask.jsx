
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ClearIcon from "@mui/icons-material/Clear";
import "./test.css"
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
  Tooltip,
  InputLabel,
  Select,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import {getMyTasks,setSearch,setSearchParams,setTitle,} from "../redux/myTasksSlice";
import React, { useState } from "react";
import { postGetTeams } from "../redux/postGetTeamsSlice";
import { useDispatch, useSelector } from "react-redux";
import MyTasksList from "./MyTasksList";
import SignIn from "./SignIn";
import "../style/pages.css";
import { useEffect } from "react";
import { useTransition } from "react";
import { useRef } from "react";
import AddTask from "./Modal/AddTask";
import { Slide } from "react-toastify";
import Selectloc from "./Selectloc";
import MyTaskFilteButton from "./MyTaskFilteButton";
import MyTaskFIlterContent from "./MyTaskFIlterContent";
import { BorderRight, Label } from "@mui/icons-material";
import { getStringDate, getTodaysDate } from "../utility";


const tabObj={
 borderBottom:"0.5px solid rgba(150 , 150 , 150 , 0.3)",
 borderLeft:"0.5px solid rgba(150 , 150 , 150 , 0.5)",
 borderRight:"0.5px solid rgba(150 , 150 , 150 , 0.5)",
 boxShadow:"0px 2px 6px rgba(150 , 150 , 150 )"
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Mytask = ({setSelectedTitle , selectedTitle}) => {
  
 
  const [openMulti, setOpenMulti] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const submitRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const { difference, localData, sendData,isListFetching  ,  tasksLoading, count, toToDisplay  , isPaginationLoading} = useSelector(
    (state) => state.mytasksReducer
  );

  const { Message } = useSelector((state) => state.postStatusUpdateReducer);
  const deleteMessage = useSelector((state) => state.deleteTaskReducer.Message);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [teamValue, setTeamValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [teamCount, setTeamCount] = useState(0);
  const { TeamMembers , isTeamLoading } = useSelector((state) => state.postTeamReducer);
  const TeamId = TeamMembers.map((data) => {
    return {
      name: data.UserName,
      id: data.UserId,
    };
  });
  const dispatch = useDispatch();
  const [filterObject, setFilterObject] = useState({
    TaskStatus: "",
    Priority: "",
    FromDueDate: "",
    ToDueDate: "",
    From: "",
    To: "",
    SortByDueDate: "",
    Title: "",
  });

  const [selectedDate , setSelectedDate ]= useState({
    FromDueDate:null,
    ToDueDate:null
  })

  const[isFromDateOpen ,setIsFromDateOpen ]=useState(false);
  const[istODateOpen ,setIsToDateOpen ]=useState(false);


  const [dateError, setDateError] = useState({});
  const [filterObject2, setFilterObject2] = useState({
    TaskStatus: "",
    Priority: "",
    FromDueDate: "",
    ToDueDate: "",
    From: "",
    To: "",
    SortByDueDate: "",
    Title: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userIdsDisplay, setUserIdsDisplay] = useState([]);
  const [usersForFilter  , setUsersForFilter]=useState([]);
  const [userIds, setUserIds] = useState([]);
  const [searched , setSearched]=useState("");
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
    setValue(newValue);
  };
  const handleTeam = (event) => {
    const {
      target: { value },
    } = event;

    setUserIdsDisplay(typeof value === "string" ? value.split(",") : value);
  };

  
  const openPerson = (e) => {
    setPersonAnchr(e.currentTarget);
  };

  const closePerson = () => {
    setPersonAnchr(null);
  };

  const toShowFrom = (dateValue) => {
    const months = [
      "",
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
    const newA = dateValue.split("-");

    return `${newA[2]}-${months[newA[1].split("")[1]]}-${newA[0]}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fromdate = "";
    let toduedate = "";
    let from = "",
      to = "";
    const newArr2=userIdsDisplay.map((data)=>data.UserId);   
    setUsersForFilter(userIdsDisplay);
    const UserId = localStorage.getItem("userId");
    if (filterObject.FromDueDate !== "") {
      fromdate = handlefromDate(filterObject.FromDueDate);
      from = toShowFrom(filterObject.FromDueDate);
      setStartDate(from);
    }
    if (filterObject.ToDueDate !== "") {
      toduedate = handlefromDate(filterObject.ToDueDate);
      to = toShowFrom(filterObject.ToDueDate);
      setEndDate(to);
    }

   
   
    if (
      !(
        (dateError.FromDueDate !== undefined &&
          dateError.ToDueDate === undefined) ||
        (dateError.FromDueDate === undefined &&
          dateError.ToDueDate !== undefined)
      )
    ) {
      dispatch(
        setSearchParams({
          filterObject,
          UserId: Number(UserId),
          FromDueDate: fromdate,
          ToDueDate: toduedate,
        })
      );
      setFilterApplied(true);
      closePerson();
    }
  };

  const handleSelect = () => {
    setOpenMulti(true);
  };

  const handleChangeDate=(label , date)=>{
    setIsFromDateOpen(false);
    setSelectedDate({ ...selectedDate , [label]:date});
    const arr=date.toUTCString().split(" ");    
    handleDate(label,getStringDate(arr));
  }
  const handleDate = (name , value) => {

    setFilterObject({
      ...filterObject,
      [name]: value,
    });
    setDateError({});

    if (name === "FromDueDate" && filterObject.ToDueDate === "") {
      setDateError({ ToDueDate: "Please Select To Due Date" });
    } else if (name === "ToDueDate" && filterObject.FromDueDate === "")
      setDateError({ FromDueDate: "Please Select From Due Date" });
    else if (filterObject.FromDueDate !== "" && filterObject.ToDueDate !== "")
      setDateError({});
  };

  const handleSearchTeam=(e)=>{
    setSearched(e.target.value);
  }

  const getTodaysDate = () => {
    let endDate = new Date();
  
    let date1 = endDate.getDate();
    let month1 = endDate.getMonth() + 1;
    let year1 = endDate.getUTCFullYear();
  
    if (date1 < 10) {
      date1 = "0" + date1;
    }
    if (month1 < 10) {
      month1 = "0" + month1;
    }
  
    let string1 = year1 + "-" + month1 + "-" + date1;
    return string1;
  };

  const dattte=()=>{

}
  const Person = (
    <div >
      <Menu
      className="filter-border"
        anchorEl={personAnchr}
        id="person"
        keepMounted
        open={isPersonOPen}
        onClose={() => setPersonAnchr(null)}
      >
        <div className="filter_div1">
          <div className="buttonDiv3">
            <Button onClick={() => closePerson()} >
              <span>x</span>
            </Button>
          </div>
          <div className="filter-mar">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 filter-col filter-font">
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
                    <MenuItem value="0" style={tabObj}>Accepeted</MenuItem>
                    <MenuItem value="-1" style={tabObj}>Not Accepted</MenuItem>
                    <MenuItem value="-2" style={tabObj}>Partial Completed</MenuItem>
                    <MenuItem value="100" style={tabObj}>Completed</MenuItem>
                  </TextField>
                </div>
                <div className="col-12 filter-col">
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
                    <MenuItem  value="High" style={tabObj}>High Priority</MenuItem>
                    <MenuItem  value="Low" style={tabObj}>Low Priority</MenuItem>
                  </TextField>
                </div>
                <div className="col-12 filter-col">
                  <div className="filter-label">By Member</div>


                  <FormControl style={{ width: "inherit" }}>
                    <InputLabel
                      variant="standard"
                      id="demo-multiple-checkbox-label"
                    >
                      Member
                    </InputLabel>
                    <Select
                      id="demo-multiple-checkbox"
                      labelId="demo-multiple-checkbox-label"
                      multiple
                      value={userIdsDisplay}
                      onChange={handleTeam}
                      renderValue={(selected) => {
                        return selected.length === 1
                          ? selected[0].UserName
                          : `${selected[0].UserName}+${selected.length - 1}`;
                      }}
                      size="small"
                      fullWidth
                      variant="standard"
                      MenuProps={MenuProps}
                    >
                      {TeamMembers?.map((name) => (
                        <MenuItem key={name.UserId} value={name} style={tabObj}>
                          <Checkbox
                            checked={userIdsDisplay.indexOf(name) > -1}
                          />
                          <ListItemText primary={name.UserName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div className="filter-date" ></div>
                </div>
                <div className="col-6 filter-col">
                  <div className="filter-label">From Date</div>
                 
                 <div>
                  
                  <DatePicker 
                  selected={selectedDate.FromDueDate}
                  inline={isFromDateOpen}
                  onChange={(date)=>handleChangeDate("FromDueDate" , date)}
                 maxDate={ selectedDate.ToDueDate || new window.Date("2123-02-28")}
                  />
                  </div>
                  {dateError.FromDueDate !== undefined && (
                    <div className="error-font">
                      {dateError.FromDueDate}
                    </div>
                  )}
                </div>
                <div className="col-6 filter-col">
                  <div className="filter-label">To Date</div>
                  <DatePicker 
                  selected={selectedDate.ToDueDate}
                  inline={istODateOpen}
                  onChange={(date)=>handleChangeDate("ToDueDate" , date)}
                  minDate={ selectedDate.FromDueDate|| new window.Date()}
                  />

                  {dateError.ToDueDate !== undefined && (
                    <div className="error-font">
                      {dateError.ToDueDate}
                    </div>
                  )}
                </div>
                <hr />
                <div className="buttonDiv">
                  <Button className="filter-submit" type="submit" color="primary"   >
                    Submit
                  </Button>
                  <Button className="filter-submit" color="primary" onClick={() => closePerson()}  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Menu>
    </div>
  );

  const handleSearch = (e) => {
    setSearchValue((prevState) => e.target.value);
    startTransition(() => {
      dispatch(setTitle(e.target.value));
    });
  };


  const handleClick = (label, label2) => {

    setFilterObject({ ...filterObject, [label]: "" });
    if (label === "FromDueDate") {
      dispatch(setSearch("FromDueDate"));
      setFilterObject({ ...filterObject, ToDueDate: "", [label]: "" });
    } else if (label === "All") {
      dispatch(setSearch("All"));
      setFilterObject({ ...filterObject2 });
      setFilterApplied(false);
    } else if (label === "Priority") {
      dispatch(setSearch("Priority"));
    } else if (label === "TaskStatus") {
      setFilterObject({ ...filterObject, TaskStatus: "" });
      dispatch(setSearch("TaskStatus"));
    } else if (label==="Member"){
      const arr=[];
      setUserIdsDisplay(arr);
      setUsersForFilter(arr)
    } else {
      const arr=userIdsDisplay.filter((data)=>data.UserName!==label);
      setUserIdsDisplay(arr);
      setUsersForFilter(arr);

    }


    if (Object.values(filterObject).join("").length === 0) {
      setFilterApplied(false);
    }
  };


  useEffect(() => {
    setFilterApplied(false);
  }, [Object.values(filterObject).join("").length === 0]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
    dispatch(
      postGetTeams({
        from: 1,
        to: -1,
        text: "",
      })
    );
    setSelectedTitle("My Tasks")}
  }, []);
  useEffect(() => {
     if (localStorage.getItem("token")) {
    
    dispatch(getMyTasks(sendData));}
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
    difference,
    Message,
    deleteMessage,
  ]);


  const getData = () => {
    dispatch(getMyTasks(sendData));
  };

  return (
    <div>
      <div className="task_main_div">
        <Grid
        style={{width:"50%"}}
          component="div"
          className="navgrid"
        >
          <div className="filter-flex-nav">
            <Tooltip title="Filter" placement="top" arrows>
              <Button
                className="button-filer"
                variant="contained"
                onClick={openPerson}
                size="small"
                color="primary"
                  >
                Filter
              </Button>
            </Tooltip>
            {Person}
          </div>

          <div className="searchIp">
            <TextField
              fullWidth
              size="small"
              label="Search"
              variant="standard"
              onChange={(e) => handleSearch(e)}
              sx={{ mr: 2 }}
            />
          </div>

          <div className="">
            <Tooltip title="Add Task" placement="top" arrows>
              <Button
                
                variant="contained"
                size="small"
                color="primary"
                sx={{height:27 ,fontSize:13 ,padding:1,mr:2}}
                onClick={() => setOpenDialogue(true)}
              >
                Add Task
              </Button>
            </Tooltip>
            <Tooltip title="Export" placement="top" arrows>
              <Button className="export-filter" variant="contained" size="small" color="primary"  >
                Export
              </Button>
            </Tooltip>
          </div>
        </Grid>
        {filterApplied && (
        
        <div className="filter-div">
            {filterObject?.TaskStatus?.length !== 0 && (
              <div className="filter-content3">
                <MyTaskFilteButton
                  className="filter-by"
                  label={"By Status"}
                  label2={"TaskStatus"}
                  handleClick={(label) => handleClick(label)}
                />
                <MyTaskFIlterContent
                  label="TaskStatus"
                  className="filter-content2"
                  filterObject={filterObject?.TaskStatus}
                  handleClick={(label) => handleClick(label)}
                />
              </div>
            )}

            {
              usersForFilter?.length!==0 && 
              (<div className="filter-content3">
                <MyTaskFilteButton
                  className="filter-by"
                  label={"By Members"}
                  label2={"Member"}
                  handleClick={(label) => handleClick(label)}
                />
                {
                  usersForFilter?.map((data ,index)=>< MyTaskFIlterContent
                    label={`${data.UserName}`}
                    className="filter-content2"
                    filterObject={`${data.UserName}`}
                    handleClick={(label) => handleClick(label)}
                  />)
                }
              </div>)
            }

            {filterObject?.Priority?.length !== 0 && (
              <div className="filter-content3">
                <MyTaskFilteButton
                  className="filter-by"
                  label={"By Priority"}
                  label2={"Priority"}
                  handleClick={(label) => handleClick(label)}
                />
                <MyTaskFIlterContent
                  label="Priority"
                  className="filter-content2"
                  filterObject={`${filterObject?.Priority} Priority`}
                  handleClick={(label) => handleClick(label)}
                />
              </div>
            )}
            {filterObject?.FromDueDate?.length !== 0 && (
              <div className="filter-content3">
                <MyTaskFilteButton
                  className="filter-by"
                  label={"By Date"}
                  label2={"FromDueDate"}
                  handleClick={(label) => handleClick(label, "ToDueDate")}
                />
                <MyTaskFIlterContent
                  label="FromDueDate"
                  className="filter-content2"
                  filterObject={`From ${startDate} To ${endDate}`}
                  handleClick={(label) => handleClick(label, "ToDueDate")}
                />
              </div>
            )}
            
            <Button
              startIcon={<ClearIcon size="small" />}
              onClick={() => handleClick("All")}
              sx={{height:27 ,fontSize:13 ,padding:1}}
            >
              Clear Filters
            </Button>
          </div>
        )}

        <Box className="tabs_nav">
          <TabContext value={value} sx={{}}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} >
              <TabList
                style={{height:"10px"}}
                onChange={handleChange}
                textColor="black"
                indicatorColor="primary"
              
              >
                <Tab style={{fontSize:"14px" ,fontWeight:"550" , height:"68px" , width:"110px" , textTransform:"capitalize"  }} label="My Task" value="1" />
                <Tab style={{fontSize:"14px" ,fontWeight:"550" , height:"68px" , width:"110px" , textTransform:"capitalize"  }} label="CC" value="2" />
                <Tab style={{fontSize:"14px" ,fontWeight:"550" , height:"68px" , width:"150px" , textTransform:"capitalize"  }} label="Assigned By Me" value="3" />
                <Tab style={{fontSize:"14px" ,fontWeight:"550" , height:"68px" , width:"140px" , textTransform:"capitalize"  }} label="Archive List" value="4" />
                <Tab style={{fontSize:"14px" ,fontWeight:"550" , height:"68px" , width:"140px" , textTransform:"capitalize"  }} label="Calendar View" value="5" />
              </TabList>
            </Box>
            <TabPanel className="filter-tab-panel" value="1" >
              <MyTasksList ref={submitRef} />
            </TabPanel>
            <TabPanel value="2">
             CC
              {/* <SignIn /> */}
              {/* <List2 /> */}
            </TabPanel>
            <TabPanel value="3">Assigned By Me</TabPanel>
            <TabPanel value="4">Archieve List</TabPanel>
            <TabPanel value="5">
              Calender View
              {/* <img src={""} alt="img" /> */}
            </TabPanel>
          </TabContext>
        </Box>
      </div>

      <AddTask
        open={openDialogue}
        setOpen={(data) => setOpenDialogue(data)}
        refresh={() => getData()}
      />
    </div>
  );
};

export default Mytask;
