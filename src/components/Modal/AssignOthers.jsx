import { CheckBox } from "@mui/icons-material";
import { Box, FormControlLabel, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLeads } from "../../redux/leadsSlice";
import SelectUser from "./SelectUser";

const AssignOthers = () => {
  const [users1, setUsers1] = useState([]);
  const [usersCc, setUsersCc] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const [Priority, setPriority] = useState("");
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddCc, setOpenAddCc] = useState(false);

  const handleChange = (e, nextValue) => {
    setPriority(e.target.value);
  };
  useEffect(() => {
    dispatch(
      getLeads({
        From: 1,
        To: -1,
        Text: "",
      })
    );
  }, []);
  console.log("users ", users1, usersCc);
  return (
    <div>
      <Box component="form">
        <TextField fullWidth label="Title" variant="standard" />
        <TextField fullWidth label="Description" variant="standard" />
        <TextField fullWidth label="Attach File" variant="standard" />
        <TextField label="Lead Customer Name" variant="standard" />
        <TextField label="Select Due Date" variant="standard" />
        <TextField
          label="Select Priority"
          variant="standard"
          select
          value={Priority}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="High">Hign Priority</MenuItem>
          <MenuItem value="Low">Low Priority</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Add Users"
          variant="standard"
          onClick={() => setOpenAddUser(true)}
        />
        <TextField
          fullWidth
          label="Add CC Members"
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
          value={usersCc.length !== 0 ? `${usersCc.length} Users` : ""}
          onClick={() => setOpenAddCc(true)}
        />
      </Box>
      <SelectUser
        users={users1}
        setUsers={setUsers1}
        openAddUser={openAddUser}
        setOpenAddUser={(data) => setOpenAddUser(data)}
      />
      <SelectUser
        users={usersCc}
        setUsers={setUsersCc}
        openAddUser={openAddCc}
        setOpenAddUser={(data) => setOpenAddCc(data)}
      />
    </div>
  );
};

export default AssignOthers;
