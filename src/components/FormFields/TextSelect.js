import { TextField } from "@mui/material";
import { useField } from "formik";
import { useState , useEffect } from "react";
import React from "react";
import SelectUser from "../Modal/SelectUser";

const TextSelect = ({ name, value, setFun, ...otherProps }) => {
  const [errors, setErrors] = useState(false)
  const [field, meta] = useField(name);
  const configText = {
    ...otherProps,
    ...field,

    fullWidth: true,
    variant: "standard",
  };

  if (meta && meta.touched && meta.error) {
    configText.error = true;
    configText.helperText = meta.error;
  }


  return (
    <div>
      <TextField
   required
      InputProps={{
        readOnly: true,
      }}
      style={{position:"absolute" , top:"350px", height:"60px" , zIndex:"0" }}
      {...configText}
      onChange={() => setFun()}
      onClick={() => otherProps.setOpenAddUser(true)}
    />
    {
       otherProps.openAddUser && <SelectUser
      userName="userCc"
      users={otherProps.users}
      usersIdObj={otherProps.usersIdObj}
      setUsersIdObj={(data) => otherProps.setUsersIdObj(data)}
      setUsersCc={otherProps.setUsersCc}
      openAddUser={otherProps.openAddUser}
      setUserCount={data=>otherProps.setUserCount(data) }
      
      setOpenAddUser={(data) => otherProps.setOpenAddUser(data)}
    />
    }
   
    </div>
    
  );
};

export default TextSelect;
