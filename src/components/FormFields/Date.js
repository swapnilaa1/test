import {
  
  TextField,
} from "@mui/material";
import { FastField, Field, useField } from "formik";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./Form.css";
import "react-datepicker/dist/react-datepicker.css";
import { getStringDate } from "../../utility";
import "./Form.css";
const Date = ({ name, setFun, ...otherProps }) => {
  const [dv, setDv] = useState(null);
  const [isDateOpen, SetIsDateOpen] = useState(false);
  const [selectdDate, setSelectdDate] = useState(null);
  const [field, meta] = useField(name);
  const configText = {
    ...otherProps,
    ...field,

    variant: "standard",
  };
  const handle = (e) => {
    setFun(e.target.value);
  };
  const handleClick = () => {
    SetIsDateOpen(true);
  };

  if (meta && meta.touched && meta.error) {
    configText.error = true;
    configText.helperText = meta.error;
  }
  const handleChange = (date) => {
    SetIsDateOpen(false);
    setDv(date);
    const arr=date.toUTCString().split(" ");
  
   setFun(getStringDate(arr))
  };

  return (
    <div>
      {isDateOpen && (
        <div className="isDateOpen">
          {isDateOpen && (
            <DatePicker
              {...configText}
              selected={dv}
              onChange={handleChange}
              inline={isDateOpen}
              minDate={new window.Date()}
            />
          )}{" "}
        </div>
      )}

      <TextField
        className="isDateShow"
        required
        placeholder=""
        onClick={handleClick}
        {...configText}
        min="2023-02-19"
      />
    </div>
  );
};

export default Date;
