import { TextField, MenuItem, Select, FormControl, InputLabel, ListItem, ListItemText, List } from "@mui/material";
import { useField } from "formik";
import React, { useState } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const Priority = ({ name, setFun, control, ...otherProps }) => {
  const[searched , setSearched]=useState("");
  const [field, meta] = useField(name);

  const configText = {
    ...otherProps,
    ...field,
  };

 
  if (meta && meta.touched && meta.error) {
    configText.error = true;
    configText.helperText = meta.error;
  }

  

  const Menu = (
    <TextField
    required
    style={{ position:"absolute",top:"279px" , width:260 }}
      select
      {...configText}
      size="small"
      fullWidth
      variant="standard"
    >
      <MenuItem value="High">Hign Priority</MenuItem>
      <MenuItem value="Low">Low Priority</MenuItem>
    </TextField>
  );

 

  const Lead = (
    <FormControl sx={{ width: 260, position:"absolute" , top:"210px"  }} >
      <InputLabel variant="standard" id="name-label" ></InputLabel>
      <TextField
      required
      select
      id="name"
      labelId="name-label"
        {...configText}
        size="small"
        fullWidth
        variant="standard"
        MenuProps={MenuProps}
      >
      <MenuItem >
      <TextField
      
      variant="standard"
      fullWidth
      size="small"
      label="Search"
    />
      </MenuItem> 
  
        {otherProps.data?.map((eachData) => (
          <MenuItem style={{ width: "200px" }} value={eachData.Id}>
            {eachData.LeadName}
          </MenuItem>
        ))}
      
      </TextField>
    </FormControl>
  );
  if (otherProps.checkFor === "LeadId") return <>{Lead}</>;
  else return <>{Menu}</>;
};

export default Priority;
