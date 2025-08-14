import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

import { Box, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

import { useState } from "react";
import { userAssignedQuestion } from "../../Apis/question";
import { useEffect } from "react";
import { getFilledForm, getFormRecords } from "../../Apis/form";
import ViewDialog from "../../components/Dialog/ViewDialog";

const FormRecordsTable = () => {
  const [form, setForm] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const callApi = async () => {
    try {
      const response = await getFilledForm();
      const dataWithIds = (response?.data?.data || []).map((item) => ({
        id: item._id,
        title: item.questionId?.title || "N/A",
        score: item.score || 0,
        category: item.questionId?.categoryId?.name || "N/A",
        company: item?.compId?.name || "N/A",
        location:  item?.assignUser?.locId?.locName  || "N/A",
        assignUser: item?.assignUser?.name || "N/A",
        formData: item?.formData || [],
        outOf:item.formData.length || "N/A"
      }));
      setForm(dataWithIds);
    } catch (error) {
      console.error("Error fetching live Questions:", error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const handleClose = (value) => {
    setOpen(value);
  };

  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
        <Tooltip title="View Form Details">

          <IconButton
            sx={{ color: "#2C2B7E", backgroundColor: "#ECECEC" }}
            onClick={() => {
              setSelectedForm(params.row);
              setOpen(params.row.id);
            }}
            >
            <InfoOutlineIcon />
          </IconButton>
            </Tooltip>
        </>
      ),
    },
    { field: "title", headerName: "TITLE", width: 189 },
    { field: "score", headerName: "SCORE", width: 80 },
    { field: "outOf", headerName: "OUT OF", width: 80 },
    { field: "category", headerName: "CATEGORY", width: 130 },
    { field: "company", headerName: "COMPANY / DEPARTMENT", width: 200 },
    { field: "location", headerName: "LOCATIONS", width: 150 },
    { field: "assignUser", headerName: "FILLED BY", width: 150 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Paper sx={{ width: "100%", height: "auto" }}>
        <DataGrid
          rows={form}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>

      <ViewDialog open={open} handleClose={handleClose} form={selectedForm}  maxWidth="lg" />
    </>
  );
};

export default FormRecordsTable;
