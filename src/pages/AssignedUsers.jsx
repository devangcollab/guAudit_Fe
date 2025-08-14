// import React, { useEffect, useState } from "react";
// import { Chip, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import { getAuditData, getLiveQuestions } from "../Apis/question";

// const AssignedUsers = () => {
//   const [auditData, setAuditData] = useState([]);

//   const callApi = async () => {
//     try {
//       const response = await getAuditData();
//       console.log(response.data, "response");
//       const mappedData = [];

//       (response?.data || []).forEach((item) => {
//         if (Array.isArray(item.assignedTo) && item.assignedTo.length > 0) {
//           item.assignedTo.forEach((assignedEntry, index) => {
//             const user = assignedEntry.user;

//             mappedData.push({
//               id: `${item._id}_${index}`,
//               title: item.title || "N/A",
//               company: user?.compId?.name || "N/A",
//               assignedTo: user?.name || "N/A",
//               // assignedBy: item?.createdBy?.name || "N/A",
//               status: assignedEntry.status || "N/A",
//               completedAt:
//                 assignedEntry.status?.toLowerCase() === "completed"
//                   ? new Date(item.updatedAt).toLocaleDateString()
//                   : "N/A",
//             });
//           });
//         }
//       });

//       setAuditData(mappedData);
//     } catch (error) {
//       console.error("Error fetching Audit Data:", error);
//     }
//   };

//   useEffect(() => {
//     callApi();
//   }, []);
//   const columns = [
//     {
//       field: "title",
//       headerName: "TITLE",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "company",
//       headerName: "COMPANY / DEPARTMENT",
//       flex: 1.2,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "assignedTo",
//       headerName: "ASSIGNED TO",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//     {
//       field: "status",
//       headerName: "STATUS",
//       flex: 0.8,
//       headerAlign: "center",
//       align: "center",
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           size="small"
//           color={
//             params.value?.toLowerCase() === "completed" ? "success" : "default"
//           }
//           sx={{ textTransform: "capitalize" }}
//         />
//       ),
//     },
//     {
//       field: "completedAt",
//       headerName: "COMPLETED AT",
//       flex: 1,
//       headerAlign: "center",
//       align: "center",
//     },
//   ];

//   return (
//     <>
//       <Typography variant="h5">Audit Data</Typography>
//       <Paper sx={{ width: "100%", mt: 3 }}>
//         <DataGrid
//           rows={auditData}
//           columns={columns}
//           initialState={{
//             pagination: { paginationModel: { page: 0, pageSize: 5 } },
//           }}
//           pageSizeOptions={[5, 10]}
//           disableRowSelectionOnClick
//           sx={{
//             border: 0,
//             "& .MuiDataGrid-cell": {
//               justifyContent: "center",
//               textAlign: "center",
//             },
//             "& .MuiDataGrid-columnHeader": {
//               textAlign: "center",
//             },
//           }}
//         />
//       </Paper>
//     </>
//   );
// };

// export default AssignedUsers;

import React, { useEffect, useState } from "react";
import { Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { getAuditData } from "../Apis/question";
import { getAllForms } from "../Apis/form";
import moment from "moment"

const AssignedUsers = () => {
  const [auditData, setAuditData] = useState([]);

  // const callApi = async () => {
  //   try {
  //     const response = await getAuditData();
  //     console.log(response.data.data, "res");
  //     const mappedData = [];

  //     (response?.data?.data || []).forEach((item) => {
  //       if (Array.isArray(item.assignedTo) && item.assignedTo.length > 0) {
  //         item.assignedTo.forEach((assignedEntry, index) => {
  //           const user = assignedEntry.user;

  //           // ✅ Only include rows where user exists (populated)
  //           if (user && user.name) {
  //             console.log(user , "user")
  //             mappedData.push({
  //               id: `${item._id}_${index}`,
  //               title: item.title || "N/A",
  //               company: user?.compId?.name || "N/A",
  //               location: user?.locId?.locName || "N/A",
  //               assignedTo: user?.name || "N/A",
  //               status: assignedEntry.status || "N/A",
  //               completedAt:
  //                 assignedEntry.status?.toLowerCase() === "completed"
  //                   ? new Date(
  //                       assignedEntry.statusUpdatedAt
  //                     ).toLocaleDateString()
  //                   : "N/A",
  //             });
  //           }
  //         });
  //       }
  //     });
  //     setAuditData(mappedData);
  //   } catch (error) {
  //     console.error("Error fetching Audit Data:", error);
  //   }
  // };


  const callApi = async () => {

      try {
         const response = await getAllForms();
      console.log(response, "res");

       const dataWithIds = (response?.data?.data || []).map((item) => ({
        id: item._id,
        title: item.questionId?.title || "N/A",
        company: item?.compId?.name || "N/A",
        location:  item?.assignUser?.locId?.locName  || "N/A",
        assignUser: item?.assignUser?.name || "N/A",
        status:item.status || "N/A",
        dateField : moment(item.dateField).format("DD/MM/YYYY HH:mm:ss") || "N/A",
        formData: item?.formData || [],
        outOf:item.formData.length || "N/A"
      }));
      setAuditData(dataWithIds);
      } catch (error) {
       console.error("Error fetching Audit Data:", error);
      }


  }

  useEffect(() => {
    callApi();
  }, []);

  const columns = [
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "company",
      headerName: "COMPANY / DEPARTMENT",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "location",
      headerName: "LOCATION",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "assignUser",
      headerName: "ASSIGNED TO",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value?.toLowerCase() === "completed" ? "success" : "default"
          }
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      field: "dateField",
      headerName: "COMPLETED AT",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Audit Data
      </Typography>
      <Paper sx={{ width: "100%", mt: 3 }}>
        <DataGrid
          rows={auditData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              justifyContent: "center",
              textAlign: "center",
            },
            "& .MuiDataGrid-columnHeader": {
              textAlign: "center",
            },
          }}
        />
      </Paper>
    </>
  );
};

export default AssignedUsers;
