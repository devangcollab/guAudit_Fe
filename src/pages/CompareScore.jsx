// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Stack,
//   Checkbox,
//   useMediaQuery,
//   useTheme,
//   Grid,
//   Button,
// } from "@mui/material";
// import CompanyAutoComplete from "../components/common/CompanyAutoComplete";
// import LocationAutoComplete from "../components/common/LocationAutoComplete";
// import AuditAutoComplete from "../components/common/AuditAutoComplete";
// import { getAuditByQuestionId } from "../Apis/form";
// import CompareScoreTable from "../tables/compareScore/CompareScoreTable";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { getOneCompany } from "../Apis/company";
// import { isAdmin } from "../utils/auth";
//    import { BarChart } from '@mui/x-charts/BarChart';
// import SelectAuditForCompare from "../components/common/SelectAuditForCompare";

// const CompareScore = () => {
//   const [formData, setFormData] = useState({
//     compId: null,
//     locId: null,
//     auditId: null,
//   });
//   const [auditData, setAuditData] = useState([]);
//   const [showCompareData, setShowCompareData] = useState(false);

//   // const companyDetails = [
//   //   {
//   //     date:"22-12-2024",
//   //     time:"11 : 22: 54",
//   //     score:1,
//   //   },
//   //   {
//   //     date:"22-12-2024",
//   //     time:"11 : 22: 54",
//   //     score:2,
//   //   },
//   //   {
//   //     date:"22-12-2024",
//   //     time:"11 : 22: 54",
//   //     score:3,
//   //   },
//   //   {
//   //     date:"22-12-2024",
//   //     time:"11 : 22: 54",
//   //     score:4,
//   //   }
//   // ]
//   //  const [checkedStates, setCheckedStates] = React.useState(
//   //     companyDetails.map(() => false)
//   //   );

//   //   const handleCheckboxChange = (index) => (event) => {
//   //     const updatedStates = [...checkedStates];
//   //     updatedStates[index] = event.target.checked;
//   //     setCheckedStates(updatedStates);
//   //   };

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//     setShowCompareData(false)
//   };
//   const user = JSON.parse(localStorage.getItem("user"));

//     const callUserCompany = async () => {
//     if (user && user.compId && isAdmin()) {
//       const response = await getOneCompany(user.compId);
//       setFormData((prev) => ({
//         ...prev,
//         compId: {
//           value: response?.data?.data._id,
//           label: response?.data?.data?.name || "",
//         },
//       }));
//     }
//   };

//   useEffect(() => {
//     callUserCompany()
//   },[])

  

//   const columnsData = [
//     // {
//     //   field: "action",
//     //   headerName: "Action",
//     //   width: 200,
//     //   renderCell: (params) => (
//     //     <>
//     //       {isAdmin() ? (
//     //         <>
//     //           <Tooltip title="Edit">
//     //             <IconButton
//     //               sx={{ color: "green", backgroundColor: "#ECECEC", mx: 1 }}
//     //               onClick={() => {
//     //                 setPopUp(true);
//     //                 setEditId(params.row.id);
//     //               }}
//     //             >
//     //               <CreateIcon />
//     //             </IconButton>
//     //           </Tooltip>
//     //           <Tooltip title="Delete">
//     //             <IconButton
//     //               sx={{ color: "red", backgroundColor: "#ECECEC" }}
//     //               onClick={() => openDeleteDialog(params.row.id)}
//     //             >
//     //               <DeleteIcon />
//     //             </IconButton>
//     //           </Tooltip>
//     //         </>
//     //       ) : (
//     //         "-"
//     //       )}
//     //     </>
//     //   ),
//     // },
//     { field: "title", headerName: "Title", width: 200 },
//     { field: "score", headerName: "Score", width: 200 },
//     { field: "outOf", headerName: "Out Of", width: 200 },
//     { field: "date", headerName: "Audit Date", width: 200 },
//     { field: "filledBy", headerName: "Filled By", width: 200 },

//   ];

//   const handleCompareAudit = async () => {
     

//     if(!formData.compId) return toast.warning("Please Select Company")
//     if(!formData.locId) return toast.warning("Please Select Location")
//     if(!formData.auditId) return toast.warning("Please Select Audit")

//     const response = await getAuditByQuestionId(formData?.auditId?.value);

//     const dataWithIds = (response?.data?.data || []).map((item) => ({
//       id: item._id,
//       title: item.questionId?.title || "N/A",
//       outOf: item.formData.length || "N/A",
//       date: moment(item.dateField).format("DD/MM/YYYY HH:mm:ss") || "N/A",
//       filledBy:item.assignUser?.name || "N/A",
//       ...item,
//     }));

