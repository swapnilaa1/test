import { Drawer,IconButton,List , ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useState } from 'react';

import { makeStyles } from '@mui/styles';
const useStyles=makeStyles((theme)=>({
  drawer:{
    width:700
  }
}))


const Sidbar = () => {
  const classes=useStyles();
  const res2={
      width:"600",
  }
const [bigSideBarOpen  ,setBigSideBarOpen]=useState(true)
  const listArr=[ 'https://testffc.nimapinfotech.com/assets/media/sidebar/dashboardLogo.svg' ,
  'https://testffc.nimapinfotech.com/assets/media/sidebar/teamLogo.svg' ,'https://testffc.nimapinfotech.com/assets/media/sidebar/taskLogo.svg',
  'https://testffc.nimapinfotech.com/assets/media/sidebar/billingLogo.svg' ,'https://testffc.nimapinfotech.com/assets/media/sidebar/settingLogo.svg']
  const drawerItems=( <List>
    <ListItemButton>
        <img height="20px" src='https://testffc.nimapinfotech.com/image/New%20Images/FFC/FFC-logo.png'/>
        <ListItemText primary="Beta Field Force" 
        sx={{marginLeft:"5px" , marginRight:"10px"}}
        />
       <IconButton onClick={()=>{
        setTimeout(()=>{setBigSideBarOpen(false)} , 500)
       }}>
       <KeyboardDoubleArrowLeftIcon fontSize='large' />
       </IconButton>
        

    </ListItemButton>
    <ListItemButton>
        <img height="20px" src='https://testffc.nimapinfotech.com/assets/media/sidebar/dashboardLogo.svg'/>
        <ListItemText primary="DashBoard" sx={{marginLeft:"5px"}}/>
    </ListItemButton>
    <ListItemButton>
        <img height="20px" src='https://testffc.nimapinfotech.com/assets/media/sidebar/teamLogo.svg'/>
        <ListItemText primary="My Teams" sx={{marginLeft:"5px"}}/>
    </ListItemButton>
    <ListItemButton>
        <img height="20px" src='https://testffc.nimapinfotech.com/assets/media/sidebar/taskLogo.svg'/>
        <ListItemText primary="My Tasks" sx={{marginLeft:"5px"}} />
    </ListItemButton>
    <ListItemButton>
        <img height="20px" src='https://testffc.nimapinfotech.com/assets/media/sidebar/billingLogo.svg'/>
        <ListItemText primary="Billing" sx={{marginLeft:"5px"}} />
    </ListItemButton>
    <ListItemButton>
        <img height="20px" src='https://testffc.nimapinfotech.com/assets/media/sidebar/settingLogo.svg'/>
        <ListItemText primary="Settings" sx={{marginLeft:"5px"}} />
    </ListItemButton>
  </List>)
  return (
    <div>
      { bigSideBarOpen ? (<Drawer open={bigSideBarOpen} anchor='left' variant='permanent' className={classes.drawer}>
         {drawerItems}
        </Drawer>): <Drawer open={!bigSideBarOpen} anchor="left" variant='permanent'>{
          <List>
             <ListItemButton onClick={()=>{
        setTimeout(()=>{setBigSideBarOpen(true)} , 500)
       }}>
              <img height="20px" src='https://testffc.nimapinfotech.com/image/New%20Images/FFC/FFC-logo.png'/>
              <KeyboardDoubleArrowRightIcon fontSize='large'/>
            </ListItemButton>
            { listArr.map(item=>(
            <ListItemButton key={item}>
              <img height="20px" src={item}/>  
            </ListItemButton>)) }
          </List>
        }</Drawer>}

      
        


    </div>
  )
}

export default Sidbar