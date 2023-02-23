import { TextField } from "@mui/material";
import { useField } from "formik";
import React, { useState } from "react";

const titleReg=/^[A-za-z]{0,25}$/;
const TextInput = ({ name, ...otherProps }) => {
  const [errors, setErrors] = useState("");
  const [field, meta] = useField(name);
  const configText = {
    ...otherProps,
    ...field,
    size:"small",
    variant: "standard",
    
  };

  const validateInput=(value)=>{
    let error;
    if(value==="")
    error="Required";
  }
  if (meta && meta.touched && meta.error) {
    configText.error = true;
    configText.helperText = meta.error;
  }
  const handleChange=(e)=>{
 
    otherProps.setFun(e.target.value);

  }
  return (
    <div>
      <TextField className="form_text_input" required {...configText} onChange={handleChange}  fullWidth />
    </div>
  );
};

export default TextInput;