//     setAuditData(dataWithIds);
//     setShowCompareData(true);
//   };
//   console.log(auditData[0]?.title)
//   return (
//     <>
//       <Box sx={{ flexGrow: 1  , border:"1px solid gray"}} p={2} >
//         <Grid container spacing={2}>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <Typography>Company</Typography>
//             <CompanyAutoComplete
//               value={formData.compId}
//               onChange={(value) => handleChange("compId", value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <Typography>Location</Typography>
//             <LocationAutoComplete
//               value={formData.locId}
//               compId={formData?.compId?.value}
//               onChange={(value) => handleChange("locId", value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6}}>
//             <Typography>Audit</Typography>
//             <AuditAutoComplete
//               value={formData.auditId}
//               locId={formData?.locId?.value}
//               onChange={(value) => handleChange("auditId", value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid size={{ xs: 12, md: 6}}>
//             <Typography>Select Audit for Compare</Typography>
//             <SelectAuditForCompare
//             auditData={auditData}
            
//               // value={formData.auditId}
//               // locId={formData?.locId?.value}
//               // onChange={(value) => handleChange("auditId", value)}
//             />
//           </Grid>
         

//           {/* <Grid size={{ xs: 12, md: 1 }} mt={3}>
//             <Button variant="contained" onClick={handleCompareAudit}>
//             Find
//             </Button>
//           </Grid> */}
//         </Grid>
//          <Stack  direction={"row"} justifyContent={"flex-end"}   alignItems={"center"} mt={2}>
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: "#E8194F" }}
//               onClick={handleCompareAudit}
//             >
//               Compare
//             </Button>
//           </Stack>
//       </Box>

//       {/* {companyDetails.map((item) => (

//         <Box
//         sx={{
//           borderRadius: 2,
//           boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px",
//           p: 2,
//           m: 2,
//           bgcolor: "white",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexDirection: isMobile ? "column" : "row",
//           gap: isMobile ? 1.5 : 0,
//           border:"1px solid red"
//         }}
//         >
//         <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//        <Checkbox
//     // checked={checked}
//     onChange={handleCheckboxChange}
//     inputProps={{ 'aria-label': 'controlled' }}
//     />

//           <Typography variant="body2" fontWeight={600}>
//             Date:
//           </Typography>
//           <Typography variant="body2">{item.date}</Typography>

//           <Typography variant="body2" fontWeight={600}>
//             Time:
//           </Typography>
//           <Typography variant="body2">{item.time}</Typography>
//         </Stack>

//         <Typography
//           variant="body2"
//           fontWeight={600}
//           sx={{ pr: isMobile ? 0 : 1 }}
//           >
//           Score : {item.score}
//         </Typography>
//       </Box>

// ))} */}


//       {/* {showCompareData && (
//       <Box mt={2}>

//         <CompareScoreTable columnsData={columnsData} rowsData={auditData} />
//         </Box>
//       )} */}
   
// {showCompareData && (
//   <Box mt={2}>
//     <BarChart
//       xAxis={[
//         {
//           data: auditData.map((item) => {
          
//             const user = item.assignUser?.name || "Unknown";
//             const date = item.dateField
//               ? moment(item.dateField).format("DD/MM/YYYY HH:mm:ss")
//               : "N/A";
//             return `${user} (${date})`;
//           }),
//           // label: "Filled By (Date)",
//           label: `${auditData[0]?.title}`,
//         },
//       ]}
//       series={[
//         {
//           data: auditData.map((item) => item.score || 0),
//           label: "Score",
//         },
//       ]}
//       height={400}
//     />
//   </Box>
// )}
//     </>
//   );
// };

// export default CompareScore;
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Checkbox,
  useMediaQuery,
  useTheme,
  Grid,
  Button,
} from "@mui/material";
import CompanyAutoComplete from "../components/common/CompanyAutoComplete";
import LocationAutoComplete from "../components/common/LocationAutoComplete";
import AuditAutoComplete from "../components/common/AuditAutoComplete";
import { getAuditByQuestionId } from "../Apis/form";
import CompareScoreTable from "../tables/compareScore/CompareScoreTable";
import moment from "moment";
import { toast } from "react-toastify";
import { getOneCompany } from "../Apis/company";
import { isAdmin } from "../utils/auth";
import { BarChart } from "@mui/x-charts/BarChart";
import SelectAuditForCompare from "../components/common/SelectAuditForCompare";

