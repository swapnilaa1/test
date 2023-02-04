import { Button, TextField } from "@mui/material";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import "../style/pages.css";
import FormControl from "./FormControl";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/signInSlice";
import { useNavigate } from "react-router-dom";
import { atStart } from "../redux/atStartSlice";

const initialState = {
  Username: "",
  Password: "",
};
const form_validation = Yup.object().shape({
  Username: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(10, "Only 10 numbers Are Allowed")
    .required("Required Field"),
  Password: Yup.string().required("Required Field"),
});

const Login = () => {
  const navigate = useNavigate();
  const { success } = useSelector((state) => state.signInReducer);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    //console.log("handle submitted" , values);
    dispatch(signInUser(values));
  };

  useEffect(() => {
    dispatch(atStart());
  }, []);
  //console.log("succcess" , success)
  return (
    <div className="row">
      <div className="col-6" style={{ backgroundColor: "grey" }}>
        Hello
      </div>
      <div className="col-6 container">
        <div>
          <div className="signup">
            Don't have an account yet? <span>Sign Up</span>
          </div>
          <div className="logo-head">Get Started with BETA Field Force</div>
          {success === false && success !== "" && (
            <div>{"Invalid Username or Password."}</div>
          )}
          <div className="login">
            <Formik
              initialValues={initialState}
              validationSchema={form_validation}
              onSubmit={handleSubmit}
            >
              {(formik) => {
                //console.log("values" ,formik.values)
                return (
                  <Form>
                    <FormControl
                      control="input"
                      label="Email Id/Mobile Number"
                      name="Username"
                    />
                    <FormControl
                      control="input"
                      label="Password"
                      name="Password"
                    />
                    <Button>Forgot Password</Button>{" "}
                    <Button type="submit">Sign</Button> OR{" "}
                    <Button>Sign In With OTP</Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
