import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  createCompany,
  getOneCompany,
  updateCompany,
} from "../../Apis/company";
import { toast } from "react-toastify";

const CompanyDrawer = ({ open, toggleDrawer, id, refresh }) => {
  const [formData, setFormData] = useState({
    compLogo: "",
    name: "",
    shortName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const base64 = await convertToBase64(files[0]);
      setFormData((prev) => ({ ...prev, compLogo: base64 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const loadData = async () => {
    if (id) {
      const res = await getOneCompany(id);
      setFormData(res.data.data);
    } else {
      setFormData({ compLogo: "", name: "", shortName: "" });
    }
  };

  useEffect(() => {
    if (open) loadData();
  }, [open, id]);

  const handleSubmit = async () => {
    if (!formData.compLogo) return toast.warning("Please Upload Logo");
    if (!formData.name.trim())
      return toast.warning("Please Enter Company Name");
    if (!formData.shortName.trim())
      return toast.warning("Please Enter Short Name");

    setLoading(true); // Start loading

    try {
      if (id) {
        await updateCompany(id, formData);
      } else {
        await createCompany(formData);
      }
      toggleDrawer(false);
      refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: 400,
          p: 3,
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
        },
      }}
    >
      <IconButton
        onClick={() => toggleDrawer(false)}
        sx={{ position: "absolute", top: 20, right: 20 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
        pb={1}
        borderBottom="2px dashed #E8194F"
      >
        {id ? "UPDATE COMPANY" : "ADD COMPANY"}
      </Typography>

      <Stack spacing={2}>
        <Box
          component="label"
          htmlFor="upload-input"
          height={120}
          width={120}
          border="2px dashed #E8194F"
          display="flex"
          alignItems="center"
          flexDirection={"column"}
          gap={"0.5rem"}
          justifyContent="center"
          sx={{ cursor: "pointer" }}
        >
          <AddCircleOutlineIcon fontSize="large" sx={{ color: "#E8194F" }} />
          <Typography>Upload</Typography>
          <input
            id="upload-input"
            type="file"
            accept=".png,.jpg"
            hidden
            name="compLogo"
            onChange={handleChange}
          />
        </Box>

        <TextField
          label="Company / Department"
          fullWidth
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
        <TextField
          label="Short Name"
          fullWidth
          name="shortName"
          value={formData.shortName || ""}
          onChange={handleChange}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() =>
              setFormData({ compLogo: "", name: "", shortName: "" })
            }
          >
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E8194F" }}
            fullWidth
            onClick={handleSubmit}
            disabled={loading} // disables while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>

          {/* {loading && (
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <CircularProgress size={20} />
              <Typography variant="body2">
                Submitting, please wait...
              </Typography>
            </Box>
          )} */}
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default CompanyDrawer;
