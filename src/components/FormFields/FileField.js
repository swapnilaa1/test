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
  //   if (meta && meta.touched && meta.error) {
  //     configText.error = true;
  //     configText.helperText = meta.error;
  //   }

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const newAr = e.target.files[0].name.split(".");
    // console.log("new Arr", newAr);
    const Extention = newAr[newAr.length - 1];
    const filsplice = newAr.slice(0, newAr.length - 1);
    const FileName = filsplice.join("");
    const baseString = await convertFileBase(file);
    // console.log("file name ", FileName);
    // console.log("Extention", Extention);
    //console.log("event ", e.target.files);
    //`console.log("baseString", baseString);
    setFilesrc(baseString);
    handleMultimedia(baseString, FileName, Extention);
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
      <FastField name="MultimediaData" className="form-control">
        {(props) => {
          const { field, form, meta } = props;
          //console.log("props in fast field", props);

          return (
            <div>
              <TextField
                style={{
                  zIndex: "100",
                  opacity: "0",
                }}
                type="file"
                className="form-control"
                //   {...otherProps}
                fullWidth
                variant="standard"
                label="Attach File"
                onChange={(e) => {
                  handleFile(e);
                  setFun1(e.target.files[0].name);
                  setFun(e.target.files[0].name);

                  //formik.setFieldValue("Address", e.target.files[0].name);
                }}
              />
            </div>
          );
        }}
      </FastField>
    </div>

    // <TextField
    //   type="file"
    //   {...configText}
    //   onChange={(e) => {
    //     handleFile(e);
    //     setFun(e.target.files[0].name);
    //     //    formik.setFieldValue(name, e.target.files[0].name);
    //     //console.log("Swapnil");
    //     //formik
    //   }}
    // />
  );
};

export default FileField;
