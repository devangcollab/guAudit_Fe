import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

const DeleteDialog = ({
  deleteOpen,
  handleClose,
  handleDelete,
  closeDeleteDialog,
}) => {
  return (
    <Dialog
      open={deleteOpen}
      handleClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Are You Sure Want to Delete</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleDelete(deleteOpen)} variant="contained">Yes</Button>
        <Button onClick={closeDeleteDialog} variant="outlined">No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;