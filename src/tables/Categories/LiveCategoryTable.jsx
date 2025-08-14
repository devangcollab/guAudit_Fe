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
import { deleteCategory, getLiveCategories } from "../../Apis/category";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const LiveCategoryTable = ({ setShowForm, refreshKey }) => {
  const [categories, setCategories] = useState();

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
    await deleteCategory(id);
    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  const callApi = async () => {
    try {
      const response = await getLiveCategories();
      const dataWithIds = (response?.data?.data || []).map((item) => ({
        ...item,
        id: item._id,
        createdBy: item?.createdBy?.name || "N/A",
        createdAt: moment(item.createdAt).format("DD-MM-YYYY") || "N/A",
        updatedAt: moment(item.updatedAt).format("DD-MM-YYYY") || "N/A",
      }));
      setCategories(dataWithIds);
    } catch (error) {
      console.error("Error fetching live companies:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, [refreshKey]);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ color: "green", backgroundColor: "#ECECEC", mx: 1 }}
            onClick={() => {
              navigate(`/categoryPage/${params.row.id}`);
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
    { field: "name", headerName: "Category Name", width: 239 },
    { field: "createdBy", headerName: "Created By", width: 230 },
    { field: "createdAt", headerName: "Created At", width: 230 },
    { field: "updatedAt", headerName: "Updated At", width: 230 },
  ];

  return (
    <>
      <Paper sx={{ width: "100%", height: "auto" }}>
        <DataGrid
          rows={categories || []}
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

export default LiveCategoryTable;
