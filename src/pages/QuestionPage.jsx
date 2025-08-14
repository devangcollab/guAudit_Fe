import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import LiveQuestionTable from "../tables/Questions/LiveQuestionTable";
import DeletedQuestionTable from "../tables/Questions/DeletedQuestionTable";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
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
            Audit
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
              variant="contained"
              fullWidth={isSmallScreen}
              sx={{ borderRadius: "3rem", px: 5 }}
              onClick={() => navigate("/questionForm")}
            >
              Add
            </Button>
          </Box>
        )}
      </Stack>
      <Box mt={3}>
        {showLive ? <LiveQuestionTable /> : <DeletedQuestionTable />}
      </Box>
    </>
  );
};

export default QuestionPage;
