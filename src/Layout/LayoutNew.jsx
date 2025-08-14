import React, { useState } from "react";
import { Box } from "@mui/material";
import SidebarNew from "../components/Sidebar/SidebarNew";
import Header from "../components/Navbar/NavbarNew";

const LayoutNew = ({ children }) => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  return (
    <Box sx={{ display: "flex", marginTop: "4rem" }}>
      <SidebarNew setIsSidebarMinimized={setIsSidebarMinimized} />
      <Box
        sx={{
          // marginLeft: isSidebarMinimized ? "100px" : "240px",
          transition: "margin-left 0.3s ease",
          flexGrow:1,
          width: `calc(100% - ${isSidebarMinimized ? "100px" : "240px"})`,
        }}
      >
        <Header isSidebarMinimized={isSidebarMinimized}/>
        <Box
          sx={{
            padding: 1,
            height: "93vh",
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutNew;


// ==========================================================================================



// import React, { useState } from "react";
// import { Box, useMediaQuery, useTheme } from "@mui/material";
// import SidebarNew from "../components/Sidebar/SidebarNew";
// import Header from "../components/Navbar/NavbarNew";

// const LayoutNew = ({ children }) => {
//   const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Same as Sidebar

//   const getSidebarWidth = () => {
//     if (isMobile) return 0; // Drawer is temporary
//     return isSidebarMinimized ? 100 : 240;
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Sidebar */}
//       <SidebarNew setIsSidebarMinimized={setIsSidebarMinimized} />

//       {/* Main Content */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           // marginLeft: isMobile ? 0 : `${getSidebarWidth()}px`,
//           // transition: "margin-left 0.3s ease",
//           width: "100%",
//         }}
//       >
//         {/* Header */}
//         <Header isSidebarMinimized={isSidebarMinimized} />

//         {/* Page Content */}
//         <Box
//           sx={{
//             padding: 1,
//             marginTop: "4rem", // Adjust if your Header is fixed
//             // height: "calc(100vh - 4rem)",
//             boxSizing: "border-box",
//             overflow: "auto",
//           }}
//         >
//           {children}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default LayoutNew;










