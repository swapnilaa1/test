import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemText, TextField, Checkbox, CircularProgress} from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompMembers } from "../../redux/companyMemberSlice";
import "./modal.css";

const SelectUser = ({ openAddUser,  setOpenAddUser,  users,  setUsers,  setUsersCc,  userName,  usersIdObj,  setUsersIdObj,  setUserCount,}) => {
  
  const [isPending , startTransition]= useTransition();
  const[search , setSearch]=useState("");
  const [count, setCount] = useState("1");

  const data = useSelector(
    (state) => state.companyMemberReducers.localCompanyData
  );
  const { isGetMemberLoading} =useSelector(state=>state.companyMemberReducers)
  
  const dispatch = useDispatch();

  const handleChange = (e, element) => {
    if (userName === "userId") {
      const index = users.indexOf(element.UserId);
      if (index === -1) {
        setUsers([...users, element.UserId]);
      } else {
        let newAr = users.filter((user) => {
          return user !== element.UserId;
        });
        setUsers(newAr);
      }
    } else {
      const index = usersIdObj.indexOf(element.UserId);
      if (index === -1) {
        setUsersCc([...users, element]);
        setUsersIdObj([...usersIdObj, element.UserId]);
      } else {
        let newAr = users.filter((user) => {
          return user.UserId !== element.UserId;
        });
        let newIds = usersIdObj.filter((usersv) => usersv !== element.UserId);
        setUsersIdObj(newIds);
        setUsersCc(newAr);
      }
    }
  };

  const handleClick = () => {
    users.length !== 0
      ? setUserCount(`${users.length} Users`)
      : setUserCount("");
    setOpenAddUser(false);
  };

  const handleSearch=(e)=>{
    setSearch(e.target.value);
    
      startTransition(()=>{
        dispatch(getCompMembers(search));
      })
  }


  useEffect(() => {
    dispatch(getCompMembers(search));
  }, []);
  return (
    <Dialog open={openAddUser}>
     
      <DialogTitle>Members</DialogTitle>
     
      <DialogContent className="dcontent" dividers >
      { !isGetMemberLoading ? <DialogContentText>
          <TextField variant="standard" label="Search" fullWidth value={search} onChange={handleSearch}/>
          <List>
          { data===undefined ?  <p className="no-data">No Data Found</p>: <div>
              {data?.map((element, index) => (
              <ListItem
                key={element.UserId}
             
              >
                <ListItemButton onClick={(e) => handleChange(e, element)}>
                  <ListItemText primary={element.Name} />
                  <Checkbox
                    checked={
                      userName === "userId"
                        ? users.includes(element.UserId)
                        : usersIdObj.includes(element.UserId)
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}</div>} 
          </List>
          
        </DialogContentText>:<div className="circular" >
          <CircularProgress/></div> }
        
      </DialogContent>
      <DialogActions>
        <Button className="cancelb" variant="contained" color="primary" onClick={() => setOpenAddUser(false)}   >
          Cancel
        </Button>
        <LoadingButton className="cancelb" size="small" onClick={() => handleClick()}  loading={isGetMemberLoading} variant="contained" color="primary"  loadingPosition="end" endIcon={ isGetMemberLoading? < SaveIcon/> :""}>Add</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SelectUser;
