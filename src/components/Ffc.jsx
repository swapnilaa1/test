import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Billings from "./Billings";
import Dashboard from "./Dashboard";
import Mytask from "./Mytask";
import MyTeams from "./MyTeams";
import Navbar from "./Navbar";
import Settings from "./Settings";
import Sidbar from "./Sidbar";
import MiniDrawer from "./TestSidebar";

const Ffc = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    }
  }, []);
  return (
    <div>
      
      <MiniDrawer />
      <Outlet />
    </div>
  );
};

export default Ffc;
