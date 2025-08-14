import { Box, Button, Stack } from "@mui/material";
import React from "react";
import FillFormTable from "../../tables/Forms/FillFormTable";

const FillForm = () => {
  return (
    <>
    {/* <Stack direction={"row"} justifyContent={"end"}>
      <Button variant="contained" sx={{ borderRadius: "3rem", px: 5}}>
        Add
      </Button>
    </Stack> */}

    <Box mt={3}>
        <FillFormTable />
    </Box>
    </>
  );
};

export default FillForm;
