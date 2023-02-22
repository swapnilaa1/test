import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads } from "../../redux/leadsSlice";
import SelectUser from "./SelectUser";
import * as Yup from "yup";
import FormControl from "../FormControl";
import "./modal.css";
const titleReg=/^[A-za-z]{0,25}$/;


const initialState = {
  Title: "",
  Address: "",
  Description: "",
  Multimedia: "",
  LeadId: "",
  TaskEndDate: "",
  Priority: "",
  UserIds: "", // user having ids // set No of valuyes
};
const form_validation = Yup.object().shape({
  Title: Yup.string().required("Required")
  .matches(titleReg, "Invalid title"),
  Description: Yup.string().required("Required"),
  Address: Yup.string().required("Required"),
  LeadId: Yup.string().required("Required"),
   TaskOwners: Yup.string().required("Required"),
  TaskEndDate: Yup.string().required("Required"),
   Priority: Yup.string().required("Required"),
});

const AssignOthers = ({ handleSubmit, error, setOpen }, ref) => {
  const { localLeadData } = useSelector((state) => state.leadsReducer);

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm: () => {
          document.getElementById("Add").click();
        },
      };
    },
    []
  );
  const [formikObj, setFormikObj] = useState(null);
  const [users1, setUsers1] = useState([]);
  const [usersCc, setUsersCc] = useState([]);
  const [usersIdObj, setUsersIdObj] = useState([]);
  const [users1Value, setUsers1Value] = useState("");
  const [usersCcValue, setUsersCcValue] = useState("");

  const [MediaObject, setMediaObject] = useState({
    MultimediaData: "",
    MultimediaFileName: "",
    MultimediaExtension: "",
    MultimediaType: "",
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const [Priority, setPriority] = useState("");
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddCc, setOpenAddCc] = useState(false);

  const handleChange = (e, nextValue) => {
    setPriority(e.target.value);
  };

  const handleMultimedia = (
    baseString,
    mediaName,
    mediaExtention,
    MultimediaType
  ) => {
    setMediaObject({
      MultimediaData: baseString,
      MultimediaFileName: mediaName,
      MultimediaExtension: mediaExtention,
      MultimediaType: MultimediaType,
    });
  };

  const handleSubmitLocal = (values) => {
    handleSubmit(values, MediaObject, users1, usersCc, usersCcValue);
  };

  

  useEffect(() => {
    dispatch(getLeads());
  }, []);

  return (
    <div className="form-assign"
     >
    
      <Formik
        initialValues={initialState}
        validationSchema={form_validation}
        onSubmit={handleSubmitLocal}
      >
        {(formik) => {

          return (
            <Form>
              <div>
                <Grid component="div" className="top-grid" container>
                  <Grid item xs={12} className="after-top">
                    <FormControl control="input" name="Title" label="Title" setFun={(data)=>formik.setFieldValue("Title", data)}/>
                  </Grid>
                  <Grid item xs={12} className="innner-after">

                    <FormControl
                      control="input"
                      name="Description"
                      label="Description"
                      setFun={(data)=>formik.setFieldValue("Description" ,data )}
                    />
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} className="grid-line" >
                      <FormControl
                        control="file"
                        name="Multimedia"
                        label="Attach File"
                        setFun={(data) =>
                          formik.setFieldValue("Multimedia", data)
                        }
                        setFun1={(data) =>
                          formik.setFieldValue("Address", data)
                        }
                        handleMultimedia={(
                          data,
                          name,
                          extention,
                          MultimediaType
                        ) =>
                          handleMultimedia(
                            data,
                            name,
                            extention,
                            MultimediaType
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} className="grid-line" >
                      <FormControl
                        control="Address"
                        name="Address"
                        label="Attach File"
                      value={formik.values.Address}
                      setFun={() => formik.setFieldValue("Address","" )}
                      setFun2={() => formik.setFieldValue("Multimedia", "")}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={6} className="grid-line" >
                    <FormControl
                      control="Priority"
                      checkFor="LeadId"
                      name="LeadId"
                      label="Lead/Customer Name"
                      data={localLeadData}
                      setFun={(data) => formik.setFieldValue("LeadId", data)}
                    />
                  </Grid>
                  <Grid item xs={6} className="grid-line" >
                    <FormControl
                      control="date"
                      name="TaskEndDate"
                      label="Select Due Date"
                      setFun={(data) => {
                        return formik.setFieldValue("TaskEndDate", data);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} className="grid-line" >
                    <FormControl
                      control="Priority"
                      name="Priority"
                      label="Select Priority"
                    />
                  </Grid>
                  <Grid item xs={12} className="grid-line zind" >
                    <FormControl
                   
                      control="users"
                      name="TaskOwners"
                      label="Add CC Members"
                      userName="userCc"
                      users={usersCc}
                      usersIdObj={usersIdObj}
                      setUsersIdObj={(data) => setUsersIdObj(data)}
                      setUsersCc={setUsersCc}
                      openAddUser={openAddCc}
                      setUserCount={
                        (data) => formik.setFieldValue("TaskOwners", data)
                      }
                      setOpenAddUser={(data) => setOpenAddCc(data)}

                    />
                  </Grid>
                </Grid>
              </div>

              <div className="buttonDiv">
             
                <Button className="btnAdd"
                 id="Add" type="submit">
                  Add
                </Button>{" "}
              </div>
            </Form>
          );
        }}
      </Formik>

    </div>
  );
};

export default forwardRef(AssignOthers);
