import React from "react";
import errorImage from "../assets/404-error-page.avif";
import { Box, Stack } from "@mui/material";

const NotFound404 = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} mt={8}>
      <Box>
      <img src={errorImage} alt="errorImage" />
      </Box>
    </Stack>
  );
};

export default NotFound404;