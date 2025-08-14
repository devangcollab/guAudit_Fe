import { Box, TextField, Button, MenuItem, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CompanyAutoComplete from "../common/CompanyAutoComplete";
import LocationAutoComplete from "../common/LocationAutoComplete";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getOneUser, updateUser } from "../../Apis/user";
import { getAllRoles } from "../../Apis/role";
import { toast } from "react-toastify";
import { getOneCompany } from "../../Apis/company";
import { isAdmin } from "../../utils/auth";

const UserForm = () => {
  const [formData, setFormData] = useState({
    compId: null,
    locId: null,
    name: "",
    email: "",
    phone: "",
    role: "",
  });
    const [loading, setLoading] = useState(false);


  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const callApi = async () => {
    try {
      const response = await getAllRoles();
      setRoles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const callUserCompany = async () => {
    if (user && user.compId && !id && isAdmin()) {
      const response = await getOneCompany(user.compId);


      setFormData((prev) => ({
        ...prev,
        compId: {
          value: response.data.data._id, // handle both population & ID
          label: response.data.data.name || "", // if populated
        },
      }));
    }
  };

  useEffect(() => {
    callUserCompany();
    callApi();
  }, []);

  const callOneUserApi = async () => {
    if (id) {
      const response = await getOneUser(id);
      setFormData({
        ...response.data.data,
        compId: {
          label: response.data.data?.compId?.name,
          value: response.data.data?.compId?._id || "",
        },
        locId: {
          label: response.data.data?.locId?.locName,
          value: response.data.data?.locId?._id || "",
        },
      });
    }
  };

  useEffect(() => {
    callOneUserApi();
  }, [id]);

  const handleSubmit = async () => {
    if (!formData.compId?.value) return toast.warning("Please Select Company");
    if (!formData.locId?.value) return toast.warning("Please Select Location");

    if (!formData.name.trim()) {
      return toast.warning("Please Enter Name");
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.name.trim())) {
      return toast.warning(
        "Name must be at least 2 characters and only letters"
      );
    }

    if (!formData.email.trim()) {
      return toast.warning("Please Enter Email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      return toast.warning("Invalid Email Format");
    }

    if (!formData.phone.trim()) {
      return toast.warning("Please Enter Phone Number");
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      return toast.warning("Phone must be 10 digits");
    }

    if (!formData.role) return toast.warning("Please Select Role");

        setLoading(true); // Start loading


    const payload = {
      ...formData,
      compId: formData?.compId?.value,
      locId: formData?.locId?.value,
    };

    try {
      if (id) {
        await updateUser(id, payload);
        navigate("/userPage");
      } else {
        const response = await createUser(payload);
        if (response) {
          navigate("/userPage");
        }
      }
    } catch (err) {
      console.error(err);
    }  finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      sx={{
        m: 2,
        p: 3,
        mx: "auto",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0px 2px 8px rgba(99, 99, 99, 0.2)",
      }}
    >
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <CompanyAutoComplete
            value={formData.compId}
            onChange={(value) => handleChange("compId", value)}
            fullWidth
            disabled={isAdmin() && true}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <LocationAutoComplete
            value={formData.locId}
            compId={formData?.compId?.value}
            onChange={(value) => handleChange("locId", value)}
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            label="Phone"
            type="tel"
            fullWidth
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            size="small"
            select
            label="Role"
            fullWidth
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            {roles
              .filter((role) => role.roleName !== "SuperAdmin")
              .map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.roleName}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
      </Grid>
      <Stack direction="row" gap={2} justifyContent="flex-end" mt={2}>
        <Button variant="outlined" color="error" onClick={() => navigate("/userPage")}>
          Cancel
        </Button>
         <Button
            variant="contained"
            sx={{ backgroundColor: "#E8194F" }}
            onClick={handleSubmit}
            disabled={loading} // disables while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;
