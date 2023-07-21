import React from "react";
import TextInput from "../../reusable/textInput/TextInput";
import {Stack} from "@mui/material";
import {useSelector} from "react-redux";
import SubmitButton from "../../reusable/buttons/SubmitButton";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import etiquetasSchema from "./etiquetasValidationSchema";
import {postCrearLote} from "../../states/etiquetasState";

function CrearLoteForm() {
    const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      numeroDeExpediente: "",
      cantidad: "",
    },
    validationSchema: etiquetasSchema.validationSchema,
    onSubmit: (numeroDeExpediente, cantidad) => {
      console.log('hola')
      dispatch(postCrearLote(numeroDeExpediente, cantidad));
    },
  });


  const {isLoading} = useSelector((state) => state.etiquetas);
  const nth1StackStyle = {
    direction: "column",
    width: "30%",
    alignItems: "center",
    sx: {marginX: "auto", my: 4},
    spacing: 5,
  };

  return (
    <Stack {...nth1StackStyle}>
      <TextInput
        nombreVariable="numeroDeExpediente"
        text={formik.values.numeroDeExpediente}
        variant="h6"
        editing={true}
        isLoading={isLoading}
        formik={formik}
        // type="number" ver esto, le paso type number y lo visualiza como password 
      />
      <TextInput
        nombreVariable="cantidad"
        text={formik.values.cantidad}
        variant="h6"
        editing={true}
        isLoading={isLoading}
        formik={formik}
      />
      <SubmitButton
        requestType="POST" // suele podria se useSelector de redux o un useState
        isLoading={isLoading} // suele podria se useSelector de redux o un useState
        postOrPutTexts={["Crear e Imprimir", ""]}
        handleSubmit={formik.handleSubmit}
      />
    </Stack>
  );
}

export default CrearLoteForm;
