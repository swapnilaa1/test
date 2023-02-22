import { Button } from "@mui/material";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import FilterStatus from "./FilterStatus";
import "./test.css";

const MyTaskFIlterContent = ({ filterObject , label  , handleClick}) => {
 
    return (
    <Button  className="btn-filter-content" size="small" color="primary" variant="outlined"  endIcon={<ClearIcon size="small"/>} onClick={()=>handleClick(label)}    >
        <FilterStatus filterObject={filterObject} label={label}/> 
      
    </Button>
  );
};

export default MyTaskFIlterContent;
