import { Button, TextField } from "@mui/material";
// import { Button } from "bootstrap";
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
            <Button>ADD</Button>
            <Button>Cancel</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignToOthers;
