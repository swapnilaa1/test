import { Button, TextField } from "@mui/material";
import React from "react";

const AssignToOthers = () => {
  return (
    <div>
      <form>
        <div className="row">
          <div className="col-12">
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              size="small"
            />
          </div>
          <div className="col-12">
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              size="small"
            />
          </div>
          <div className="col-12">
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              size="small"
            />
          </div>
          <div className="col-6">
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              size="small"
            />
          </div>
          <div className="col-6">
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              size="small"
            />
          </div>
          <div className="col-6">
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              size="small"
            />
          </div>
          <div className="col-12">
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              size="small"
            />
          </div>

          <div>
            <hr />
            <Button    sx={{height:27 ,fontSize:13 ,padding:1}}>ADD</Button>
            <Button    sx={{height:27 ,fontSize:13 ,padding:1}}>Cancel</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignToOthers;
