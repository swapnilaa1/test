import { TextField } from "@mui/material";
import { useField } from "formik";
import React, { useState } from "react";

const TextInput = ({ name, ...otherProps }) => {
  const [errors, setErrors] = useState("");
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
    // setErrors(meta.error);
  }
  return (
    <div>
      <TextField {...configText} size="small" />
    </div>
  );
};

export default TextInput;
