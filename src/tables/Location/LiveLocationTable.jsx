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

const LiveLocationTable = ({ search, refreshkey }) => {
  const [locations, setLocations] = useState();
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClose = (value) => {
    setOpenDialog(value);
  };

  const toggleDrawer = (open) => {
    setOpen(open);
  };
  const openDeleteDialog = (id) => {
    setDeleteOpen(id);
  };

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handleDelete = async (id) => {
    await deleteLocation(id);
    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  const callApi = async () => {
    try {
      const response = await getLiveLocations(search);
      const dataWithIds = (response?.data?.data || []).map((item) => ({
        ...item,
        id: item._id,
        companyName: item?.company?.name || "N/A",
      }));
      setLocations(dataWithIds);
    } catch (error) {
      console.error("Error fetching live companies:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, [search , refreshkey]);



  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ color: "#2C2B7E", backgroundColor: "#ECECEC" }}
            onClick={() => {
              setSelectedLocation(params.row);
              setOpenDialog(true);
            }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            sx={{ color: "green", backgroundColor: "#ECECEC", mx: 1 }}
            onClick={() => {
              setSelectedLocation(params.row);
              setOpen(true);
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
    { field: "companyName", headerName: "Company / Department", width: 139 },
    { field: "locName", headerName: "Location", width: 100 },
    { field: "locationCode", headerName: "Location Code", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "postCode", headerName: "Zip Code", width: 100 },
    { field: "toMail", headerName: "To Mail", width: 155 },
    { field: "ccMail", headerName: "CC Mail", width: 155 },
  ];

  return (
    <>
      <Paper sx={{ width: "100%", height: "auto" }}>
        <DataGrid
          rows={locations || []}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      <ViewDialog
        open={openDialog}
        handleClose={handleClose}
        location={selectedLocation}
      />
      <LocationDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        locationId={selectedLocation?.id || null}
        refreshPage={callApi}
      />
      <DeleteDialog
        deleteOpen={deleteOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
        closeDeleteDialog={closeDeleteDialog}
      />
    </>
  );
};

export default LiveLocationTable;
