import { Box } from "@mui/material";
import FormRecordsTable from "../../tables/Forms/FormRecordsTable";
import { useEffect, useState } from "react";

const FormRecords = () => {
  return (
    <Box mt={3}>
      <FormRecordsTable />
    </Box>
  );
};

export default FormRecords;
