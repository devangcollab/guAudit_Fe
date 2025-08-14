import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCompany, getLiveCompanies } from "../../Apis/company";
import ViewDialog from "../../components/Dialog/ViewDialog";
import CompanyDrawer from "../../components/Drawer/CompanyDrawer";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/Dialog/DeleteDialog";

const LiveCompaniesTable = ({refreshkey}) => {
  const [liveCompanies, setLiveCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => setOpenDialog(false);

  const toggleDrawer = (state) => {
    setOpenDrawer(state);
    if (!state) setEditId(null);
  };

  const openDeleteDialog = (id) => setDeleteOpen(id);

  const callApi = async () => {
    try {
      const response = await getLiveCompanies();
      const dataWithIds = (response?.data?.data || []).map((item) => ({
        id: item._id,
        name: item.name || "N/A",
        shortName: item.shortName || "N/A",
        createdBy: item?.createdBy?.name || "N/A",
        compLogo: item.compLogo,
      }));
      setLiveCompanies(dataWithIds);
    } catch (error) {
      console.error("Error fetching live companies:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, [refreshkey]);


  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton
              sx={{ color: "#2C2B7E", backgroundColor: "#ECECEC" }}
              onClick={() => {
                setSelectedCompany(params.row);
                setOpenDialog(true);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              sx={{ color: "green", backgroundColor: "#ECECEC", mx: 1 }}
              onClick={() => {
                setEditId(params.row.id);
                setOpenDrawer(true);
              }}
            >
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              sx={{ color: "red", backgroundColor: "#ECECEC" }}
              onClick={() => openDeleteDialog(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    { field: "name", headerName: "Company Name", width: 200 },
    { field: "shortName", headerName: "Short Name", width: 200 },
    { field: "createdBy", headerName: "Created By", width: 200 },
  ];

  return (
    <>
      <Paper sx={{ width: "100%", height: "auto" }}>
        <DataGrid
          rows={liveCompanies}
          columns={columns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      <ViewDialog open={openDialog} handleClose={handleClose} company={selectedCompany} />
      <CompanyDrawer open={openDrawer} toggleDrawer={toggleDrawer} id={editId} refresh={callApi} />
      <DeleteDialog
        deleteOpen={deleteOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
        closeDeleteDialog={closeDeleteDialog}
      />
    </>
  );
};

export default LiveCompaniesTable;