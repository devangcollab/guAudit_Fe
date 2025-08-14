// import React, { useEffect, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   Button,
//   Avatar,
//   List,
//   ListItem,
//   Popper,
//   Paper,
//   ClickAwayListener,
// } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import moment from "moment";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Business, Logout } from "@mui/icons-material";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import GTranslateIcon from '@mui/icons-material/GTranslate';
// import userImage from "../../assets/Group 428.png"

// const  Header = ({isSidebarMinimized}) => {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({});
//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const response = await axios.get("http://localhost:4000/api/findUser", {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         });
// //         setUserData(response.data.data);
// //       } catch (error) {
// //         console.log(error.message);
// //       }
// //     })();
// //   }, []);

// //   const formattedDate = moment().format("DD MMM. YYYY");

// //   const handleClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //     setOpen((prev) => !prev);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   const fetchLogOut = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.post(
// //         "http://localhost:4000/api/createActivityLog",
// //         { message: "logout" }, // Request body (empty if you're not sending any data)
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       if (response.status === 200) {
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("role");
// //       } else {
// //         console.log("Error logging out");
// //       }
// //     } catch (error) {
// //       console.log(error.message);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     await fetchLogOut();
// //     navigate("/signIn");
// //   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor: "#E8194F",
//         color: "black",
//         boxShadow: 1,
//         paddingX: 2,
//         zIndex: 1100, // Ensures it stays above other elements
//         top: 0,
//          width: `calc(100% - ${isSidebarMinimized ? "100px" : "240px"})`,
//           transition: "width 0.5s, left 0.3s",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography>
//           {/* Dashboard */}
//           </Typography>
//         <Box display="flex" alignItems="center" gap={2}>

//           <IconButton
//             sx={{ backgroundColor: "white",border:"1px solid white", borderRadius: "50%", width: 35, height: 35  }}
//           >
//             <GTranslateIcon sx={{ color: "#5C4E89" }} />
//           </IconButton>

//            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Avatar
//                       src={userImage}
//                       alt="userImage"
//                       sx={{ width: 35, height: 35 }}

//                     />
//                     <Box sx={{ color: "#fff", textAlign: "left" }}>
//                       <Typography variant="body2">Devang Patel</Typography>
//                       <Typography variant="caption">Admin</Typography>
//                     </Box>
//                   </Box>

//           {/* <Popper
//             open={open}
//             anchorEl={anchorEl}
//             placement="bottom-end"
//             disablePortal
//           >
//             <ClickAwayListener onClickAway={""}>
//               <Paper sx={{ mt: 1, borderRadius: 2, boxShadow: 3 }}>
//                 <List>
//                   <ListItem button onClick={() => navigate("/activityLog")}>
//                     <AccountCircleRoundedIcon>
//                       <Business sx={{ color: "primary" }} />
//                     </AccountCircleRoundedIcon>
//                     Activity Logs
//                   </ListItem>
//                   <ListItem  button>
//                     <LogoutIcon>
//                       <Logout sx={{ color: "primary" }} />
//                     </LogoutIcon>
//                     Logout
//                   </ListItem>
//                 </List>
//               </Paper>
//             </ClickAwayListener>
//           </Popper> */}
//         </Box>
//       </Toolbar>

//     </AppBar>
//   );
// };

// export default Header;

// // Ensure the main content has a top margin equal to AppBar's height
// export const headerHeight = 64;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import userImage from "../../assets/Group 428.png";

const Header = ({ isSidebarMinimized }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.warn("Invalid user data in localStorage", error);
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // optionally remove token if stored
    localStorage.removeItem("token");
    // redirect to login
    window.location.href = "/";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#E8194F",
        color: "black",
        boxShadow: 1,
        paddingX: 2,
        zIndex: 1100,
        height: "4rem",
        display: "flex",
        justifyContent: "center",
        left: isMobile ? 0 : isSidebarMinimized ? "100px" : "240px",
        width: isMobile
          ? "100%"
          : `calc(100% - ${isSidebarMinimized ? "100px" : "240px"})`,
        transition: "width 0.3s, left 0.3s",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "4rem !important",
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          {/* Dashboard */}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} onClick={handleMenuOpen}>
            <IconButton >
              <Avatar src={userImage} alt="User" sx={{ width: 35, height: 35 }} />
            </IconButton>
            <Box sx={{ color: "#fff", textAlign: "left" }}>
              <Typography variant="body2">
                {userData?.name || "Guest"}
              </Typography>
              <Typography variant="caption">
                {userData?.role || "Role"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// Export consistent height to use in Layout
export const headerHeight = 64;
