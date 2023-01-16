import axios from "axios";
import React, { useState } from "react";
import { BASE_URL, SIGN_IN } from "../api/apiEndPoints";
import signInSlice from "../redux/signInSlice";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  console.log("sign in env", process.env.BASE_URL);

  const signIn = async () => {
    const response = await axios.post(process.env.BASE_URL, {
      Username: "8113899206",
      Password: "12345678",
    });
    console.log("response", response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("singined pressed");
    signIn();
  };
  console.log("credes", credentials);

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
    </div>
  );
};

export default SignIn;
