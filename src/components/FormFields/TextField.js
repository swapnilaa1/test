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
    required
      {...configText}
      style={{ position: "relative",bottom:"69px" , fontSize:"10px", fontWeight:"600"  }}
    
      InputProps={{
           endAdornment: <InputAdornment onClick={handleClick} position="end">{otherProps.value?.length!==0?<span style={{color:"red" , fontWeight:"520" , fontSize:"16px" , zIndex:98 , cursor:"pointer"}}>Remove</span>:""}</InputAdornment>,
      }}
    />
  );
};

export default TextField1;
