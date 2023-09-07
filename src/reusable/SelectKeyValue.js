import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Skeleton} from "@mui/material";

export default function SelectKeyValue({
  label,
  selectedValue,
  valueName,
  options,
  formik,
  editing,
  isLoading,
}) {
  const handleChange = (event) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    // Check if a valid option was selected
    if (selectedOption) {
      // Set both key and name in formik
      formik.setFieldValue(valueName, selectedOption.key);
      formik.setFieldValue(valueName + "Description", event.target.value);
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton width={"100%"} height="50px" />
      ) : (
        <Box sx={{minWidth: 120, width: "100%"}}>
          <FormControl
            fullWidth
            size="large"
            variant="standard"
            disabled={!editing}
          >
            <InputLabel
              id="demo-simple-select-label"
              data-cy={`${valueName}-label`}
            >
              {label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={selectedValue}
              id="demo-simple-select"
              label="Estado"
              onChange={handleChange}
              data-cy={valueName}
            >
              {options.map((anOption) => {
                const {key, value} = anOption;
                return (
                  <MenuItem value={value} key={key}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
    </>
  );
}
