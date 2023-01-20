import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const TextField1 = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  console.log("field  , meta", field, meta);
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
    <TextField
      {...configText}
      style={{ position: "relative", bottom: "40px" }}
    />
  );
};

export default TextField1;
