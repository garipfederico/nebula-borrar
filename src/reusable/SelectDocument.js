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


/**
 * @description Validate if its an Array and only with object with structure {name:"exampleName"}
 * @param {*} arr an object to validate
 * @returns 
 */
export function isAnArrayofObjectWithNameAttribute(arr) {
  // Verificar si arr es un arreglo
  if (!Array.isArray(arr)) {
      return false;
  }

  // Iterar a través de los objetos en el arreglo
  for (const obj of arr) {
      // Verificar si cada objeto tiene exactamente la propiedad "name"
      if (Object.keys(obj).length !== 1 || !obj.hasOwnProperty("name")) {
          return false;
      }
  }

  // Si se superan todas las validaciones, la estructura es válida
  return true;
}

export function findIdByName(arrayOfObjects, nameToFind) {
  // Iterar a través del arreglo de objetos
  for (const object of arrayOfObjects) {
      if (object.name === nameToFind) {
          // Si se encuentra el nombre, devolver el ID correspondiente
          return object.id;
      }
  }
  // Si no se encuentra el nombre, puedes devolver un valor por defecto o null, según tus necesidades
  return null;
}


export default function SelectDocument({
  selectedValue,
  optionsState,
  label,
  formik,
  valueName,
  editing,
  isLoading,
}) {

let options = ''
if(isAnArrayofObjectWithNameAttribute(optionsState)){
  options = optionsState
} else {
  const transformedOptionState = optionsState?.map((anOption) => {
    return {name: anOption.name};
  })
  options = transformedOptionState;
}

  const handleChange = (event) => {
      // formik.setFieldValue(valueName, event.target.value);

    if(isAnArrayofObjectWithNameAttribute(optionsState)){
        formik.setFieldValue(valueName, event.target.value);
    } else { 
      const id = findIdByName(optionsState, event.target.value)
      formik.setFieldValue( valueName+'Id', id); // este valor debe estar en el formulario a enviar
    }

  };


  // Array that have indexes numbers for each elements
  const arrayIndexes = Object.keys(options);

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
                const {id, name} = options[index];
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
