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
import { getDeletedUsers, restoreUser } from "../../Apis/user";
import { isSuperAdmin } from "../../utils/auth";

const DeletedUsersTable = () => {
  const [deletedUsers, setDeletedUsers] = useState([]);

  const callApi = async () => {
    try {
      const response = await getDeletedUsers();

      const dataWithIds = (response?.data?.data || []).map((item, index) => ({
        id: item._id || index,
        userName: item.name,
        company: item?.compId?.name || "N/A",
        location: item?.locId?.locName || "N/A",
      }));

      setDeletedUsers(dataWithIds);
    } catch (error) {
      console.error("Error fetching Deleted companies:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreUser(id);
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

    { field: "userName", headerName: "User Name", width: 200 },
    { field: "company", headerName: "Company Name", width: 200 },
    { field: "location", headerName: "Location Name", width: 200 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ width: "100%", height: "auto" }}>
      <DataGrid
        rows={deletedUsers}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DeletedUsersTable;
