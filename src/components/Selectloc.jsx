import { MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import "./SelectLoc.css";

const Selectloc = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const showCheckboxes = () => {
    let checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      setExpanded(true);
    } else {
      checkboxes.style.display = "none";
      setExpanded(true);
    }
  };

  const handleChange=(e)=>{
      document.getElementById("one").style.display="block";
  }

  return (
    <div>
      <form>
        <div className="multiselect">
          <div className="selectBox" onclick={() => showCheckboxes()}>
            <TextField  className="" fullWidth onChange={handleChange} variant="standard"/> 
          {/* <input className="ip" type="select" onclick={(e)=>handleChange(e)}/> */}
            <select id="one" className="selectOp" size={5}>
              <option>hello</option>
              <option value="a"><input type="text" placeholder="search"/></option>
              <option value="b">Hello</option>
              {data?.map((eachData) => (
              <option for="one">
                <input type="checkbox" id="one" />
              {eachData.UserName}
              </option>
            ))}
            </select>
            <div className="overSelect"></div>
          </div>
          {/* <div id="checkboxes">
            {data?.map((eachData) => (
              <label htmlFor="one">
                <input type="checkbox" id="one" />
                {eachData.UserName}
              </label>
            ))}
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default Selectloc;
