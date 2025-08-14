import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import RestorePageIcon from "@mui/icons-material/RestorePage";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { getDeletedCompanies, restoreCompany } from "../../Apis/company";
import { useEffect } from "react";
import { useState } from "react";

import moment from "moment";
import { isSuperAdmin } from "../../utils/auth";

const DeletedCompaniesTable = () => {
  const [deletedCompanies, setDeletedCompanies] = useState([]);

  const callApi = async () => {
    try {
      const response = await getDeletedCompanies();

      const dataWithIds = (response?.data?.data || []).map((item, index) => ({
        id: item._id || index, // Required by DataGrid
        name: item.name || "N/A",
        date: moment(item.updatedAt).format("DD-MM-YYYY") || "N/A",
        time: moment(item.updatedAt).format("HH:mm:ss") || "N/A",
        deletedBy: item?.deletedBy?.name || "N/A", // <-- extract name from object
      }));

      setDeletedCompanies(dataWithIds);
    } catch (error) {
      console.error("Error fetching Deleted companies:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreCompany(id);
      callApi();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          {isSuperAdmin() && (
            <IconButton
              sx={{ color: "#2C2B7E", backgroundColor: "#ECECEC" }}
              onClick={() => handleRestore(params.row.id)}
            >
              <RestorePageIcon />
            </IconButton>
          )}
        </>
      ),
    },
    { field: "name", headerName: "Company Name", width: 130 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "time", headerName: "Time", width: 130 },
    { field: "deletedBy", headerName: "Deleted By", width: 130 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ width: "100%", height: "auto" }}>
      <DataGrid
        rows={deletedCompanies}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DeletedCompaniesTable;
