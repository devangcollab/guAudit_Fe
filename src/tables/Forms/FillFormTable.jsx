import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useState, useEffect } from "react";
import { userAssignedQuestion } from "../../Apis/question";
import { getAllForms } from "../../Apis/form";

const FillFormTable = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // const callApi = async () => {
  //   try {
  //     const response = await userAssignedQuestion();
  //     const currentUser = JSON.parse(localStorage.getItem("user")); // Full user object
  //     const currentUserId = currentUser?._id; // Extract just the _id

  //     const dataWithIds = (response?.data || []).map((item) => {
  //       const assignedEntry = item.assignedTo?.find(
  //         (entry) =>
  //           entry?.user?._id === currentUserId || // for populated user
  //           entry?.user === currentUserId // for unpopulated user (just ObjectId string)
  //       );

  //       return {
  //         id: item._id,
  //         title: item.title || "N/A",
  //         category: item?.categoryId?.name || "N/A",
  //         // company: item?.compId?.name || "N/A",
  //         // location: item?.locId?.locName || "N/A",
  //         createdBy: item?.createdBy?.name || "N/A",
  //         status: assignedEntry?.status || "assigned",
  //       };
  //     });

  //     setQuestions(dataWithIds);
  //   } catch (error) {
  //     console.error("Error fetching live Questions:", error);
  //   }
  // };
  const callApi = async () => {
    try {
      const response = await getAllForms();
      // const currentUser = JSON.parse(localStorage.getItem("user")); // Full user object
      // const currentUserId = currentUser?._id; // Extract just the _id

      const dataWithIds = (response?.data?.data || []).map((item) => {

        return {
          id: item._id,
          title: item.questionId?.title || "N/A",
          category: item?.questionId?.categoryId?.name || "N/A",
          questionId : item?.questionId?._id,
          // company: item?.compId?.name || "N/A",
          // location: item?.locId?.locName || "N/A",
          createdBy: item?.createdBy?.name || "N/A",
          status: item?.status || "assigned",
        };
      });

      setQuestions(dataWithIds);
    } catch (error) {
      console.error("Error fetching live Questions:", error);
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
          {params.row.status !== "completed" ? (
            <IconButton
              sx={{ color: "#2C2B7E", backgroundColor: "#ECECEC" }}
              onClick={() => navigate(`/ansForm/${params.row?.questionId}/${params.row.id}`)}
            >
              <AssignmentIcon />
            </IconButton>
          ) : (
            <IconButton sx={{ color: "green", backgroundColor: "#ECECEC" }}>
              <AssignmentTurnedInIcon />
            </IconButton>
          )}
        </>
      ),
    },
    { field: "title", headerName: "TITLE", width: 169 },
    { field: "category", headerName: "CATEGORY", width: 130 },
    { field: "status", headerName: "STATUS", width: 130 },
    // { field: "company", headerName: "COMPANY / DEPARTMENT", width: 200 },
    // { field: "location", headerName: "LOCATIONS", width: 130 },
    { field: "createdBy", headerName: "CREATED BY", width: 150 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ width: "100%", height: "auto" }}>
      <DataGrid
        rows={questions}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default FillFormTable;
