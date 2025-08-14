import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LiveCategoryTable from "../tables/Categories/LiveCategoryTable";
import DeletedCategoryTable from "../tables/Categories/DeletedCategoryTable";
import {
  createCategory,
  getOneCategory,
  updateCategory,
} from "../Apis/category";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showLive, setShowLive] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // sm = <600px

  const navigate = useNavigate();

  const { id } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadData = async () => {
    if (id) {
      const res = await getOneCategory(id);
      setFormData({ categoryName: res.data.data.name });
    } else {
      setFormData({ categoryName: "" });
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleSubmit = async () => {
    if (!formData.categoryName?.trim()) {
      return toast.warning("Please enter a category name.");
    }

    setLoading(true); // Start loading

    try {
      if (id) {
        await updateCategory(id, formData);
      } else {
        await createCategory(formData);
      }
      setShowForm(!showForm);
      setRefreshKey((prev) => prev + 1);
      navigate("/categoryPage");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false); // Stop loading
      setFormData("")
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        direction={isSmallScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isSmallScreen ? "stretch" : "center"}
        flexWrap="wrap"
      >
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button
            variant="contained"
            sx={{
              borderRadius: "3rem",
              px: 5,
              color: showLive ? "white" : "black",
              backgroundColor: showLive ? "#E8194F" : "white",
              whiteSpace: "nowrap",
            }}
            onClick={() => setShowLive(true)}
          >
            Category
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "3rem",
              px: 5,
              color: showLive ? "black" : "white",
              backgroundColor: showLive ? "white" : "#E8194F",
              whiteSpace: "nowrap",
            }}
            onClick={() => setShowLive(false)}
          >
            Deleted / Archived
          </Button>
        </Box>

        {showLive && (
          <Box mt={isSmallScreen ? 1 : 0}>
            <Button
              variant="contained"
              fullWidth={isSmallScreen}
              sx={{ borderRadius: "3rem", px: 5 }}
              onClick={() => setShowForm(!showForm)}
            >
              Add Category
            </Button>
          </Box>
        )}
      </Stack>
      {showForm && showLive && (
        <Stack
          mt={4}
          direction={isSmallScreen ? "column" : "row"}
          alignItems="center"
          spacing={2}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Enter Category Name"
            name="categoryName"
            value={formData.categoryName || ""}
            onChange={handleChange}
          />

          <Button
            fullWidth={isSmallScreen}
            variant="contained"
            sx={{ backgroundColor: "#E8194F", px: 5, borderRadius: "3rem" }}
            onClick={handleSubmit}
            disabled={loading} // disables while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      )}

      <Box mt={3}>
        {showLive ? (
          <LiveCategoryTable
            setShowForm={setShowForm}
            refreshKey={refreshKey}
          />
        ) : (
          <DeletedCategoryTable />
        )}
      </Box>
    </>
  );
};

export default CategoryPage;
