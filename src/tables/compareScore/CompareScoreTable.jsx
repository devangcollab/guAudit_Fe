import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const CompareScoreTable = ({ columnsData, rowsData }) => {


 


  return (
    <Paper sx={{ width: "100%", height: "auto" }}>
      <DataGrid
        rows={rowsData}
        columns={columnsData}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default CompareScoreTable;
