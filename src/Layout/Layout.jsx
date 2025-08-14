// /layout/Layout.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Box } from "@mui/material";

// const drawerWidth = 200;

const FullLayout = ({ Component }) => {
  const [isNavbarClose, setIsNavbarClose] = useState(window.innerWidth < 1024);

  const toggleNavbar = () => {
    setIsNavbarClose((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNavbarClose(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar isNavbarClose={isNavbarClose} />
    
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // ml: isNavbarClose ? 0 : `${drawerWidth}px`,
          // width: isNavbarClose ? "100%" : `calc(100% - ${drawerWidth}px)`,
          transition: "all 0.3s ease",
        }}
      >
        <Navbar toggleNavbar={toggleNavbar} />
        <Box sx={{ mt: "4rem" }}>{Component}</Box>
      </Box>
    </Box>
  );
};

export default FullLayout;


// ===========================================================================================================


// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';

// import logo from "../assets/Clip path group.png"
// const demoTheme = createTheme({
//   // cssVariables: {
//   //   colorSchemeSelector: 'data-toolpad-color-scheme',
//   // },
//   // colorSchemes: { light: true, dark: true },
//   components: {
//     //top app bar
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#E8194F', // e.g., slate-900
//           color: 'white',              // white text/icons
//         },
//       },
//     },
     
//    MuiSvgIcon: {
//       styleOverrides: {
//         root: {
//           color: '#fff', // 👈 ensures icon SVGs also inherit the correct color
//         },
//       },
//     },
//   },
// });

// function DemoPageContent({ pathname }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography>Dashboard content for {pathname}</Typography>
//     </Box>
//   );
// }

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function DashboardLayoutNavigationLinks(props) {
//   const { window } = props;

//   const router = useDemoRouter('/home');

//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
     
//     <>
  
//       <AppProvider
//        branding={{
//     logo: <img src={logo} alt="logo" height="32"   />,
//     title: '',
//   }}
//         navigation={[
//           {
//             segment: 'home',
//             title: 'Home',
//             icon: <DescriptionIcon />,
//           },
//           {
//             segment: 'about',
//             title: 'About Us',
//             icon: <DescriptionIcon />,
//           },
//         ]}
//         router={router}
//         theme={demoTheme}
//         window={demoWindow}
//       >
//         <DashboardLayout>
//           <DemoPageContent pathname={router.pathname} />
//         </DashboardLayout>
//       </AppProvider>
     
//     </>
//   );
// }

// DashboardLayoutNavigationLinks.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window: PropTypes.func,
// };

// export default DashboardLayoutNavigationLinks;


// ==================================================================================



// import React, { useState } from "react";
// import { Box } from "@mui/material";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Navbar from "../components/Navbar/Navbar";

// const drawerWidth = 220;

// const FullLayout = ({ Component }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <Navbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
//       <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           backgroundColor: "#f7f7f7",
//           p: 2,
//           mt: "64px", // height of Navbar
//           ml: { md: `${drawerWidth}px` }
//         }}
//       >
//         <Component />
//       </Box>
//     </Box>
//   );
// };

// export default FullLayout;

