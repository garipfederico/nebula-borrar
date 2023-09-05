import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Skeleton} from "@mui/material";
// import {useDispatch, useSelector} from "react-redux";
// import {putState, resetState} from "../../states/lotesState";
// import {openAlertDialog} from "../../states/reusable/AlertDialogSlice";
// import {responseStrings, weSorryMessage} from "../../data/responseStrings";

export default function SelectString({
  selectedValue,
  optionsState,
  optionName,
  label,
  formik,
  valueName,
  editing,
  isLoading,
}) {
  const handleChange = (event) => {
    formik.setFieldValue(valueName, event.target.value);
  };
  const options = optionsState?.map((aOption) => {
    return {name: aOption.name};
  });
  // Array that have indexes numbers for each elements
  const arrayIndexes = Object.keys(optionsState);

  //  <Skeleton width={"100%"} height={calcHeight + "px"} />
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
            <InputLabel id="demo-simple-select-label"
              data-cy={`${valueName}-label`}
            >
              {label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values[valueName]}
              label="Estado"
              onChange={handleChange}
              data-cy={valueName}
            >
              {arrayIndexes.map((index) => {
                const {id, name} = optionsState[index];
                return (
                  <MenuItem value={name} key={id}>
                    {name}
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
