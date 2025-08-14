import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, responsiveFontSizes, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { deleteQuestion, getLiveQuestions } from "../../Apis/question";
import DeleteDialog from "../../components/Dialog/DeleteDialog";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ViewDialog from "../../components/Dialog/ViewDialog";
import { isUser } from "../../utils/auth";

const LiveQuestionTable = () => {
  const [liveQuestions, setLiveQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setOpenDialog(false);

  const openDeleteDialog = (id) => setDeleteOpen(id);

  const callApi = async () => {
    try {
      const response = await getLiveQuestions();
      const dataWithIds = (response?.data?.data || []).map((item) => ({
        id: item._id,
        title: item.title || "N/A",
        category: item?.categoryId?.name || "N/A",
        // company: item?.compId?.name || "N/A",
        // location: item?.locId?.locName || "N/A",
        createdBy: item?.createdBy?.name || "N/A",
      }));
      setLiveQuestions(dataWithIds);
    } catch (error) {
      console.error("Error fetching live Questions:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const closeDeleteDialog = () => {
    setDeleteOpen(false);
    callApi();
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    setDeleteOpen(false);
    handleClose();
    callApi();
  };

  const handleAddignToClose = (value) => {
    setOpen(value);
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 210,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
          <IconButton
            sx={{ color: "#2C2B7E", backgroundColor: "#ECECEC" }}
            onClick={() => navigate(`/viewQuestion/${params.row.id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              sx={{ color: "green", backgroundColor: "#ECECEC", mx: 1 }}
              onClick={() => navigate(`/questionForm/${params.row.id}`)}
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
          {!isUser() && (
            <Tooltip title="Assign To">
              <IconButton
                sx={{ color: "blue", backgroundColor: "#ECECEC", ml: 1 }}
                onClick={() => {
                  setQuestionId(params.row.id);
                  setOpen(params.row.id);
                }}
              >
                <AssignmentIndIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
    { field: "title", headerName: "TITLE", width: 189 },
    { field: "category", headerName: "CATEGORY", width: 130 },
    // { field: "company", headerName: "COMPANY / DEPARTMENT", width: 230 },
    // { field: "location", headerName: "LOCATIONS", width: 170 },
    { field: "createdBy", headerName: "CREATED BY", width: 150 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Paper sx={{ width: "100%", height: "auto" }}>
        <DataGrid
          rows={liveQuestions}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
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
      <ViewDialog
        open={open} 
        handleClose={handleAddignToClose}
        question={questionId}
      />
    </>
  );
};

export default LiveQuestionTable;
