import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import usersImage from "../assets/usersGroup.png";
import listGroupImage from "../assets/Group 2382.png";
import locationImage from "../assets/Group 2384.png";
import categoryImage from "../assets/Group 216.png";
import formImage from "../assets/Group 2388.png";
import folderImage from "../assets/Group 2390.png";
import LatestUserTable from "../tables/User/LatestUserTable";
import { useState } from "react";
import { getAllUsers } from "../Apis/user";
import { useEffect } from "react";
import { getLatestCompanies, getLiveCompanies } from "../Apis/company";
import moment from "moment";
import { getLiveLocations } from "../Apis/location";
import { getLiveCategories } from "../Apis/category";
import { getFilledForm } from "../Apis/form";
import {useNavigate} from "react-router-dom"

const Dashboard = () => {
 
  const [latestCompanies, setLatestCompanies] = useState([]);

  const [dashboardData, setDashboardData] = useState(
    {
      numOfUser: 0,
      numOfCompanies: 0,
      numOfLocation: 0,
      numOfCategories: 0,
      numOfFilledForm: 0,
      numOfFormRecords: 0,
    }
  );

  const navigate = useNavigate()

  const fetchDashboardData = async () => {
    try {
      const [userRes, companyRes , locationRes , categoryRes , filledFormRes] = await Promise.all([
        getAllUsers(),
        getLiveCompanies(),
        getLiveLocations(),
        getLiveCategories(),
        getFilledForm()
      ]);


      setDashboardData({
        numOfUser: userRes.data.data.length,
        numOfCompanies: companyRes.data.data.length,
        numOfLocation:locationRes.data.data.length,
        numOfCategories:categoryRes.data.data.length,
        numOfFilledForm:filledFormRes.data.data.length
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  const callLatestCompaniesApi = async () => {
    try {
      const response = await getLatestCompanies();
      setLatestCompanies(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    callLatestCompaniesApi();
  }, []);

  const companyDetails = [
    {
      image: usersImage,
      name: "Users",
      data: dashboardData.numOfUser,
      percentage: "+ 4.5 %",
      percentageColor: "#A30000",
      month: "Last Month",
      color: "#fde5eb",
      path:"/userPage"
    },
    {
      image: listGroupImage,
      name: "Companies",
      data: dashboardData.numOfCompanies,
      percentage: "+ 4.5 %",
      percentageColor: "#007C1B",
      month: "Last Month",
      color: "#D8D9FF",
      path:"/companyPage"
    },
    {
      image: locationImage,
      name: "Location",
      data: dashboardData.numOfLocation,
      percentage: "+ 4.5 %",
      percentageColor: "#A30000",
      month: "Last Month",
      color: "#FFD2BF",
      path:"/locationPage"
    },
    {
      image: categoryImage,
      name: "Categories",
      data: dashboardData.numOfCategories,
      percentage: "+ 4.5 %",
      percentageColor: "#007C1B",
      month: "Last Month",
      color: "#BCDAF6",
      path:"/categoryPage"
    },
    {
      image: formImage,
      name: "Fill Form",
      data: dashboardData.numOfFilledForm,
      percentage: "+ 4.5 %",
      percentageColor: "#A30000",
      month: "Last Month",
      color: "#FFE3EE",
      path:"/formRecords"
    },
    {
      image: folderImage,
      name: "Form Records",
      data:  dashboardData.numOfFilledForm,
      percentage: "+ 4.5 %",
      percentageColor: "#A30000",
      month: "Last Month",
      color: "#CEE2F4",
      path:"/formRecords"
    },
  ];
  return (
    <Grid container spacing={1}>
      <Grid item  size={{ xs:12 , md:8}}>
        <Stack flexDirection={"row"} flexWrap={"wrap"} gap={"1rem"}  >
          {companyDetails.map((item) => (
            <Box
              sx={{
                border: `2px solid ${item.color}`,
                width: "16rem",
                display: "flex",
                flexDirection: "column",
                borderRadius: "1rem",
                flexGrow: 1,
              }}
              onClick={() => navigate(`${item.path}`)}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    margin: "1rem",
                    borderRadius: "50%",
                  }}
                >
                  <img src={item.image} alt="icon" />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: 400 }}>{item.name}</Typography>
                  <Typography sx={{ fontWeight: 500 }}>{item.data}</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: item.color,
                  height: "2.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomLeftRadius: "0.8rem",
                  borderBottomRightRadius: "0.8rem",
                  gap: "2rem",
                }}
              >
                <Typography
                  sx={{
                    pl: 1,
                    pr: 1,
                    backgroundColor: "white",
                    color: item.percentageColor,
                    borderRadius: "2rem",
                  }}
                >
                  {item.percentage}
                </Typography>
                <Typography>{item.month}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        <Box
          sx={{ border: "1px solid #FFE7EB", mt: 3, borderRadius: "0.3rem" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
            }}
          >
            <h3 style={{ fontWeight: 600, color: "#1C1B6C" }}>Latest Users</h3>
            <Button variant="outlined" sx={{ borderRadius: "1.2rem" }} onClick={() => navigate("/userPage")}>
              Visit
            </Button>
          </Box>

          <LatestUserTable />
        </Box>
      </Grid>
      <Grid item size={{xs:12 , md:4}}>
        <Box border={"2px solid #FFE7EB"}>
          <h3
            style={{
              backgroundColor: "#FFE7EB",
              margin: 0,
              fontWeight: 600,
              padding: "0.5rem",
              color: "#1C1B6C",
            }}
          >
            Latest Company
          </h3>
          {latestCompanies.map((item) => (
            <Box
              sx={{
                border: "1px solid #F0F0F0",
                margin: "0.8rem",
                display: "flex",
                justifyContent: "space-between",
                padding: "0.4rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  fontSize: "12px",
                  gap: "0.3rem",
                  flexDirection: "column",
                }}
              >
                <Typography fontSize={"12px"}>
                  Company Name:- {item.name}
                </Typography>
                <Typography fontSize={"12px"}>
                  Short Name :- {item.shortName}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", gap: "0.3rem", flexDirection: "column" }}
              >
                <Typography fontSize={"12px"} sx={{ color: "#007C1B" }}>
                  Created At
                </Typography>
                <Typography fontSize={"12px"} sx={{ color: "#0058AA" }}>
                  {moment(item.createdAt).format("DD-MM-YYYY")}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
