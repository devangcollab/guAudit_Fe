import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import RestorePageIcon from "@mui/icons-material/RestorePage";
import { getDeletedLocations, restoreLocation } from "../../Apis/location";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { isSuperAdmin } from "../../utils/auth";

const DeletedLocationTable = () => {
  const [deletedLocations, setDeletedLocations] = useState([]);

  const callApi = async () => {
    try {
      const response = await getDeletedLocations();

      const dataWithIds = (response?.data?.data || []).map((item, index) => ({
        id: item._id || index, // Required by DataGrid
        locationName: item?.locName || "N/A",
        locationCode: item?.locationCode || "N/A",
        date: moment(item.updatedAt).format("DD-MM-YYYY") || "N/A",
        time: moment(item.updatedAt).format("HH:mm:ss") || "N/A",
        deletedBy: item?.deletedBy?.name || "N/A", // <-- extract name from object
      }));

      setDeletedLocations(dataWithIds);
    } catch (error) {
      console.error("Error fetching Deleted companies:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreLocation(id);
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
      width: 170,
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
    { field: "locationName", headerName: "Location", width: 200 },
    { field: "locationCode", headerName: "Location Code", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Time", width: 100 },
    { field: "deletedBy", headerName: "Deleted By", width: 150 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ width: "100%", height: "auto" }}>
      <DataGrid
        rows={deletedLocations}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DeletedLocationTable;
