import React from "react";
import Date from "../FormFields/Date";
import FileField from "../FormFields/FileField";
import Priority from "../FormFields/Priority";
import TextField1 from "../FormFields/TextField";
import TextInput from "../FormFields/TextInput";
import TextSelect from "../FormFields/TextSelect";

const FormControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <TextInput {...rest} />;
    case "users":
      return <TextSelect {...rest} />;
    case "date":
      return <Date {...rest} />;
    case "file":
      return <FileField {...rest} />;
    case "Address":
      return <TextField1 {...rest} />;
    case "Priority":
      return <Priority {...rest} />;
   
  }
};

export default FormControl;
