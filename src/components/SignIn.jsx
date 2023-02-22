import { LoadingButton } from "@mui/lab";
import { Button, Snackbar, TextField } from "@mui/material";
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
import SaveIcon from "@mui/icons-material/Save";

const numReg = /^[0-9]{0,11}$/;

const SignIn = () => {
  const navigate = useNavigate();
  const { toastMsg, sign, loading  , success , errormessage} = useSelector(
    (state) => state.signInReducer
  );
  const list = useSelector((state) => state.mytasksReducer);
  const data = useSelector((state) => state.startReducer.dataObj);
  const [signin, setSignin] = useState(false);
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

  const [error, setError] = useState({
    Username: "",
    Password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==="Username" && value.length<=10){
      setCredentials({ ...credentials, [name]: value });  
    }
    else if(name!=="Username"){
      setCredentials({ ...credentials, [name]: value });
    }
    
    if (name === "Username" && (!numReg.test(value) ) ) {
      setError({ ...error, [name]: "Username Must Contain Only Numbers" });
    } else if (
      (name === "Username" && (numReg.test(value))|| value.length>=10) ||
      (name === "Password" && value.length >= 6)
      
    ) {
      setError({ ...error, [name]: "" });
    } else if (name === "Password" && value.length < 6) {
      setError({ ...error, Password: "Password Length Must be more than 6" });
    }
    if (value.length === 0) {
      setError({ ...error, [name]: `${name} cannot be empty` });
    }

    
  };
  const handleBlur = () => {
    setError({ Username: "", Password: "" });
  };

  const checkError = () => {
    return Object.values(credentials).join("").length
  };

  const checkError1=()=>{
   return Object.values(error).join("").length;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkError()!=0 && checkError1()===0){
      dispatch(signInUser({ data: credentials, navigate, setSignin }));
    }
    else{
      setError(prevState=>{
        return {
          Username: prevState.Username===""&& credentials.Username===""?"Username cannot be Empty":prevState.Username,
          Password: prevState.Password===""&& credentials.Password==="" ? "Password cannot be Empty" : prevState.Password,
        } 
      })
    }
    
    setSignin(true);
  };

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
    <>
      <div className="login-main">
        <div className="item-grid">
          <img src="https://testffc.nimapinfotech.com/assets/media/login/login-page-slider3.jpg" />
        </div>
        <div className="item-grid">
          <div className="signup">
            <span className="signHead">Don't have an account yet? </span>{" "}
            <span className="signlink">Sign Up</span>
          </div>

          <div className="sign-main">
        { typeof success!=="string" && !success  ? <div className="error_div">{errormessage}</div> : <div className="no_error"></div> }    
            <div className="login_containt">
              <div className="logo-head">
                <div className="logo">
                  <img src={data.WebAppGetStartedLogo} />
                </div> {errormessage}
                Get Started with BETA Field Force
              </div>

              <div className="login">
                <form onSubmit={handleSubmit}>
                  <div style={{ width: "450px" }}>
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
                    <div>
                      {error.Username.length !== 0 ? (
                        <span className="error_msg">{error.Username}</span>
                      ):<span className="invisible">hello</span>}
                    </div>
                  </div>
                  <div style={{ width: "450px" }}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="standard"
                      type="text"
                      name="Password"
                      value={credentials.Password}
                      onChange={handleChange}
                    />
                    <div>
                      {error.Password.length !== 0 ? (
                        <span className="error_msg">{error.Password}</span>
                      ):<span className="invisible">hello</span>}
                    </div>
                  </div>
                  {error.Empty !== undefined && (
                    <div className="empty_error"> {error.Empty} </div>
                  )}
                  <div className="login_buttons">
                    <Button
                      size="small"
                      color="primary"
                      sx={{ height: 27, fontSize: 13, padding: 1 }}
                    >
                      Forgot Password
                    </Button>{" "}
                    <LoadingButton
                      size="small"
                      loading={loading}
                      variant="contained"
                      color="primary"
                      type="submit"
                      loadingPosition="end"
                      sx={{ height: 27, fontSize: 13, padding: 1 }}
                      endIcon={loading ? <SaveIcon /> : ""}
                    >
                      Sign
                    </LoadingButton>{" "}
                    OR{" "}
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{ height: 27, fontSize: 13, padding: 1 }}
                    >
                      Sign In With OTP
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
