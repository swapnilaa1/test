import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL, SIGN_IN } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import { atStart } from "../redux/atStartSlice";
import { getMyTasks } from "../redux/myTasksSlice";
import signInSlice, { signInUser } from "../redux/signInSlice";
import "../style/pages.css";

const SignIn = () => {
  const navigate = useNavigate();
  const list = useSelector((state) => state.mytasksReducer);
  const data = useSelector((state) => state.startReducer.dataObj);
  const [obj1, setObj1] = useState({
    From: 1,
    To: 10,
    Title: "",
    UserId: "",
    IsArchive: false,
    UserIds: [],
    Priority: "",
    TaskStatus: "",
    FromDueDate: "",
    ToDueDate: "",
    SortByDueDate: "",
  });
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  //console.log("sign in env", process.env.REACT_APP_BASE_URL);

  const signIn = async () => {
    const response = await RequestAPi.post(SIGN_IN, {
      Username: "8113899206",
      Password: "12345678",
    });
    //console.log("response", response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("singined pressed");
    // signIn();
    dispatch(signInUser(credentials));
    navigate("/dashboard");
  };
  //  console.log("list ", list);
  // console.log("credes", credentials);
  const obj = {
    From: 1,
    To: 10,
    Title: "",
    UserId: "",
    IsArchive: false,
    UserIds: [],
    Priority: "",
    TaskStatus: "",
    FromDueDate: "",
    ToDueDate: "",
    SortByDueDate: "",
  };

  useEffect(() => {
    dispatch(atStart());
  }, []);
  return (
    <div className="row">
      <div className="col-6">
        <img
          height="100%"
          width="100%"
          src="https://testffc.nimapinfotech.com/assets/media/login/login-page-slider3.jpg"
        />
      </div>
      <div className="col-6">
        <div className="signup">
          Don't have an account yet? <span>Sign Up</span>
        </div>
        <div className="logo-head">
          <div className="logo">
            <img src={data.WebAppGetStartedLogo} />
          </div>
          Get Started with BETA Field Force
        </div>
        <div className="login">
          <form onSubmit={handleSubmit}>
            <div style={{ width: "400px" }}>
              <TextField
                fullWidth
                label="Username"
                variant="standard"
                type="text"
                name="Username"
                size="small"
                value={credentials.Username}
                onChange={handleChange}
              />
              <div>Error</div>
            </div>
            <div style={{ width: "400px" }}>
              <TextField
                fullWidth
                label="Password"
                variant="standard"
                type="text"
                name="Password"
                value={credentials.Password}
                onChange={handleChange}
              />
            </div>
            <Button>Forgot Password</Button> <Button type="submit">Sign</Button>{" "}
            OR <Button>Sign In With OTP</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
