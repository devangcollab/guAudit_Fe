import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LiveCompaniesTable from "../tables/Companies/LiveCompaniesTable";
import DeletedCompaniesTable from "../tables/Companies/DeletedCompaniesTable";
import CompanyDrawer from "../components/Drawer/CompanyDrawer";
import { isSuperAdmin } from "../utils/auth";
 

const CompanyPage = () => {
  const [showLive, setShowLive] = useState(true);

  const [open, setOpen] = useState(false);
  const [refreshkey, setRefreshkey] = useState(0);
  

  const toggleDrawer = (open) => {
    setOpen(open);
    // window.location.reload()
  };

  const refresh = () => {

    setRefreshkey((prev) => prev + 1)

  }


  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }} // column on xs, row from sm onwards
        alignItems="center"
      >
        <Button
          variant="contained"
          fullWidth={{ xs: true, sm: false }} // full width on mobile
          sx={{
            borderRadius: "3rem",
            px: 5,
            color: showLive ? "white" : "black",
            backgroundColor: showLive ? "#E8194F" : "white",
            // border: showLive ? "none" : "1px solid #E8194F",
          }}
          onClick={() => setShowLive(true)}
        >
          Company
        </Button>

        <Button
          variant="contained"
          fullWidth={{ xs: true, sm: false }}
          sx={{
            borderRadius: "3rem",
            px: 5,
            color: showLive ? "black" : "white",
            backgroundColor: showLive ? "white" : "#E8194F",
            // border: showLive ? "1px solid #E8194F" : "none",
          }}
          onClick={() => setShowLive(false)}
        >
          Deleted / Archived
        </Button>
      </Stack>

      {showLive && isSuperAdmin() && (
        <Stack
          height={120}
          width={120}
          boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"0.5rem"}
          mt={2}
        >
          <Button onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon fontSize="large" sx={{ color: "#E8194F" }} />
          </Button>
          <Typography>Create New</Typography>
        </Stack>
      )}

      <Box mt={3}>
        {showLive ? <LiveCompaniesTable refreshkey={refreshkey}  /> : <DeletedCompaniesTable />}
      </Box>

      {/* <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 400,
            p: 3,
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
          },
        }}
      >
        {/* Close Button */}
      {/* <IconButton
          onClick={toggleDrawer(false)}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton> */}

      {/* Drawer Content */}
      {/* <Typography variant="h6" fontWeight={700} mb={2}>
          ADD COMPANY
        </Typography>

        <Stack spacing={2}>
          {/* Upload Box */}
      {/* <Box
            height={120}
            width={120}
            border="2px dashed #E8194F"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ cursor: "pointer" }}
          >
            <AddCircleOutlineIcon fontSize="large" sx={{ color: "#E8194F" }} />
            <Typography>Upload</Typography>
          </Box>

          <Typography variant="caption" color="error">
            NOTE: PNG, JPG File Format Are Allowed
          </Typography>

          <TextField label="Company / Department" fullWidth />
          <TextField label="Short Name" fullWidth />

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="error" fullWidth>
              Clear
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#E8194F" }}
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Drawer> */}

      <CompanyDrawer open={open} toggleDrawer={toggleDrawer} refresh={refresh}  />
    </>
  );
};

export default CompanyPage;
