import React from "react";
import TextInput from "../../reusable/textInput/TextInput";
import {Stack} from "@mui/material";
import {useSelector} from "react-redux";
import SubmitButton from "../../reusable/buttons/SubmitButton";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import etiquetasSchema from "./etiquetasValidationSchema";
import {postCrearLote} from "../../states/etiquetasState";

function ReimprimirLoteForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      cajaId: "",
      cantidad: "",
    },
    validationSchema: etiquetasSchema.validationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    dispatch(postCrearLote());
  };
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
        nombreVariable="cajaId"
        text={formik.values.cajaId}
        variant="h6"
        editing={true}
        isLoading={isLoading}
        formik={formik}
        type="number"
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
        textForRequestType={["", "Crear e Imprimir", ""]}
        handleSubmit={formik.handleSubmit}
      />
    </Stack>
  );
}

export default ReimprimirLoteForm;
