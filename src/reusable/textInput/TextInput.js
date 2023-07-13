import React from "react";
import {Box, Skeleton, TextField} from "@mui/material";
import {startCase} from "lodash";

/**
 *
 * @param {*} props
 * @example
 *          <TextInput
 *            nombreVariable="descripcion"
 *            text={formik.values.descripcion}
 *            variant="h6"
 *            editing={editing}
 *            isLoading={isLoading}
 *            formik={formik}
 *            multiline
 *            rows="3"
 * sxTextFieldProp={}
 *          />
 */
function TextInput({
  nombreVariable,
  text,
  variant,
  editing,
  isLoading,
  formik,
  multiline,
  rows,
  sxTextFieldProp,
  type,
}) {
  const textFieldValidationProps = (nombreVariable) => {
    return {
      label: startCase(nombreVariable),
      id: nombreVariable,
      name: nombreVariable,
      value: formik.values?.[nombreVariable],
      onChange: formik.handleChange,
      error:
        formik.touched?.[nombreVariable] && Boolean.errors?.[nombreVariable],
      helperText:
        formik.touched?.[nombreVariable] && formik.errors?.[nombreVariable],
    };
  };

  //Propidades sx por parametro y sino por defecto
  const sxProp = sxTextFieldProp
    ? sxTextFieldProp
    : {
        fullWidth: true,
        fontSize: "large",
        size: "large",
        inputProps: {fontSize: "100px"},
      };

  const calcHeight = rows ? rows * 50 : 50;
  return (
    // <Box sx={{mt: 2}}>
    <>
      {isLoading ? (
        <Skeleton width={"100%"} height={calcHeight + "px"} />
      ) : (
        <TextField
          variant="standard"
          multiline={multiline ? true : false}
          rows={rows ? rows : 1}
          {...sxProp}
          {...textFieldValidationProps(nombreVariable)}
          value={text}
          // type={type ? 'numeric' : "numeric"}
          // inputProps={{
            // inputMode: "numeric", // Permite la entrada numérica en dispositivos móviles
            // pattern: "[0-9]*", // Asegura que solo se ingresen dígitos
          // }}
        />
      )}
    </>
    // </Box>
  );
}

export default TextInput;
