import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({setSelectedTitle , selectedTitle}) => {
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTitle("Dashboard")
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
