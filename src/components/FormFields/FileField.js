import { Height } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { FastField, Formik, useField } from "formik";
import React, { useState } from "react";

const FileField = ({
  name,
  formik,
  setFun,
  handleMultimedia,
  setFun1,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const [filesrc, setFilesrc] = useState("");
  const configText = {
    ...otherProps,
    ...field,
    fullWidth: true,
    variant: "standard",
  };
 

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const newAr = e.target.files[0].name.split(".");
    const Extention = newAr[newAr.length - 1];
    const MultimediaType= Extention==="pdf"?"D":"I";
    const filsplice = newAr.slice(0, newAr.length - 1);
    const FileName = filsplice.join("");
    const baseString = await convertFileBase(file);
    setFilesrc(baseString);
    handleMultimedia(baseString, FileName, Extention , MultimediaType);
  };

  const convertFileBase = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <FastField name="MultimediaData" className="">
        {(props) => {
          const { field, form, meta } = props;

          return (
            <div>
              <TextField
              required
                style={{
                  position:"relative",
                  top:"0px",
                  zIndex: 97,
                  opacity: "0",
                }}
                type="file"
                className=""
                fullWidth
                variant="standard"
                label="Attach File"
                onChange={(e) => {
                  handleFile(e);
                  setFun1(e.target.files[0].name);
                  setFun(e.target.files[0].name);
                }}
              />
            </div>
          );
        }}
      </FastField>
    </div>

    
  );
};

export default FileField;
