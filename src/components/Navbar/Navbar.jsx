// /components/Navbar/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#E8194F",
        height: 64,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        // width: { sm: `calc(100% - 199px)` }, // Sidebar width
        ml: { sm: `200px` },
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* {isMobile && (
            <IconButton onClick={onDrawerToggle} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          )} */}
          <Typography variant="h6" sx={{ color: "#fff"  }}>
            Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            alt="Admin"
            src="https://via.placeholder.com/150"
            sx={{ width: 32, height: 32 }}
          />
          <Box sx={{ color: "#fff", textAlign: "left" }}>
            <Typography variant="body2">Devalstin Zala</Typography>
            <Typography variant="caption">Admin</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

 