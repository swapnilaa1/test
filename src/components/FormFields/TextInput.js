import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const TextInput = ({ name, ...otherProps }) => {
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
  return <TextField {...configText} />;
};

export default TextInput;
