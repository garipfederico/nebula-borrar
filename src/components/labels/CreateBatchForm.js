import React, {useEffect} from "react";
import {Box, Stack} from "@mui/material";
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
// Reusables
import useError from "../../hooks/useError"
import TextInput from "../../reusable/textInput/TextInput";
import SubmitButton from "../../reusable/buttons/SubmitButton";
// Componentes
import labelsSchema from "./labelsValidationSchema";
// Redux
import {postCrearLote, postCrearLoteReset} from "../../states/labelsState";
import {openSnackbar} from "../../states/reusable/SnackbarSlice";
// Data

// function CrearLoteForm() {
function CreateBatchForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, response} = useSelector((state) => state.labels);
  const formik = useFormik({
    initialValues: {
      expedientNumber: "",
      quantity: "",
    },
    validationSchema: labelsSchema.validationSchema,
    onSubmit: (expedientNumber, quantity) => {
      dispatch(postCrearLote(expedientNumber, quantity));
    },
  });

  const {isLoading} = useSelector((state) => state.labels);

  const nth1StackStyle = {
    direction: "column",
    width: "30%",
    alignItems: "center",
    sx: {marginX: "auto", my: 4},
    spacing: 5,
  };
  useEffect(() => {
    if (isLoading === false && isError === false && response !== null) {
      navigate("/home");
      dispatch(
        openSnackbar({
          snackbarMessage: "Lote creado exitosamente. Un momento por favor.",
        })
      );
      dispatch(postCrearLoteReset());
    }
  }, [isLoading]);

  useError(isError, response)

  return (
    <Stack {...nth1StackStyle}>
      <TextInput
        nombreVariable="expedientNumber"
        text={formik.values.expedientNumber}
        label={"Numero de expediente"}
        variant="h6"
        editing={true}
        isLoading={isLoading}
        formik={formik}
      />
      <TextInput
        nombreVariable="quantity"
        text={formik.values.quantity}
        label="Cantidad"
        variant="h6"
        editing={true}
        isLoading={isLoading}
        formik={formik}
      />
      <SubmitButton
        requestType="POST"
        isLoading={isLoading}
        textForRequestType={["Crear e Imprimir", "Crear e Imprimir"]}
        handleSubmit={formik.handleSubmit}
      />
      <Box></Box>
    </Stack>
  );
}

export default CreateBatchForm;
