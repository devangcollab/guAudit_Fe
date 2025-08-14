import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CompanyAutoComplete from "../common/CompanyAutoComplete";
import {
  createLocation,
  getOneLocation,
  updateLocation,
} from "../../Apis/location";
import { getOneCompany } from "../../Apis/company";
import { isAdmin } from "../../utils/auth";

const LocationDrawer = ({ open, toggleDrawer, locationId, refreshPage }) => {
  const [formData, setFormData] = useState({
    company: null,
    locationName: "",
    locationCode: "",
    fullAddress: "",
    zipCode: "",
    toMail: "",
    ccMail: "",
  });
  const [loading, setLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const handleCompanychange = (selectedCompany) => {
    setFormData((prev) => ({
      ...prev,
      company: selectedCompany,
    }));
    setFormErrors((prev) => ({ ...prev, company: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const callUserCompany = async () => {
    if (user && user.compId && !locationId && isAdmin()) {
      const response = await getOneCompany(user.compId);
      setFormData((prev) => ({
        ...prev,
        company: {
          value: response.data.data._id,
          label: response.data.data.name || "",
        },
      }));
    }
  };

  const callApi = async () => {
    if (locationId) {
      const response = await getOneLocation(locationId);
      setFormData({
        ...response.data.data,
        locationName: response.data.data?.locName,
        fullAddress: response.data.data?.address,
        zipCode: response.data.data?.postCode,
        company: {
          label: response.data.data?.company?.name,
          value: response.data.data?.company?._id || "",
        },
      });
    }
  };

  useEffect(() => {
    if (open) {
      callUserCompany();
      callApi();
    }
  }, [open]);

  const handleSubmit = async () => {
    const errors = {};

    if (!formData.company?.value) errors.company = "Company is required";
    if (!formData.locationName.trim())
      errors.locationName = "Location Name is required";
    if (!formData.locationCode.trim())
      errors.locationCode = "Location Code is required";
    if (!formData.fullAddress.trim())
      errors.fullAddress = "Full Address is required";
    if (!formData.zipCode.trim()) errors.zipCode = "Zip Code is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.toMail.trim()) errors.toMail = "To Email is required";
    else if (!emailRegex.test(formData.toMail))
      errors.toMail = "Invalid To Email";

    if (!formData.ccMail.trim()) errors.ccMail = "To Email is required";
    else if (!emailRegex.test(formData.ccMail))
      errors.ccMail = "Invalid To Email";

    setFormErrors(errors);
    setLoading(true); // Start loading

    if (Object.keys(errors).length > 0) return;

    try {
      const payload = {
        ...formData,
        company: formData?.company?.value,
        locName: formData.locationName,
        address: formData.fullAddress,
        postCode: formData.zipCode,
      };

      if (locationId) {
        await updateLocation(locationId, payload);
      } else {
        await createLocation(payload);
      }

      setFormData({
        company: isAdmin() ? formData.company : null,
        locationName: "",
        locationCode: "",
        fullAddress: "",
        zipCode: "",
        toMail: "",
        ccMail: "",
      });

      toggleDrawer(false);
      refreshPage();
    } catch (error) {
      console.log(error);
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
        borderBottom={"2px dashed #E8194F"}
      >
        {`${locationId ? "UPDATE" : "ADD"} LOCATION`}
      </Typography>

      <Stack spacing={2}>
        <CompanyAutoComplete
          onChange={handleCompanychange}
          value={formData.company || null}
          disabled={isAdmin()}
        />
        {formErrors.company && (
          <Typography variant="caption" color="error" pl={1}>
            {formErrors.company}
          </Typography>
        )}

        <TextField
          label="Location Name"
          fullWidth
          size="small"
          name="locationName"
          value={formData.locationName || ""}
          onChange={handleChange}
          error={!!formErrors.locationName}
          helperText={formErrors.locationName}
        />

        <TextField
          label="Location Code"
          fullWidth
          size="small"
          name="locationCode"
          value={formData.locationCode || ""}
          onChange={handleChange}
          error={!!formErrors.locationCode}
          helperText={formErrors.locationCode}
        />

        <TextField
          label="Full Address"
          fullWidth
          size="small"
          name="fullAddress"
          value={formData.fullAddress || ""}
          onChange={handleChange}
          error={!!formErrors.fullAddress}
          helperText={formErrors.fullAddress}
        />

        <TextField
          label="Postal Code / Zip Code"
          fullWidth
          size="small"
          name="zipCode"
          value={formData.zipCode || ""}
          onChange={handleChange}
          error={!!formErrors.zipCode}
          helperText={formErrors.zipCode}
        />

        <TextField
          label="To Email"
          fullWidth
          size="small"
          name="toMail"
          value={formData.toMail || ""}
          onChange={handleChange}
          error={!!formErrors.toMail}
          helperText={formErrors.toMail}
        />

        <TextField
          label="CC Email"
          fullWidth
          size="small"
          name="ccMail"
          value={formData.ccMail || ""}
          onChange={handleChange}
          error={!!formErrors.ccMail}
          helperText={formErrors.ccMail}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              setFormData({
                company: isAdmin() ? formData.company : null,
                locationName: "",
                locationCode: "",
                fullAddress: "",
                zipCode: "",
                toMail: "",
                ccMail: "",
              });
              setFormErrors({});
            }}
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
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default LocationDrawer;
