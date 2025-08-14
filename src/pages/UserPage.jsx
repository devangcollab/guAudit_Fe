import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LiveUsersTable from "../tables/User/LiveUsersTable";
import DeletedUsersTable from "../tables/User/DeletedUsersTable";

const UserPage = () => {
  const [showLive, setShowLive] = useState(true);

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // sm = <600px

  return (
    <>
      <Stack
        spacing={2}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isSmallScreen ? "stretch" : "center"}
        flexWrap="wrap"
      >
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button
            variant="contained"
            sx={{
              borderRadius: "3rem",
              px: 5,
              color: showLive ? "white" : "black",
              backgroundColor: showLive ? "#E8194F" : "white",
              whiteSpace: "nowrap",
            }}
            onClick={() => setShowLive(true)}
          >
            Users
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "3rem",
              px: 5,
              color: showLive ? "black" : "white",
              backgroundColor: showLive ? "white" : "#E8194F",
              whiteSpace: "nowrap",
            }}
            onClick={() => setShowLive(false)}
          >
            Deleted / Archived
          </Button>
        </Box>

        {showLive && (
          <Box mt={isSmallScreen ? 1 : 0}>
            <Button
              onClick={() => navigate("/userForm")}
              variant="contained"
              sx={{ borderRadius: "3rem", px: 5 }}
            >
              Add
            </Button>
          </Box>
        )}
      </Stack>

      <Box mt={3}>{showLive ? <LiveUsersTable /> : <DeletedUsersTable />}</Box>
    </>
  );
};

export default UserPage;
