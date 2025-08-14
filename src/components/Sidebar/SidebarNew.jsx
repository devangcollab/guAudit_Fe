// import React, { useState, useEffect } from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   Badge,
//   Collapse,
//   Tooltip,
// } from "@mui/material";
// import {
//   Dashboard,
//   Notifications,
//   Settings,
//   ExpandLess,
//   ExpandMore,
//   People,
//   SupportAgent,
// } from "@mui/icons-material";
// import { useNavigate, useLocation } from "react-router-dom";
// import logo from "../../assets/Clip path group.png";

// import minimizedLogo from "../../assets/h logo 1.png";
// import SegmentIcon from "@mui/icons-material/Segment";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import Inventory from "@mui/icons-material/Inventory";
// import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
// import Business from "@mui/icons-material/Business";
// import CategoryIcon from "@mui/icons-material/Category";
// import OnDeviceTrainingIcon from "@mui/icons-material/OnDeviceTraining";
// import DevicesIcon from "@mui/icons-material/Devices";
// import ColorizeIcon from "@mui/icons-material/Colorize";
// import StorageIcon from "@mui/icons-material/Storage";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import ArticleIcon from "@mui/icons-material/Article";
// import PersonIcon from "@mui/icons-material/Person";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import BuildIcon from "@mui/icons-material/Build";

// import PinDropIcon from "@mui/icons-material/PinDrop";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// import DraftsIcon from "@mui/icons-material/Drafts";
// import SourceIcon from "@mui/icons-material/Source";
// import CompareIcon from "@mui/icons-material/Compare";
// import LogoutIcon from "@mui/icons-material/Logout";

// const iconColor = "#000000"; // Custom icon color
// const activeColor = "#FDE5EB"; // Highlight color for selected item

// const SidebarNew = ({ setIsSidebarMinimized }) => {
//   const [isMinimized, setIsMinimized] = useState(false);

//   const toggleSidebar = () => {
//     const newState = !isMinimized;
//     setIsMinimized(newState);
//     setIsSidebarMinimized(newState); // pass back to Layout
//   };

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [openMenu, setOpenMenu] = useState({});
//   const [isMasterVisible, setIsMasterVisible] = useState(true);

//   const handleToggle = (label) => {
//     setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
//   };

//   const menuItems = [
//     {
//       path: "/dashboard",
//       label: "Dashboard",
//       icon: <Dashboard sx={{ color: iconColor }} />,
//     },
//     // ...(isMasterVisible
//     //   ? [
//     //       {
//     //         label: "Master",
//     //         icon: <People sx={{ color: iconColor }} />,
//     //         subMenu: [
//     //           {
//     //             path: "/organizationPage",
//     //             label: "Organization",
//     //             icon: <Business sx={{ color: iconColor }} />,
//     //           },
//     //           {
//     //             path: "/organizationBranchPage",
//     //             label: "Org. Branch",
//     //             icon: <Business sx={{ color: iconColor }} />,
//     //           },
//     //           {
//     //             path: "/category",
//     //             label: "Category",
//     //             icon: <CategoryIcon sx={{ color: iconColor }} />,
//     //           },
//     //           {
//     //             path: "/modelPage",
//     //             label: "Model",
//     //             icon: <OnDeviceTrainingIcon sx={{ color: iconColor }} />,
//     //           },
//     //           {
//     //             path: "/devicePage",
//     //             label: "Device",
//     //             icon: <DevicesIcon sx={{ color: iconColor }} />,
//     //           },
//     //           {
//     //             path: "/colorPage",
//     //             label: "Color",
//     //             icon: <ColorizeIcon sx={{ color: iconColor }} />,
//     //           },
//     //           {
//     //             path: "/capacityPage",
//     //             label: "Capacity",
//     //             icon: <StorageIcon sx={{ color: iconColor }} />,
//     //           },
//     //           {
//     //             path: "/userPage",
//     //             label: "Users",
//     //             icon: <PeopleAltIcon sx={{ color: iconColor }} />,
//     //           },
//     //         ],
//     //       },
//     //     ]
//     //   : []),
//     {
//       path: "/companyPage",
//       label: "Company",
//       icon: <Business sx={{ color: iconColor }} />,
//     },
//     {
//       path: "/locationPage",
//       label: "Location",
//       icon: <PinDropIcon sx={{ color: iconColor }} />,
//     },
//     {
//       path: "/userPage",
//       label: "Users",
//       icon: <PeopleAltIcon sx={{ color: iconColor }} />,
//     },
//     {
//       path: "/categoryPage",
//       label: "Category",
//       icon: <ListAltIcon sx={{ color: iconColor }} />,
//     },
//     // {
//     // label: "Report",
//     // icon: <ArticleIcon sx={{ color: iconColor }} />,
//     // subMenu: [
//     //   {
//     //     path: "/customerPage",
//     //     label: "Customer",
//     //     icon: <PersonIcon sx={{ color: iconColor }} />,
//     //   },
//     //   {
//     //     path: "/expensePage",
//     //     label: "Expense",
//     //     icon: <AccountBalanceWalletIcon sx={{ color: iconColor }} />,
//     //   },
//     //   {
//     //     path: "/customerLedgerPage",
//     //     label: "Customer Ledger",
//     //     icon: <MenuBookIcon sx={{ color: iconColor }} />,
//     //   },
//     //   {
//     //     path: "/plTable",
//     //     label: "Profit & Loss",
//     //     icon: <AssessmentIcon sx={{ color: iconColor }} />,
//     //   },
//     // ],
//     // },
//     {
//       path: "/questionPage",
//       label: "Add Question",
//       icon: <HelpOutlineIcon sx={{ color: iconColor }} />,
//     },
//     {
//       path: "/fillForm",
//       label: "Fill Form",
//       icon: <AppRegistrationIcon sx={{ color: iconColor }} />,
//     },
//     {
//       path: "/draftPage",
//       label: "Drafts",
//       icon: <DraftsIcon sx={{ color: iconColor }} />,
//     },
//     {
//       path: "/formRecords",
//       label: "Form Records",
//       icon: <SourceIcon sx={{ color: iconColor }} />,
//     },
//     {
//       path: "/compareScorePage",
//       label: "Compare Score",
//       icon: <CompareIcon sx={{ color: iconColor }} />,
//     },
//   ];
//   const isActive = (path) => location.pathname === path;

