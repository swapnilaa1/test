import { CheckBox } from "@mui/icons-material";
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLeads } from "../../redux/leadsSlice";
import SelectUser from "./SelectUser";
import * as Yup from "yup";
import FormControl from "../FormControl";

const initialState = {
  Title: "",
  Address: "",
  Description: "",
  Multimedia: "",
  LeadId: null,
  TaskEndDate: "",
  Priority: "",
  UserIds: "", // user having ids // set No of valuyes
  TaskOwners: "", //cc array of object {UserId:200 , Name:"swapnil anil bhongale"} // set no of values
};
const form_validation = Yup.object().shape({
  Title: Yup.string().required("Required"),
  Description: Yup.string().required("Required"),
  Multimedia: Yup.string().required("Required"),
  UserIds: Yup.string().required("Required"),
  TaskOwners: Yup.string().required("Required"),
  //TaskEndDate: Yup.string().required("Required"),
  Priority: Yup.string().required("Required"),
});

const AssignOthers = ({ submitForm }) => {
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

  const handleMultimedia = (baseString, mediaName, mediaExtention) => {
    console.log("all 3 in handle", baseString, mediaName, mediaExtention);
    setMediaObject({
      MultimediaData: baseString,
      MultimediaFileName: mediaName,
      MultimediaExtension: mediaExtention,
      MultimediaType: "",
    });
  };

  const handleSubmit = (values) => {
    // send users1 and usersCc as
    console.log("values while sbmitting", values);
  };
  console.log("media object", MediaObject);
  useEffect(() => {
    dispatch(getLeads());
  }, []);
  //  console.log("users ", users1, usersCc);
  return (
    <div>
      <Formik
        initialValues={initialState}
        validationSchema={form_validation}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          console.log("values", formik.values);
          return (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl control="input" name="Title" label="Title" />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    control="input"
                    name="Description"
                    label="Description"
                  />
                </Grid>

                <Grid container>
                  <Grid item xs={12}>
                    <FormControl
                      control="file"
                      name="Multimedia"
                      label="Attach File"
                      setFun={(data) =>
                        formik.setFieldValue("Multimedia", data)
                      }
                      setFun1={(data) => formik.setFieldValue("Address", data)}
                      handleMultimedia={(data, name, extention) =>
                        handleMultimedia(data, name, extention)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      control="Address"
                      name="Address"
                      label="Attach File"
                    />
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  Lead Customer name
                  {/* <TextField
                    placeholder="none"
                    type="date"
                    fullWidth="true"
                    variant="standard"
                  /> */}
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    control="date"
                    name="TaskEndDate"
                    label="Select Due Date"
                  />
                </Grid>
                <Grid item xs={6}>
                  Priority
                  <FormControl
                    control="Priority"
                    name="Priority"
                    label="Select Priority"
                    setFun={(data) => formik.setFieldValue("Priority", data)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    control="users"
                    name="UserIds"
                    label="Add Users"
                    setOpenAddUser={(data) => setOpenAddUser(data)}
                    // value={users1Value}
                    // userCount={usersCcValue}
                    setFun={(data) =>
                      formik.setFieldValue("UserIds", `${users1Value} Users`)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    control="users"
                    name="TaskOwners"
                    label="Add CC Members"
                    setOpenAddUser={(data) => setOpenAddCc(data)}
                    // value={usersCcValue}
                  />
                </Grid>
              </Grid>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
      {/* <Box component="form">
        <TextField fullWidth label="Title" variant="standard" />
        <TextField fullWidth label="Description" variant="standard" />
        <TextField fullWidth label="Attach File" variant="standard" />
        <TextField label="Lead Customer Name" variant="standard" />

        <TextField label="Select Due Date" variant="standard" />

        <TextField
          label="Select Priority"
          variant="standard"
          select
          value={Priority}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="High">Hign Priority</MenuItem>
          <MenuItem value="Low">Low Priority</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Add Users"
          variant="standard"
          onClick={() => setOpenAddUser(true)}
        />
        <TextField
          fullWidth
          label="Add CC Members"
          variant="standard"
          InputProps={{
            readOnly: true,
          }}
          value={usersCc.length !== 0 ? `${usersCc.length} Users` : ""}
          onClick={() => setOpenAddCc(true)}
        />
      </Box> */}
      <SelectUser
        userName="userId"
        users={users1}
        setUsers={setUsers1}
        openAddUser={openAddUser}
        setOpenAddUser={(data) => setOpenAddUser(data)}
        setUserCount={(data) => setUsers1Value(data)}
      />
      <SelectUser
        userName="userCc"
        users={usersCc}
        usersIdObj={usersIdObj}
        setUsersIdObj={(data) => setUsersIdObj(data)}
        setUsersCc={setUsersCc}
        openAddUser={openAddCc}
        setUserCount={(data) => setUsersCcValue(data)}
        setOpenAddUser={(data) => setOpenAddCc(data)}
      />
    </div>
  );
};

export default AssignOthers;
