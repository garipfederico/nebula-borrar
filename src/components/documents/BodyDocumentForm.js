import React from "react";
import {Box, Paper, Stack, Typography} from "@mui/material";

// Reusables
import TextInput from "../../reusable/textInput/TextInput";
import DatePicker from "../../reusable/DatePicker";

// Components

// Redux
import {useSelector, useDispatch} from "react-redux";
import {useFormik} from "formik";

// Data
import documentSchema from "./documentSchema";

function BodyDocumentForm() {
  const {document, isLoading} = useSelector((state) => state.documents);
  console.log("document ", document);
  const formik = useFormik({
    initialValues: {
      internalId: null,
      documentDescription: "",
      documentType: "",
      confidentiality: "",
      status: "",
      createdAt: "",
    },
    onSubmit: (values) => {
      return values;
    },
    documentSchema,
  });
  return (
    <>
      <Stack
        direction="column"
        width={"70vw"}
        spacing={5}
        sx={{margin: "auto"}}
      >
        <Paper sx={{p: 2}}>
          <Stack direction="column">
            <Typography variant="h6">Datos del Documento Digital</Typography>
            <Stack direction="row" spacing={4}>
              <Box width={"100%"}>
                <DatePicker
                  value={formik.values.createdAt || ""}
                  id="createdAt"
                  name="createdAt"
                  editable={true}
                  onChange={formik.setFieldValue}
                  errorProp={
                    formik.touched.createdAt && Boolean(formik.errors.createdAt)
                  }
                  helperTextProp={
                    formik.touched.createdAt && formik.errors.createdAt
                  }
                />
              </Box>

              <TextInput
                nombreVariable="internalId"
                text={formik.values.internalId}
                variant="h6"
                editing={true}
                isLoading={isLoading}
                formik={formik}
                label="Nro documento" // default nombreVariable
                sxTextFieldProp={null}
                // type='password' //default string
                data-cy="nroDocumento"
              />
              <TextInput
                nombreVariable="documentDescription"
                text={formik.values.documentDescription}
                variant="h6"
                editing={true}
                isLoading={isLoading}
                formik={formik}
                label="Nombre" // default nombreVariable
                sxTextFieldProp={null}
                // type='password' //default string
                data-cy="nombre"
              />
            </Stack>
            <Stack direction="row"></Stack>
          </Stack>
        </Paper>
        <Paper>
          <Stack direction="column">
            <Typography variant="h6">Situación Física</Typography>
            <Stack direction="row"></Stack>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default BodyDocumentForm;