//   const handleLogout = async () => {
//     localStorage.clear()
//     navigate("/");
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: isMinimized ? 100 : 240,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: isMinimized ? 100 : 240,
//           boxSizing: "border-box",
//           background: "#ffffff",
//           color: iconColor,
//           height: "100vh",
//           overflowX: "auto",
//           scrollbarGutter: "none",
//           display: "flex",
//           flexDirection: "column",
//           transition: "width 0.5s",
//           overflowY: "auto", // still allow vertical scroll if needed
//         },
//       }}
//     >
//       {/* fixed header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-around",
//           //   py: 2,
//           height: "4rem",
//           px: isMinimized ? 1 : 2,
//           position: "sticky",
//           top: 0,
//           background: "#E8194F",
//           zIndex: 1000,
//         }}
//       >
//         {isMinimized ? (
//           <img
//             src={minimizedLogo} // Replace with the path to your minimized logo
//             alt="Minimized Logo"
//             style={{ width: 40, cursor: "pointer" }} // Adjust size as needed
//             onClick={() => navigate("/")}
//           />
//         ) : (
//           <img
//             src={logo} // Replace with the path to your normal logo
//             alt="Logo"
//             style={{ width: 130, cursor: "pointer" }}
//             onClick={() => navigate("/")}
//           />
//         )}
//         <SegmentIcon
//           sx={{
//             height: 30,
//             width: 30,
//             borderRadius: 50,
//             padding: 0.4,
//             cursor: "pointer",
//             color: "white",
//           }}
//           onClick={toggleSidebar}
//         />
//       </Box>

//       {/* Scrollable Menu Items */}

//       <Box
//         sx={{
//           flex: 1,
//           overflowY: "auto",
//         }}
//       >
//         <List>
//           {menuItems.map((item) =>
//             item.subMenu ? (
//               <React.Fragment key={item.label}>
//                 <ListItemButton
//                   onClick={() => handleToggle(item.label)}
//                   sx={{
//                     justifyContent: isMinimized ? "center" : "flex-start",
//                   }}
//                 >
//                   <Tooltip title={isMinimized && item.label}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                   </Tooltip>
//                   {!isMinimized && <ListItemText primary={item.label} />}
//                   {openMenu[item.label] ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>

