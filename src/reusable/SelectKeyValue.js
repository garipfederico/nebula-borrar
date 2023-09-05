import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Skeleton} from "@mui/material";
import {findValueByKey} from "../utils/transformBackData"
// import {useDispatch, useSelector} from "react-redux";
// import {putState, resetState} from "../../states/lotesState";
// import {openAlertDialog} from "../../states/reusable/AlertDialogSlice";
// import {responseStrings, weSorryMessage} from "../../data/responseStrings";

export default function SelectKeyValue({
  selectedKey,
  options,
  label,
  formik,
  valueName,
  editing,
  isLoading,
}) {
  const handleChange = (event) => {
    // console.log("event.target ",event.target )
    // console.log("event.currentTarget ",event.currentTarget )
    // formik.setFieldValue(valueName, event.target.value);
    // formik.setFieldValue(valueName, event.target.value);
    const selectedOption = options.find((option) => option.value === event.target.value);
    
    // Check if a valid option was selected
    if (selectedOption) {
      // Set both key and name in formik
      formik.setFieldValue(valueName, selectedOption.key);
      formik.setFieldValue(valueName+'Description', event.target.value);
    }
  };
  
  // React.useEffect(()=>{
  //   console.log("selectedKey ",selectedKey )
  //   console.log("selectedKey options ",options )
  //   formik.setFieldValue(valueName+'Description', findValueByKey(options, selectedKey));
    
    
  // },[])
  // React.useEffect(()=>{
  //   formik.setFieldValue(valueName+'Description', findValueByKey(options,selectedKey));
  //   // setFormik(findValueByKey(options, selectedKey))

  // },[selectedKey])
  // console.log("formik.values", `${valueName}Description`)
  // console.log("locationDescription",formik.values[`${valueName}Description`] )
  // console.log("formik.values[{valueName}+Description] ",formik.values[`${valueName}Description`] )

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
              id="demo-simple-select"
              // value={formik.values[valueName]}
              // name={`${valueName}`}
              value={formik.values[`${valueName}Description`]}
              // value={"Berazategui Barrio las Palmas - 2 - 5 - 6 - 18"}
              label="Estado"
              onChange={handleChange}
              data-cy={valueName}
            >
              {options.map((anOption) => {
                const {key, value} = anOption;
                console.log('key', key)
                
                return (
                  <MenuItem value={value}  key={key}>
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
