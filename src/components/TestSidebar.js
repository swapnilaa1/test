import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Button, CircularProgress, Grid, Menu, MenuItem } from "@mui/material";
import { toastobj } from "../utility/toastobj";
import { toast } from "react-toastify";
import DateTime from "./DateTime";
import "./test.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyTasks } from "../redux/myTasksSlice";
import { postGetTeams } from "../redux/postGetTeamsSlice";
import { Stack } from "@mui/system";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${theme.spacing(8)} + 1px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const data = [
  {
    id: 1,
    title: "Dashboard",
    link: "/dashboard",
    source:
      "https://testffc.nimapinfotech.com/assets/media/sidebar/dashboardLogo.svg",
  },
  {
    id: 2,
    title: "My Teams",
    link: "/myteams",
    source:
      "https://testffc.nimapinfotech.com/assets/media/sidebar/teamLogo.svg",
  },
  {
    id: 3,
    title: "My Tasks",
    link: "/mytasks",
    source:
      "https://testffc.nimapinfotech.com/assets/media/sidebar/taskLogo.svg",
  },
  {
    id: 4,
    title: "Billing",
    link: "/billing",
    source:
      "https://testffc.nimapinfotech.com/assets/media/sidebar/billingLogo.svg",
  },
  {
    id: 5,
    title: "Settings",
    link: "/settings/test",
    source:
      "https://testffc.nimapinfotech.com/assets/media/sidebar/settingLogo.svg",
  },
];

export default function MiniDrawer({ setSelectedTitle, selectedTitle }) {
  const dispatch = useDispatch();

  const { tasksLoading, sendData ,isListFetching , } = useSelector(
    (state) => state.mytasksReducer
  );
  const { isTeamLoading } = useSelector((state) => state.postTeamReducer);
  const navigate = useNavigate();
  const theme = useTheme();
  const [personAnchr, setPersonAnchr] = useState(null);
  const isPersonOPen = Boolean(personAnchr);

  const [open, setOpen] = useState(false);

  const resp = {
    display: { md: "flex", xs: "none", sm: "none" },
  };

  const mobres = {
    display: { md: "none", xs: "flex", sm: "flex" },
  };

  const handleSignOut = () => {
    closePerson();
    localStorage.clear();
    navigate("/login");
    toast.success("User Logged Out", toastobj);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openPerson = (e) => {
    setPersonAnchr(e.currentTarget);
  };

  const closePerson = () => {
    setPersonAnchr(null);
  };

  const handleSidbar = (title) => {
    setSelectedTitle(title);
  };

  const Person = (
    <Menu anchorEl={personAnchr} id="person" keepMounted open={isPersonOPen}>
      <MenuItem onClick={() => closePerson()}>Profile Photo</MenuItem>
      <MenuItem>Personal Info</MenuItem>
      <MenuItem>My Tasks</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
       navigate("/login")
    }
  }, []);

  return (
    <Box style={{}}>
      <div
        id="loader"
        style={{
          display: "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <div style={{}}>
          <CircularProgress color="success" />
        </div>
      </div>

      <div id="main_content" style={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="info" className="appbar1">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
                ...(!open && { display: "none" }),
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <div style={{ flexGrow: "1" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontSize: 17, fontWeight: 500 }}
              >
                {selectedTitle}{" "}
                <h4
                  style={{
                    display: "inline-block",
                    marginLeft: "8px",
                    opacity: "0.3",
                    height: "fit-content",
                  }}
                >
                  |
                </h4>
              </Typography>
            </div>
            <div>
              <DateTime />
            </div>
            <Grid component="div" sx={resp}>
              <div
              className="Username"
                color="primary"
                onClick={openPerson}
                
              >
                <Stack direction="row" spacing={1} sx={{mt:1 , ml:2}}>
                <Avatar
                  alt="Remy Sharp"
                  src=""
                  sx={{ width: 30, height: 30 }}
                /><div style={{marginTop:"3px"}}>Swapnil Bhongale</div>
                </Stack>
                
                
              </div>
            </Grid>
            <Grid component="div" sx={mobres}>
              <IconButton onClick={openPerson}>
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {open && (
              <div style={{ display: "flex" }}>
                <img
                  height="20px"
                  src="https://testffc.nimapinfotech.com/image/New%20Images/FFC/FFC-logo.png"
                  style={{ marginRight: "12px" }}
                />
                <Typography
                  sx={{ marginRight: "10px", fontSize: 12, fontWeight: "550" }}
                >
                  BETA FIELD FORCE
                </Typography>
              </div>
            )}
            <IconButton onClick={!open ? handleDrawerOpen : handleDrawerClose}>
              {!open ? (
                <KeyboardDoubleArrowRightIcon fontSize="large" />
              ) : (
                <KeyboardDoubleArrowLeftIcon fontSize="large" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List onMouseEnter={handleDrawerOpen}>
            {data.map((text, index) => (
              <ListItem key={text.id} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to={text.link}
                  sx={{
                    minHeight: 48,
                    fontSize: 21,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <img
                    style={{
                      minWidth: "20px",
                      marginRight: open ? "15px" : "auto",
                      justifyContent: "center",
                      height: "20px",
                    }}
                    src={text.source}
                  />

                  <ListItemText
                    primary={text.title}
                    sx={{ opacity: open ? 1 : 0 }}
                    onClick={() => handleSidbar(text.title)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" className="outlet_main">
          <DrawerHeader />

          <Outlet />
        </Box>
        <br />
        {Person}
      </div>
    </Box>
  );
}
