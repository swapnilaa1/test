import Mytask from "./components/Mytask";
import { Route, Routes } from "react-router-dom";
import MyTeams from "./components/MyTeams";
import Billings from "./components/Billings";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Ffc from "./components/Ffc";
import MiniDrawer from "./components/TestSidebar";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Login /> */}
      <Routes>
        <Route path="/" element={<MiniDrawer />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="mytasks" element={<Mytask />} />
          <Route path="myteams" element={<MyTeams />} />
          <Route path="billing" element={<Billings />} />
          <Route path="settings/test" element={<Settings />} />
        </Route>

        <Route path="login" element={<SignIn />} />
        {/* <Route path="login" element={<Login />} /> */}
      </Routes>
    </div>
  );
}

export default App;
