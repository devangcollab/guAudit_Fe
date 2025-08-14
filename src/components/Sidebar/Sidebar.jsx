// // /components/Sidebar/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  IconButton,
  Box,
} from "@mui/material";
import {
  Dashboard,
  Business,
  LocationOn,
  People,
  Category,
  Assignment,
  Menu,
} from "@mui/icons-material";
import logo from "../../assets/Clip path group.png"
import { useNavigate } from "react-router-dom";

const navItems = [
  { text: "Dashboard", icon: <Dashboard /> , path:"/dashboard" },
  { text: "Company", icon: <Business /> },
  { text: "Location", icon: <LocationOn /> },
  { text: "Users", icon: <People /> },
  { text: "Category", icon: <Category /> },
  { text: "Add Question", icon: <Assignment /> },
];

const Sidebar = () => {
  const isMobile = useMediaQuery("(max-width: 1700px)");
  const [open, setOpen] = React.useState(!isMobile);

  const navigate = useNavigate();

  return (
    <>
       
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}
        >
          <Menu sx={{color:"white"}}/>
        </IconButton>
    
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
            // backgroundColor: "#fff",
            // border:"none"
          },
        }}
      >
        <Box sx={{height:"4rem",pl:2 , pr:2, backgroundColor:"#E8194F"  , display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
          <img src={logo} alt="hocco logo" onClick={() => navigate("/")} />
          {/* {!isMobile && <IconButton sx={{color:"#fff"}}> 
          <Menu />
        </IconButton>} */}
        </Box>
        
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} >
              <ListItemIcon sx={{ color: "#E8194F" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

 











 


