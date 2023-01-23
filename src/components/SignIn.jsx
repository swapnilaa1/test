import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { BASE_URL, SIGN_IN } from "../api/apiEndPoints";
import { RequestAPi } from "../api/Request";
import { getMyTasks } from "../redux/myTasksSlice";
import signInSlice, { signInUser } from "../redux/signInSlice";

const SignIn = () => {
  const list = useSelector((state) => state.mytasksReducer);
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="Username"
          value={credentials.Username}
          onChange={handleChange}
        />
        <label>password</label>
        <input
          type="text"
          name="Password"
          value={credentials.Password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => dispatch(getMyTasks(obj1))}>My tasks</button>
    </div>
  );
};

export default SignIn;