const CompareScore = () => {
  const [formData, setFormData] = useState({
    compId: null,
    locId: null,
    auditId: null,
  });
  const [auditData, setAuditData] = useState([]);
  const [selectedAudits, setSelectedAudits] = useState([]); // New state for selected audits
  const [showCompareData, setShowCompareData] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setShowCompareData(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const callUserCompany = async () => {
    if (user && user.compId && isAdmin()) {
      const response = await getOneCompany(user.compId);
      setFormData((prev) => ({
        ...prev,
        compId: {
          value: response?.data?.data._id,
          label: response?.data?.data?.name || "",
        },
      }));
    }
  };

  useEffect(() => {
    callUserCompany();
  }, []);


  const callSelectAuditApi = async () => {

    
    const response = await getAuditByQuestionId(formData?.auditId?.value);


    const dataWithIds = (response?.data?.data || []).map((item) => ({
      id: item._id,
      title: item.questionId?.title || "N/A",
      outOf: item.formData.length || "N/A",
      date: moment(item.dateField).format("DD/MM/YYYY HH:mm:ss") || "N/A",
      filledBy: item.assignUser?.name || "N/A",
      createdAt: item.dateField, // Ensure createdAt is included for SelectAuditForCompare
      ...item,
    }));

    setAuditData(dataWithIds);

  }

  useEffect(() => {

    callSelectAuditApi()

  },[formData.auditId])

  const columnsData = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "score", headerName: "Score", width: 200 },
    { field: "outOf", headerName: "Out Of", width: 200 },
    { field: "date", headerName: "Audit Date", width: 200 },
    { field: "filledBy", headerName: "Filled By", width: 200 },
  ];

  const handleCompareAudit = async () => {
    if (!formData.compId) return toast.warning("Please Select Company");
    if (!formData.locId) return toast.warning("Please Select Location");
    if (!formData.auditId) return toast.warning("Please Select Audit");

    
    setShowCompareData(true);
  };

  // Handler for selected audits
  const handleAuditSelection = (selected) => {
    setSelectedAudits(selected);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, border: "1px solid gray" }} p={2}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Company</Typography>
            <CompanyAutoComplete
              value={formData.compId}
              onChange={(value) => handleChange("compId", value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Location</Typography>
            <LocationAutoComplete
              value={formData.locId}
              compId={formData?.compId?.value}
              onChange={(value) => handleChange("locId", value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Audit</Typography>
            <AuditAutoComplete
              value={formData.auditId}
              locId={formData?.locId?.value}
              onChange={(value) => handleChange("auditId", value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>Select Audit for Compare</Typography>
            <SelectAuditForCompare
              auditData={auditData}
              value={selectedAudits} // Pass selected audits
              onChange={handleAuditSelection} // Pass handler for selection
            />
          </Grid>
        </Grid>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          mt={2}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E8194F" }}
            onClick={handleCompareAudit}
          >
            Compare
          </Button>
        </Stack>
      </Box>

      {showCompareData && selectedAudits.length > 0 ? (
        <Box mt={2}>
          <BarChart
            xAxis={[
              {
                data: selectedAudits.map((item) => {
                      const user = item.assignUser?.name || "Unknown";
                      const date = item.dateField
                        ? moment(item.dateField).format("DD/MM/YYYY HH:mm:ss")
                        : "N/A";
                      return `${user} (${date})`;
                    }),
                  // : auditData.map((item) => {
                  //     const user = item.assignUser?.name || "Unknown";
                  //     const date = item.dateField
                  //       ? moment(item.dateField).format("DD/MM/YYYY HH:mm:ss")
                  //       : "N/A";
                  //     return `${user} (${date})`;
                  //   }),
                label: auditData[0]?.title || "Audit Comparison",
              },
            ]}
            series={[
              {
                data: selectedAudits.length
                  ? selectedAudits.map((item) => item.score || 0)
                  : auditData.map((item) => item.score || 0),
                label: "Score",
              },
            ]}
            height={400}
            // width={500}
          />
        </Box>
      ) : showCompareData && <Typography textAlign={"center"} mt={3}>No Data Available</Typography>}

      {/* {showCompareData && (
        <Box mt={2}>
          <CompareScoreTable
            columnsData={columnsData}
            rowsData={selectedAudits.length ? selectedAudits : auditData} // Use selected audits if available
          />
        </Box>
      )} */}
    </>
  );
};

export default CompareScore;