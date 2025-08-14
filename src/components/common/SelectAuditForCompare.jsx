 
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import moment from "moment";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectAuditForCompare = ({ auditData, onChange, value }) => {

  return (
    <Autocomplete
      size="small"
      multiple
      id="checkboxes-tags-demo"
      options={auditData}
      value={value} // Controlled value from parent
      onChange={(event, newValue) => onChange(newValue)} // Pass selected values to parent
      getOptionLabel={(option) => moment(option.createdAt).format("DD/MM/YYYY")}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {moment(option.createdAt).format("DD/MM/YYYY")}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Audit for Compare" />
      )}
    />
  );
};

export default SelectAuditForCompare;