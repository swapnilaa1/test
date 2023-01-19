import { Height } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { FastField, Formik, useField } from "formik";
import React from "react";

const FileField = ({ name, formik, setFun, setFun1, ...otherProps }) => {
  const [field, meta] = useField(name);
  // console.log("other porps", formik);
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
    // console.log("event ", e.target.files[0]);
  };
  return (
    <FastField name="MultimediaData" className="form-control">
      {(props) => {
        const { field, form, meta } = props;
        console.log("props in fast field", props);

        return (
          <div>
            <TextField
              style={{
                width: "0",
                height: "0",
                zIndex: "2",
                position: "absolute",
                overflow: "",
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
