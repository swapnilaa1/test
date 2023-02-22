import {
  
  TextField,
} from "@mui/material";
import { FastField, Field, useField } from "formik";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./Form.css";
import "react-datepicker/dist/react-datepicker.css";
import { getStringDate } from "../../utility";
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
        <div
          style={{
            position: "absolute",
            top: "-13px",
            height: "20px",
            width: "350px",
            left: "300px",
            opacity: 1,
            zIndex: 100,
          }}
        >
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
      required
        placeholder=""
        onClick={handleClick}
        {...configText}
        min="2023-02-19"
        style={{
          position: "absolute",
          top: "210px",
          right: "1px",
          width: "260px",
          zIndex: 100,
        }}
      />
    </div>
  );
};

export default Date;
