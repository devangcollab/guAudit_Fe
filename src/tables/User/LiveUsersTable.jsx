import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteLocation, getLiveLocations } from "../../Apis/location";
import ViewDialog from "../../components/Dialog/ViewDialog";
import LocationDrawer from "../../components/Drawer/LocationDrawer";
import DeleteDialog from "../../components/Dialog/DeleteDialog";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../Apis/user";

const LiveUsersTable = () => {
  const [users, setUsers] = useState();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setDeleteOpen(false);
  };

  const openDeleteDialog = (id) => {
    setDeleteOpen(id);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  const callApi = async () => {
    try {
      const response = await getAllUsers();
      const dataWithIds = (response?.data?.data || []).map((item) => ({
        ...item,
        id: item._id,
        company: item?.compId?.name || "N/A",
        location: item?.locId?.locName || "N/A",
        role:item.role?.roleName || "N/A",
        createdAt:
          moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss") || "N/A",
      }));
      setUsers(dataWithIds);
    } catch (error) {
      console.error("Error fetching Get Users", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ color: "green", backgroundColor: "#ECECEC", mx: 1 }}
            onClick={() => {
              navigate(`/userForm/${params.row.id}`);
              setShowForm(true);
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            sx={{ color: "red", backgroundColor: "#ECECEC" }}
            onClick={() => openDeleteDialog(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
    { field: "name", headerName: "User Name", width: 179 },
    { field: "company", headerName: "Company Name", width: 220 },
    { field: "location", headerName: "Location Name", width: 140 },
    { field: "role", headerName: "Role", width: 140 },
    { field: "createdAt", headerName: "Created At", width: 200 },

  ];

  return (
    <>
      <Paper sx={{ width: "100%", height: "auto" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      <DeleteDialog
        deleteOpen={deleteOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
        closeDeleteDialog={closeDeleteDialog}
      />
    </>
  );
};

export default LiveUsersTable;
