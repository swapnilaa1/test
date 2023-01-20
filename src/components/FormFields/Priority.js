import { TextField, MenuItem } from "@mui/material";
import { useField } from "formik";
import React, { useState } from "react";

const Priority = ({ name, setFun, ...otherProps }) => {
  const [Priority, setPriority] = useState("");
  const [field, meta] = useField(name);
  const configText = {
    ...otherProps,
    ...field,
    fullWidth: true,
    variant: "standard",
  };

  const handleChange = (e, nextValue) => {
    console.log("target event", e.target.value);
    setFun(e.target.value);
    //setPriority(e.target.value);
  };
  if (meta && meta.touched && meta.error) {
    configText.error = true;
    configText.helperText = meta.error;
  }
  return (
    <TextField
      select
      value={Priority}
      {...otherProps}
      onChange={(e) => handleChange(e)}
      size="small"
    >
      <MenuItem value="High">Hign Priority</MenuItem>
      <MenuItem value="Low">Low Priority</MenuItem>
    </TextField>
  );
};

export default Priority;
