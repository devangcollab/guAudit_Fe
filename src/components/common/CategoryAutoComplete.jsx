import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {  getSelectedCompanies } from "../../Apis/company";
import { getSelectedCategories } from "../../Apis/category";

const CategoryAutoComplete = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced API call wrapped in useCallback to avoid unnecessary recreations
  const fetchCategory = useCallback(
    debounce(async (query) => {
      setLoading(true);
      try {
        const response = await getSelectedCategories(query)

        const formattedOptions = (response.data.data || []).map((cat) => ({
          label: cat.name,
          value: cat._id,
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching Category:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  
  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchCategory(inputValue);
    } else {
      fetchCategory(""); // Load default options
    }
  }, [inputValue, fetchCategory]);

  return (
    <Autocomplete
    size="small"
      options={options}
      getOptionLabel={(option) => option.label}
      loading={loading}
      value={value || null}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => {
        if (newValue) {
          onChange(newValue);
        } else {
          onChange(null);
        }
      }}
      renderInput={(params) => (
        <TextField
          required
          {...params}
          label="Category"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CategoryAutoComplete;