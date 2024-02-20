import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";

import HomeIcon from "@mui/icons-material/Home";
import Appointments from "../../views/Appointments/Appointments";
import Customers from "../../views/Customers/Customers";
import Payments from "../../views/Payments/Payments";
import Team from "../../views/Team/Team";
import Analitycs from "../../views/Analitycs/Analitycs";
import Dashboard from "../../views/Dashboard/Dashboard";

import { Link, Routes, Route, useLocation } from "react-router-dom";

const drawerWidth = 180;
const appHeight = 40;

export default function SideBar() {
  const { pathname } = useLocation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}

        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          height: `${appHeight}px`,
          marginTop: "0",
          // zIndex: "1",
        }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Bendahan
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          zIndex: "0",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: drawerWidth,
            boxSizing: "border-box",
            // border:'solid 3px red'
          },
        }}
        variant="permanent"
        anchor="left">
        <Divider />
        <List>
          <ListItem
            key={"Appointments"}
            disablePadding
            sx={{ bgcolor: pathname === "/" ? "#2196f3" : null }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton sx={{ padding: "6px 12px" }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <HomeIcon
                    color="primary"
                    sx={{ color: pathname === "/" ? grey[300] : null }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Appointments"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            key={"Customers"}
            disablePadding
            sx={{ bgcolor: pathname === "/Customers" ? "#2196f3" : null }}>
            <Link
              to="/Customers"
              style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton sx={{ padding: "6px 12px" }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <HomeIcon
                    color="primary"
                    sx={{ color: pathname === "/Customers" ? grey[300] : null }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Customers"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            key={"Payments"}
            disablePadding
            sx={{ bgcolor: pathname === "/Payments" ? "#2196f3" : null }}>
            <Link
              to="/Payments"
              style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton sx={{ padding: "6px 12px" }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <HomeIcon
                    color="primary"
                    sx={{ color: pathname === "/Payments" ? grey[300] : null }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Payments"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            key={"Analitycs"}
            disablePadding
            sx={{ bgcolor: pathname === "/Analitycs" ? "#2196f3" : null }}>
            <Link
              to="/Analitycs"
              style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton sx={{ padding: "6px 12px" }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <HomeIcon
                    color="primary"
                    sx={{ color: pathname === "/Analitycs" ? grey[300] : null }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Analitycs"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            key={"Dashboard"}
            disablePadding
            sx={{ bgcolor: pathname === "/Dashboard" ? "#2196f3" : null }}>
            <Link
              to="/Dashboard"
              style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton sx={{ padding: "6px 12px" }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <HomeIcon
                    color="primary"
                    sx={{ color: pathname === "/Dashboard" ? grey[300] : null }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            key={"Team"}
            disablePadding
            sx={{ bgcolor: pathname === "/Team" ? "#2196f3" : null }}>
            <Link
              to="/Team"
              style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton sx={{ padding: "6px 12px" }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <HomeIcon
                    color="primary"
                    sx={{ color: pathname === "/Team" ? grey[300] : null }}
                  />
                </ListItemIcon>
                <ListItemText primary={"Team"} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          position: "fixed",
          // border: "solid 2px red",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center", // Centrar horizontalmente
          alignItems: "center", // Centrar verticalmente
          bgcolor: "background.default",
          // p: 3,
          ml: `${drawerWidth}px`,
          marginTop: `${appHeight}px`, // Margen superior igual a la altura de la AppBar
          height: `calc(100vh - ${appHeight}px)`, // Altura que ocupa el restante de la pantalla
          width: `calc(100% - ${drawerWidth}px)`,
        }}>
        <Routes>
          <Route path="/" element={<Appointments />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/Analitycs" element={<Analitycs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Team" element={<Team />} />
        </Routes>
      </Box>
    </Box>
  );
}
