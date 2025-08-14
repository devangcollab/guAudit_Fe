import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CompanyAutoComplete from "../common/CompanyAutoComplete";
import LocationAutoComplete from "../common/LocationAutoComplete";
import { useState } from "react";
import { getUserByLocationId } from "../../Apis/user";
import { useEffect } from "react";
import {
  assignQuestion,
  getAssignedUserIdsByQuestionId,
  getOneQuestion,
} from "../../Apis/question";
import UserMultipleSelection from "../common/UserMultipleSelection";
import { getOneCompany } from "../../Apis/company";
import { isSuperAdmin } from "../../utils/auth";
import { addAnswerForm } from "../../Apis/ansForm";
import axios from "axios";
import { checkUserAssignment } from "../../Apis/form";
import moment from "moment";

const ViewDialog = (props) => {
  const { open, handleClose, company, location, question, form , maxWidth } = props;

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [alreadyAssignedUserIds, setAlreadyAssignedUserIds] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmUser, setConfirmUser] = useState(null); // stores userId + form info
  const [pendingUserIds, setPendingUserIds] = useState([]); // temp for multi-select

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      const companyId = parsedUser?.compId;

      if (companyId) {
        const fetchCompany = async () => {
          try {
            const response = await getOneCompany(companyId);
            const company = response.data.data;

            setSelectedCompany({
              label: company.name,
              value: company._id,
            });
          } catch (error) {
            console.log(error, "Get Selected Company Error");
          }
        };

        fetchCompany();
      }
    }
  }, [open]);

  useEffect(() => {
    const fetchAssignedUserIds = async () => {
      try {
        if (!question) return;

        const response = await getAssignedUserIdsByQuestionId(question);
        setAlreadyAssignedUserIds(response.data.assignedUserIds);
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    fetchAssignedUserIds();
  }, [selectedLocation, question]);

  const handleDialogClose = () => {
    // Reset form values
    setSelectedCompany(null);
    setSelectedLocation(null);
    setSelectedUserIds([]);
    setUsers([]);

    // Call parent close function
    handleClose(false);
  };

  // const handleUserSelection = (userIds) => {

  //   console.log(userIds , "userIds")

  //   setSelectedUserIds(userIds);
  // };

  //   const handleUserSelection = async (userIds) => {
  //   if (!userIds || userIds.length === 0) return;

  //   let assignedUsers = [];

  //   // Use Promise.all to check all users in parallel
  //   const checks = await Promise.all(
  //     userIds.map(async (id) => {
  //       try {
  //         const res = await checkUserAssignment(id);
  //         if (res.data.assigned) {
  //           return { userId: id, form: res.data.form };
  //         }
  //         return null;
  //       } catch (err) {
  //         console.error("Error checking assignment for user:", id, err);
  //         return null;
  //       }
  //     })
  //   );

  //   assignedUsers = checks.filter(Boolean); // remove nulls

  //   if (assignedUsers.length > 0) {
  //     // For now, show dialog for the first assigned user
  //     setAssignedInfo(assignedUsers[0].form);
  //     setDialogOpen(true);

  //     // Optional: remove assigned users from selection
  //     const allowedUserIds = userIds.filter(
  //       (id) => !assignedUsers.find((a) => a.userId === id)
  //     );
  //     setSelectedUserIds(allowedUserIds); // save only unassigned ones
  //   } else {
  //     setSelectedUserIds(userIds);
  //   }
  // };

  const handleUserSelection = async (userIds) => {
    if (!userIds || userIds.length === 0) return;

    const selectedId = userIds[userIds.length - 1]; // just check the newly selected one

    try {
      const res = await checkUserAssignment(selectedId , question);

      console.log(res);

      if (res.data?.assigned) {
        // Store for confirmation dialog
        setConfirmUser({
          userId: selectedId,
          formTitle: res.data.form.title,
          assignAt: moment(res.data.form.createdAt).format("DD/MM/YYYY"),
        });

        // Store previous valid users to re-add on confirm
        setPendingUserIds(userIds);
        setDialogOpen(true);
      } else {
        // If no assignment, continue normally
        setSelectedUserIds(userIds);
      }
    } catch (err) {
      console.error("Assignment check failed:", err);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     if (question) {
  //       // Merge already assigned and newly selected userIds
  //       const mergedUserIds = Array.from(
  //         new Set([...alreadyAssignedUserIds, ...selectedUserIds])
  //       );

  //       await assignQuestion(question, mergedUserIds);
  //       handleDialogClose(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  

  const handleConfirmYes = () => {
    setSelectedUserIds(pendingUserIds);
    setDialogOpen(false);
    setConfirmUser(null);
  };

  const handleConfirmNo = () => {
    // Remove the assigned user from selection
    const filtered = pendingUserIds.filter((id) => id !== confirmUser.userId);
    setSelectedUserIds(filtered);
    setDialogOpen(false);
    setConfirmUser(null);
  };

  const handleSubmit = async () => {
    try {
      if (question) {
        await addAnswerForm({
          selectedUserIds: selectedUserIds,
          questionId: question,
        });
        handleDialogClose(false);
      }
    } catch (error) {
      console.log(error, "Error while AssignUser");
    }
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth={maxWidth}
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle textAlign="center">
          {company
            ? "Company Details"
            : question
              ? "Assign To"
              : form
                ? "Form Details"
                : "Location Details"}
        </DialogTitle>
        <DialogContent>
          {company ? (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-around"
            >
              <Box sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" }}>
                <img
                  src={company?.compLogo && company?.compLogo}
                  alt={company?.name}
                  style={{ width: 150, height: 150, objectFit: "contain" }}
                />
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography>
                  <b>Company Name:</b> {company?.name && company?.name}
                </Typography>
                <Typography>
                  <b>Short Name:</b> {company?.shortName && company?.shortName}
                </Typography>
              </Box>
            </Stack>
          ) : location ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              gap={2}
            >
              <Typography>
                <b>Company Name:</b>
                {location?.company && location?.company?.name}
              </Typography>
              <Typography>
                <b>Location:</b> {location?.locName && location?.locName}
              </Typography>
              <Typography>
                <b>Location Code:</b>{" "}
                {location?.locationCode && location?.locationCode}
              </Typography>
              <Typography>
                <b>Address:</b> {location?.address && location?.address}
              </Typography>
              <Typography>
                <b>Zip Code:</b> {location?.postCode && location?.postCode}
              </Typography>
              <Typography>
                <b>To Mail:</b> {location?.toMail && location?.toMail}
              </Typography>
              <Typography>
                <b>CC Mail:</b> {location?.ccMail && location?.ccMail}
              </Typography>
              {/* Add more location fields here if needed */}
            </Box>
          ) : question ? (
            <Stack gap={2} width={"100%"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={2}
                mt={1}
              >
                {/* <CompanyAutoComplete  fullWidth/> */}
                <CompanyAutoComplete
                  onChange={(e) => setSelectedCompany(e)}
                  value={selectedCompany || null}
                  fullWidth
                  disabled={!isSuperAdmin() && true}
                />
                <LocationAutoComplete
                  fullWidth
                  compId={selectedCompany?.value}
                  onChange={(e) => setSelectedLocation(e)}
                  value={selectedLocation || null}
                />
              </Box>
              {/* <UserMultipleSelection
              selectedLocation={selectedLocation}
              onChange={handleUserSelection}
              alreadyAssignedUserIds={alreadyAssignedUserIds}
            /> */}
              <UserMultipleSelection
                selectedLocation={selectedLocation}
                value={selectedUserIds}
                onChange={handleUserSelection}
                alreadyAssignedUserIds={alreadyAssignedUserIds}
              />
            </Stack>
          ) : form && form?.formData?.length > 0 ? (
            <>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Score: {form.score} / {form.formData.length}
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>PrefAns</TableCell>
                    <TableCell>Remark</TableCell>
                    <TableCell>Attachment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {form.formData.map((q, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{form.title}</TableCell>
                      <TableCell>{q.question}</TableCell>
                      <TableCell>
                        {Array.isArray(q.answer)
                          ? q.answer.join(", ")
                          : q.answer}
                      </TableCell>
                      <TableCell>
                        {Array.isArray(q.prefAns) ? q.prefAns.join(", ") : "—"}
                      </TableCell>
                      <TableCell>{q.remark || "—"}</TableCell>
                      <TableCell>
                        {/* {q.attachment ? (
                        <img
                          src={q.attachment}
                          alt="attachment"
                          style={{
                            width: 80,
                            height: 80,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        "—"
                      )} */}
                        {q.attachment ? (
                          <Box display="flex" gap={1} flexWrap="wrap">
                            {q.attachment.split(";;;").map((item, idx) => {
                              const [name, base64] = item.split("::");
                              return (
                                <img
                                  key={idx}
                                  src={base64}
                                  alt={name}
                                  title={name}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "contain",
                                    borderRadius: 4,
                                    border: "1px solid #ccc",
                                  }}
                                />
                              );
                            })}
                          </Box>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <Typography>No Data Found</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleDialogClose}>
            Back
          </Button>
          {question && (
            <Button variant="outlined" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>User Already Assigned</DialogTitle>
        <DialogContent>
          <Typography>
            This user is already assigned at:{" "}
            <strong>{confirmUser?.assignAt}</strong>
          </Typography>
          <Typography mt={2}>
            Do you still want to assign this user to a new form?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmNo} color="error">
            No
          </Button>
          <Button
            onClick={handleConfirmYes}
            variant="contained"
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewDialog;