//                 {isMinimized ? (
//                   // Submenu directly below in minimized state
//                   openMenu[item.label] && (
//                     <Box sx={{ pl: 2 }}>
//                       {item.subMenu.map((subItem) => (
//                         <ListItemButton
//                           key={subItem.label}
//                           sx={{
//                             justifyContent: "center",
//                             backgroundColor: isActive(subItem.path)
//                               ? activeColor
//                               : "transparent",
//                           }}
//                           onClick={() => {
//                             if (isActive(subItem.path)) {
//                               toggleSidebar();
//                             } else {
//                               navigate(subItem.path);
//                             }
//                           }}
//                         >
//                           <Tooltip title={isMinimized && subItem.label}>
//                             <ListItemIcon>{subItem.icon}</ListItemIcon>
//                           </Tooltip>
//                         </ListItemButton>
//                       ))}
//                     </Box>
//                   )
//                 ) : (
//                   <Collapse
//                     in={openMenu[item.label]}
//                     timeout="auto"
//                     unmountOnExit
//                   >
//                     <List component="div" disablePadding>
//                       {item.subMenu.map((subItem) => (
//                         <ListItemButton
//                           key={subItem.label}
//                           sx={{
//                             pl: 4,
//                             backgroundColor: isActive(subItem.path)
//                               ? activeColor
//                               : "transparent",
//                           }}
//                           onClick={() => {
//                             if (isActive(subItem.path)) {
//                               toggleSidebar();
//                             } else {
//                               navigate(subItem.path);
//                             }
//                           }}
//                         >
//                           <Tooltip title={isMinimized && subItem.label}>
//                             <ListItemIcon>{subItem.icon}</ListItemIcon>
//                           </Tooltip>
//                           <ListItemText primary={subItem.label} />
//                         </ListItemButton>
//                       ))}
//                     </List>
//                   </Collapse>
//                 )}
//               </React.Fragment>
//             ) : (
//               <ListItemButton
//                 key={item.path}
//                 onClick={() => {
//                   if (isActive(item.path)) {
//                     toggleSidebar();
//                   } else {
//                     navigate(item.path);
//                   }
//                 }}
//                 sx={{
//                   backgroundColor: isActive(item.path)
//                     ? activeColor
//                     : "transparent",
//                   "&:hover": { backgroundColor: activeColor },
//                 }}
//               >
//                 <Tooltip title={isMinimized && item.label}>
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                 </Tooltip>
//                 {!isMinimized && <ListItemText primary={item.label} />}
//               </ListItemButton>
//             )
//           )}
//         </List>
//       </Box>

//       {/* Fixed Footer */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 1,
//           p: isMinimized ? 1 : 2, // Adjust padding based on sidebar state
//           background: "#ffffff",
//           position: "sticky",
//           bottom: 0,
//           zIndex: 1000,
//         }}
//       >
//         <ListItemButton
//           sx={{
//             justifyContent: isMinimized ? "center" : "flex-start",
//             "&:hover": { backgroundColor: activeColor },
//           }}
//         >
//           <ListItemIcon onClick={handleLogout}>
//             <Badge color="primary">
//               <LogoutIcon sx={{ color: iconColor }} />
//             </Badge>
//           </ListItemIcon>
//           {!isMinimized && <ListItemText primary="Log Out" />}
//         </ListItemButton>

//         {/* <ListItemButton
//           sx={{
//             justifyContent: isMinimized ? "center" : "flex-start",
//           }}
//         >
//           <ListItemIcon>
//             <SupportAgent sx={{ color: iconColor }} />
//           </ListItemIcon>
//           {!isMinimized && <ListItemText primary="Support" />}
//         </ListItemButton> */}

//         {/* <ListItemButton
//           sx={{
//             justifyContent: isMinimized ? "center" : "flex-start",
//           }}
//         >
//           <ListItemIcon>
//             <Settings sx={{ color: iconColor }} />
//           </ListItemIcon>
//           {!isMinimized && <ListItemText primary="Settings" />}
//         </ListItemButton> */}
//       </Box>
//     </Drawer>
//   );
// };

// export default SidebarNew;

import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Badge,
  Collapse,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Dashboard, ExpandLess, ExpandMore, People } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Clip path group.png";
import minimizedLogo from "../../assets/h logo 1.png";
import SegmentIcon from "@mui/icons-material/Segment";
import Business from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DraftsIcon from "@mui/icons-material/Drafts";
import SourceIcon from "@mui/icons-material/Source";
import CompareIcon from "@mui/icons-material/Compare";
import LogoutIcon from "@mui/icons-material/Logout";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { isAdmin, isSuperAdmin, isUser } from "../../utils/auth";

const iconColor = "#000000";
const activeColor = "#FDE5EB";

