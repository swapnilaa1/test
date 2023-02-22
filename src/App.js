import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import MiniDrawer from "./components/TestSidebar";
import SignIn from "./components/SignIn";
import { CircularProgress, colors, createTheme, Snackbar, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard= lazy(() =>
  import("./components/Dashboard")
);

const Settings= lazy(() =>
  import("./components/Settings")
);
const Mytask= lazy(() =>
  import("./components/Mytask")
);
const MyTeams= lazy(() =>
  import("./components/MyTeams")
);
const Billings= lazy(() =>
  import("./components/Billings")
);


const theme=createTheme({
  palette:{
    secondary:{
      main: colors.grey[100],
      light:colors.grey[500]
    },
    primary:{
      main:"#2979ff",
      light:colors.grey[500],
    },
    info:{
      main:colors.grey[100],
      light:"#9e9e9e",
    }
   
  },
  mixins:{
    toolbar:{
      minHeight:46
    }
  },
  shadows:[15]
})

function App() {
  const {toastMsg , sign } = useSelector((state)=>state.signInReducer);
  const [signin , setSignin]= useState(false)
  const [selectedTitle, setSelectedTitle] = useState("");

  return (
    <Suspense fallback={<CircularProgress />}>
    <ThemeProvider theme={theme}>
     
    <div className="App">
    
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
      <Routes>
        <Route path="/" element={<MiniDrawer setSelectedTitle={(data)=>setSelectedTitle(data)} selectedTitle={selectedTitle}/>}>
          <Route path="dashboard" element={<Dashboard setSelectedTitle={(data)=>setSelectedTitle(data)}/>} />
          <Route path="mytasks" element={<Mytask setSelectedTitle={(data)=>setSelectedTitle(data)}/>} />
          <Route path="myteams" element={<MyTeams setSelectedTitle={(data)=>setSelectedTitle(data)}/>} />
          <Route path="billing" element={<Billings />} />
          <Route path="settings/test" element={<Settings />} />
        </Route>

        <Route path="login" element={<SignIn />} />
        {/* <Route path="login" element={<Login />} /> */}
      </Routes>
    </div>
    </ThemeProvider>
    </Suspense>
  );
}

export default App;
