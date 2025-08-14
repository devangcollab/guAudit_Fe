import React, { useState, useEffect, useMemo, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "lodash";
import { getLocationByCompany } from "../../Apis/location";
import { getSelectedAudits } from "../../Apis/form";

const AuditAutoComplete = ({ onChange, value, locId, fullWidth }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);


  // Debounced function memoized with useCallback
  const fetchLocation = useCallback(
    debounce(async (query, locId) => {
      if (!locId) return;

      setLoading(true);
      try {
        const response = await getSelectedAudits(query, locId);


        const formattedOptions = (response.data.data || []).map((audit) => ({
          label: audit.questionId?.title,
          value: audit?.questionId?._id,
        }));
        // setOptions(formattedOptions);
        
        const seen = new Set();
        const uniqueOptions = formattedOptions.filter((option) => {
          if (seen.has(option.label)) return false;
          seen.add(option.label);
          return true;
        });
        
        setOptions(uniqueOptions);
        
      } catch (error) {
        console.error("Error fetching locations:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Run effect on input change or locId change
  useEffect(() => {
    if (!locId) return;

    fetchLocation(inputValue, locId);
  }, [inputValue, locId]);

  // Clean up debounced function on unmount
  useEffect(() => {
    return () => {
      fetchLocation.cancel();
    };
  }, [fetchLocation]);

  return (
    <Autocomplete
      size="small"
      fullWidth={!!fullWidth}
      options={options}
      getOptionLabel={(option) => option.label}
      loading={loading}
      value={value || null}
      isOptionEqualToValue={(option, val) => option.value === val?.value}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => {
        onChange(newValue || null);
      }}
      renderInput={(params) => (
        <TextField
          required
          {...params}
          label="Audit"
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

export default AuditAutoComplete;
