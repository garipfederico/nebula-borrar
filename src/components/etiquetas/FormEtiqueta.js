import React, {useState} from "react";

// import * as React from 'react';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {Button, Paper} from "@mui/material";
import Tabs from "./Tabs";
import {useFormik} from "formik";
import etiquetasSchema from "./etiquetasValidationSchema";
import SubmitButton from "../../reusable/buttons/SubmitButton";

function FormEtiqueta() {
  const [editing, setEditing] = useState(true);
  const [loading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      cajaId: "",
      cantidad: ""
    },
    validationSchema: etiquetasSchema.validationSchema,
    onSubmit: () => {
      console.log("hola mundo1");
      handleSubmit();
    },
  });
  
  const handleSubmit = () => {
    console.log("hola mundo2");
    console.log(formik.values)
  };

  return (
    <Paper elevation={3} sx={{width: "80%", mb: 5}}>
      {/*     
    <FormControl>
    <FormLabel id="demo-radio-buttons-group-label">Seleccione una accion</FormLabel>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
    >
      <FormControlLabel value="LoteNuevo" control={<Radio />} label="Crear Lote Nuevo" />
      <FormControlLabel value="LoteExistente" control={<Radio />} label="Imprimir Lote existente" />
      <FormControlLabel value="Etiqueta" control={<Radio />} label="Imprimir etiqueta existente" />
      <FormControlLabel value="Paso" control={<Radio />} label="Imprimir Paso" />
    </RadioGroup>
  </FormControl>
 */}

      <Tabs
        loading={loading}
        editing={editing}
        formik={formik}
      />
      
      
    </Paper>
  );
}

export default FormEtiqueta;
