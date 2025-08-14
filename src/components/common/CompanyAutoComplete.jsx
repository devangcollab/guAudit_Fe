import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getSelectedCompanies } from "../../Apis/company";

const CompanyAutoComplete = ({ onChange, value, fullWidth, disabled }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced API call wrapped in useCallback to avoid unnecessary recreations
  const fetchCompanies = useCallback(
    debounce(async (query) => {
      setLoading(true);
      try {
        const response = await getSelectedCompanies(query);

        const formattedOptions = (response.data.data || []).map((comp) => ({
          label: comp.name,
          value: comp._id,
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Fetch organizations when inputValue changes
  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchCompanies(inputValue);
    } else {
      fetchCompanies(""); // Load default options
    }
  }, [inputValue, fetchCompanies]);

  return (
    <Autocomplete
      readOnly={disabled}
      size="small"
      fullWidth={fullWidth ? fullWidth : ""}
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
          label="Company"
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

export default CompanyAutoComplete;
