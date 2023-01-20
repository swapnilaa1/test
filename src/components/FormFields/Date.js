import { CheckBox } from "@mui/icons-material";
//import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import { FastField, Field, useField } from "formik";
import React, { useState } from "react";
import "./Form.css";
const Date = ({ name, ...otherProps }) => {
  const [selectdDate, setSelectdDate] = useState(null);
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
  return <TextField type="date" {...configText} />;
};

export default Date;
