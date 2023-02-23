import { InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const TextField1 = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configText = {
    ...otherProps,
    ...field,
    fullWidth: true,
    variant: "standard",
    size:"small",
  };
  if (meta && meta.touched && meta.error) {
    configText.error = true;
    configText.helperText = meta.error;
  }
  const handleClick=()=>{
    otherProps.setFun();
    otherProps.setFun2()

  }
  return (
    <TextField
    className="form_text"
    required
      {...configText}
    
    
      InputProps={{
           endAdornment: <InputAdornment onClick={handleClick} position="end">{otherProps.value?.length!==0?<span className="end_props_loader" >Remove</span>:""}</InputAdornment>,
      }}
    />
  );
};

export default TextField1;
