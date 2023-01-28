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
import { Button, Grid, Menu, MenuItem } from "@mui/material";

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
  // necessary for content to be below app bar
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
    link: "/settings",
    source:
      "https://testffc.nimapinfotech.com/assets/media/sidebar/settingLogo.svg",
  },
];

export default function MiniDrawer() {
  const [selectedTitle , setSelectedTitle]=useState("Dashboard");
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
    navigate("/auth/login");
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

  const handleSidbar=(title)=>{
    setSelectedTitle(title)

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
      // navigate("/auth/login")
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            <MenuIcon fontSize="small"/>
          </IconButton>
          <div style={{flexGrow:"1"}}>
          <Typography variant="h6" noWrap component="div">
            {selectedTitle}
          </Typography>
          </div>
          <div>
            <Button variant="h5">Time</Button>
            <Button variant="h5">Date</Button>
            <Button color="secondary">Punch In</Button>
          </div>
          <Grid component="div" sx={resp}>
            <Button color="secondary" onClick={openPerson}>
              UserName
            </Button>
          </Grid>
          <Grid component="div" sx={mobres}>
            <IconButton onClick={openPerson}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer  variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <div style={{ display: "flex" }}>
              <img
                height="20px"
                src="https://testffc.nimapinfotech.com/image/New%20Images/FFC/FFC-logo.png"
                style={{ marginRight: "10px" }}
              />
              <Typography sx={{ marginRight: "8px" }}>
                Beta Field Force
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
                  onClick={()=>handleSidbar(text.title)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}

        <Outlet />
      </Box>
      {Person}
    </Box>
  );
}
