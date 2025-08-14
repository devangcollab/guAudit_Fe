import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getLatestUsers } from "../../Apis/user";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FFF6F8",
    color: "#313131",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const LatestUserTable = () => {
  const [userData, setUserData] = useState([]);

  const callApi = async () => {
    try {
      const response = await getLatestUsers(); // assuming response.data.data is an array
      setUserData(response.data.data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 280 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{user.name}</StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.phone}</StyledTableCell>
              <StyledTableCell align="center">
                {new Date(user.createdAt).toLocaleDateString("en-GB")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LatestUserTable;