const SidebarNew = ({ setIsSidebarMinimized }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoginUser, setIsLoginUser] = useState(null);

  useEffect(() => {
    if (isUser()) {
      setIsLoginUser("user");
    } else if (isAdmin()) {
      setIsLoginUser("admin");
    } else {
      setIsLoginUser("superAdmin");
    }
  }, []);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // 1024px

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      const newState = !isMinimized;
      setIsMinimized(newState);
      setIsSidebarMinimized(newState);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState({});
  const handleToggle = (label) => {
    setOpenMenu((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <Dashboard sx={{ color: iconColor }} />,
    },
    {
      path: "/companyPage",
      label: "Company",
      icon: <Business sx={{ color: iconColor }} />,
    },
    {
      path: "/locationPage",
      label: "Location",
      icon: <PinDropIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/userPage",
      label: "Users",
      icon: <PeopleAltIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/categoryPage",
      label: "Category",
      icon: <ListAltIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/auditPage",
      label: "Audit Template",
      icon: <HelpOutlineIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/fillForm",
      label: "Fill Form",
      icon: <AppRegistrationIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/assignedPage",
      label: "Assigned",
      icon: <DraftsIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/formRecords",
      label: "Form Records",
      icon: <SourceIcon sx={{ color: iconColor }} />,
    },
    {
      path: "/compareScorePage",
      label: "Compare Score",
      icon: <CompareIcon sx={{ color: iconColor }} />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  let allowedLabels = [];

  switch (isLoginUser) {
    case "superAdmin":
      allowedLabels = [
        "Dashboard",
        "Company",
        "Location",
        "Users",
        "Category",
        "Audit Template",
        "Assigned",
        "Form Records",
        "Compare Score"
      ];
      break;

    case "admin":
      allowedLabels = [
        "Dashboard",
        "Company",
        "Location",
        "Users",
        "Category",
        "Audit Template",
        "Assigned",
        "Drafts",
        "Form Records",
        "Compare Score",
      ];
      break;

    case "user":
      allowedLabels = ["Dashboard", "Fill Form", "Drafts", "Form Records"];
      break;

    default:
      allowedLabels = []; // or show minimal menu
      break;
  }

  // Now filter menuItems based on allowed labels
  const filteredMenuItems = menuItems.filter((item) =>
    allowedLabels.includes(item.label)
  );

  // Then map over `filteredMenuItems` to render

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isMinimized && !isMobile ? 100 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMinimized && !isMobile ? 100 : 240,
            boxSizing: "border-box",
            background: "#ffffff",
            color: iconColor,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.5s",
            overflowY: "auto",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "4rem",
            px: isMinimized ? 1 : 2,
            background: "#E8194F",
            zIndex: 1000,
          }}
        >
          <img
            src={isMinimized && !isMobile ? minimizedLogo : logo}
            alt="Logo"
            style={{
              width: isMinimized && !isMobile ? 40 : 130,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          {!isMobile && (
            <SegmentIcon
              sx={{
                height: 30,
                width: 30,
                borderRadius: 50,
                padding: 0.4,
                cursor: "pointer",
                color: "white",
              }}
              onClick={toggleSidebar}
            />
          )}
        </Box>

        {/* Menu Items */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <List>
            {filteredMenuItems.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => {
                  if (isActive(item.path)) {
                    toggleSidebar();
                  } else {
                    navigate(item.path);
                    if (isMobile) setMobileOpen(false); // Close after select
                  }
                }}
                sx={{
                  backgroundColor: isActive(item.path)
                    ? activeColor
                    : "transparent",
                  "&:hover": { backgroundColor: activeColor },
                  justifyContent:
                    isMinimized && !isMobile ? "center" : "flex-start",
                }}
              >
                <Tooltip title={isMinimized && !isMobile ? item.label : ""}>
                  <ListItemIcon sx={{ color: iconColor }}>
                    {item.icon}
                  </ListItemIcon>
                </Tooltip>
                {!isMinimized || isMobile ? (
                  <ListItemText primary={item.label} />
                ) : null}
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: isMinimized && !isMobile ? 1 : 2,
            background: "#ffffff",
            position: "sticky",
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <ListItemButton
            onClick={handleLogout}
            sx={{
              justifyContent:
                isMinimized && !isMobile ? "center" : "flex-start",
              "&:hover": { backgroundColor: activeColor },
            }}
          >
            <ListItemIcon>
              <Badge color="primary">
                <LogoutIcon sx={{ color: iconColor }} />
              </Badge>
            </ListItemIcon>
            {!isMinimized || isMobile ? (
              <ListItemText primary="Log Out" />
            ) : null}
          </ListItemButton>
        </Box>
      </Drawer>

      {/* Toggle Icon for Mobile - Place this in your AppBar/header */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 2000,
            background: "#E8194F",
            borderRadius: "50%",
            p: 1,
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        >
          <SegmentIcon sx={{ color: "#fff" }} />
        </Box>
      )}
    </>
  );
};

export default SidebarNew;
