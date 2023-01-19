import React from "react";
import Date from "../FormFields/Date";
import FileField from "../FormFields/FileField";
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
    // case "checkbox":
    //   return <CheckBoxOptionOk {...rest} />;
    // case "date":
    //   return <ShowDate {...rest} />;
  }
};

export default FormControl;
