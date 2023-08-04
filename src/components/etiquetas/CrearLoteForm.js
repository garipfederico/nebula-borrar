import React, { useEffect } from "react";
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
import {responseStrings, weSorryMessage} from '../../utils/responseStrings' 

// function CrearLoteForm() {
function CrearLoteForm() {
  const dispatch = useDispatch();
  const {isError, response} = useSelector((state) => state.etiquetas);
  const formik = useFormik({
    initialValues: {
      expedientNumber: "",
      quantity: "",
    },
    validationSchema: etiquetasSchema.validationSchema,
    onSubmit: (expedientNumber, quantity) => {
      dispatch(postCrearLote(expedientNumber, quantity));
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
    // Uncomment next line to navigate to home page after print labels
    // navigate("/home");  
  }

  useEffect(()=>{
    if (isLoading === false && isError === true && response !== null) {
      dispatch(
        openAlertDialog({
          title: weSorryMessage, 
          content: responseStrings(response.status),
        icon: "cancel",
        actionCancelButton: () => dispatch(postCrearLoteReset()),
      })
      );
    }
  },[isLoading, isError, response])

  return (
    <Stack {...nth1StackStyle}>
      <TextInput
        nombreVariable="expedientNumber"
        text={formik.values.expedientNumber}
        label={'Numero de expediente'}
        variant="h6"
        editing={true}
        isLoading={isLoading}
        formik={formik}
        // type="number" ver esto, le paso type number y lo visualiza como password
      />
      <TextInput
        nombreVariable="quantity"
        text={formik.values.quantity}
        label='Cantidad'
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
