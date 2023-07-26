import React from "react";
import TextInput from "../../reusable/textInput/TextInput";
import {Box, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import SubmitButton from "../../reusable/buttons/SubmitButton";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import etiquetasSchema from "./etiquetasValidationSchema";
import {postCrearLote} from "../../states/etiquetasState";
import {mockImagesLabelData} from "../../sagas/mockLabelData";
import {useNavigate} from "react-router-dom";
import {openAlertDialog} from "../../states/reusable/AlertDialogSlice";
import {postCrearLoteReset} from "../../states/etiquetasState";
import {responseStrings} from '../../utils/responseStrings' 

function CrearLoteForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isError, response} = useSelector((state) => state.etiquetas);
  const images = response;
  const formik = useFormik({
    initialValues: {
      numeroDeExpediente: "",
      cantidad: "",
    },
    validationSchema: etiquetasSchema.validationSchema,
    onSubmit: (numeroDeExpediente, cantidad) => {
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

  if (isLoading === false && isError === false && response !== null) {
    // navigate("/home");
  }

  if (isLoading === false && isError === true && response !== null) {
    dispatch(
      openAlertDialog({
        title: "Lo sentimos ha ocurrido un error",
        content: responseStrings(response.status),

        icon: "cancel",
        actionCancelButton: () => dispatch(postCrearLoteReset()),
      })
    );
  }

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
        textForTypeRequest={["Crear e Imprimir", "Crear e Imprimir"]}
        handleSubmit={formik.handleSubmit}
      />
      <Box></Box>
    </Stack>
  );
}

export default CrearLoteForm;
