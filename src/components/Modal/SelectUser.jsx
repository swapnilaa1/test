//import { CheckBox } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  TextField,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompMembers } from "../../redux/companyMemberSlice";

const SelectUser = ({
  openAddUser,
  setOpenAddUser,
  users,
  setUsers,
  setUsersCc,
  userName,
  usersIdObj,
  setUsersIdObj,
  setUserCount,
}) => {
  //const [users, setUsers] = useState([]);
  const [count, setCount] = useState("1");
  //const [count, setCount] = useState("1");

  const data = useSelector(
    (state) => state.companyMemberReducers.localCompanyData
  );
  // console.log("data in select user", data);
  const dispatch = useDispatch();
  // console.log("users in ", users);

  const handleChange = (e, element) => {
    // console.log("elem", users, element.UserId);
    // console.log("due to handle Click", e, element);

    //setUsers(e.target.value);

    if (userName === "userId") {
      const index = users.indexOf(element.UserId);
      if (index === -1) {
        setUsers([...users, element.UserId]);
      } else {
        let newAr = users.filter((user) => {
          //  console.log("user", user, element.UserId);
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
  console.log("users", users);

  const handleClick = () => {
    users.length !== 0
      ? setUserCount(`${users.length} Users`)
      : setUserCount("");
    setOpenAddUser(false);
  };

  useEffect(() => {
    dispatch(getCompMembers());
  }, []);
  return (
    <Dialog open={openAddUser}>
      <DialogTitle>Members</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          <TextField variant="standard" label="Search" fullWidth />
          <List>
            {data?.map((element, index) => (
              <ListItem
                key={element.UserId}
                // secondaryAction={<Checkbox checked={false} />}
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
            ))}
          </List>
          <FormControl>
            <FormGroup>
              {/* {data?.map((element, index) => (
                <FormControlLabel
                  label={element.Name}
                  control={
                    <CheckBox
                      //checked={users.includes(element.UserId)}
                      checked={false}
                      value={element.UserId}
                      onChange={handleChange}
                    />
                  }
                />
              ))} */}
            </FormGroup>
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpenAddUser(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => handleClick()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectUser;
