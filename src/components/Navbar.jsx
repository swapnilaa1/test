import { AppBar, Button,  Grid,  IconButton,  Menu,  MenuItem,  ThemeProvider,  Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from "./Theme";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toastobj } from "../utility/toastobj";

const Navbar = () => {
const navigate=useNavigate()
const {token}=useSelector(state=>state.signInReducer)
 const[personAnchr ,setPersonAnchr ]= useState(null)
 const isPersonOPen=Boolean(personAnchr)
  const resp={
    display:{md:"flex" , xs:"none"  , sm:"none"}
  }

  const mobres={
    display:{md:"none" , xs:"flex"  , sm:"flex"}
  }

  const openPerson=(e)=>{
setPersonAnchr(e.currentTarget)
  }

  const closePerson=()=>{
    setPersonAnchr(null)
  }

  const handleSignOut=()=>{
  closePerson()
  localStorage.clear();
  navigate("/login");
  toast.success("User Logged Out" , toastobj)
  }



  const Person=(
  <Menu anchorEl={personAnchr} id="person" keepMounted open={isPersonOPen}>
  <MenuItem >Profile Photo</MenuItem>  
  <MenuItem >Personal Info</MenuItem>
  <MenuItem>My Tasks</MenuItem>
  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
  </Menu>
  )
  return (
<>
<AppBar>
      <Toolbar>
        <Typography variant="h5" style={{flexGrow:"1"}}>Hello</Typography>
        <div>
        <Button variant="h5">Time</Button>
        <Button variant="h5">Date</Button>
        <Button color="primary"   sx={{height:27 ,fontSize:13 ,padding:1}}>Punch In</Button>
        </div>
        <Grid component="div" sx={resp}>
        <Button color="primary" onClick={openPerson}    sx={{height:27 ,fontSize:13 ,padding:1}}>UserName</Button>
        </Grid>
        <Grid component="div" sx={mobres}>
          <IconButton onClick={openPerson}>
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
      {Person}
</>
  
  );
};

export default Navbar;
