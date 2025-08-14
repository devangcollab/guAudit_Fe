import React, { useState, useEffect, useMemo, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "lodash";
import { getLocationByCompany } from "../../Apis/location";

const LocationAutoComplete = ({ onChange, value, compId, fullWidth }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced function memoized with useCallback
  const fetchLocation = useCallback(
    debounce(async (query, compId) => {
      if (!compId) return;

      setLoading(true);
      try {
        const response = await getLocationByCompany(query, compId);

        const formattedOptions = (response.data.data || []).map((loc) => ({
          label: loc.locName,
          value: loc._id,
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Run effect on input change or compId change
  useEffect(() => {
    if (!compId) return;

    fetchLocation(inputValue, compId);
  }, [inputValue, compId]);

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
          label="Location"
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

export default LocationAutoComplete;
