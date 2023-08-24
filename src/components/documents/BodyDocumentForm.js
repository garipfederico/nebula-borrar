import React, { useEffect } from "react";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";

// Reusables
import TextInput from "../../reusable/textInput/TextInput";
import DatePicker from "../../reusable/DatePicker";
import Select from "../../reusable/Select";
// Components

// Redux
import {useSelector} from "react-redux";
import {useFormik} from "formik";

// Data
import documentSchema from "./documentSchema";

function BodyDocumentForm() {
  const {document, isLoading} = useSelector((state) => state.documents);
  console.log("document ", document);
  const formik = useFormik({
    initialValues: {
      internal_id: null,
      document_description: "",
      document_type: "",
      confidentiality: "",
      status: "",
      created_at: "",
    },
    onSubmit: (values) => {
      return values;
    },
    documentSchema,
  });

  useEffect(()=>{
    console.log("document.data ",document.data )
    formik.setValues(document.data)
  },[document])

  return (
    <>
      <Stack direction="row" justifyContent={'start'}>
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
                    value={formik.values.created_at || ""}
                    id="createdAt"
                    name="createdAt"
                    editable={true}
                    onChange={formik.setFieldValue}
                    errorProp={
                      formik.touched.created_at &&
                      Boolean(formik.errors.created_at)
                    }
                    helperTextProp={
                      formik.touched.created_at && formik.errors.created_at
                    }
                  />
                </Box>

                <TextInput
                  nombreVariable="internal_id"
                  text={formik.values.internal_id}
                  variant="h6"
                  editing={false}
                  isLoading={isLoading}
                  formik={formik}
                  label="Nro documento" // default nombreVariable
                  sxTextFieldProp={null}
                  // type='password' //default string
                  data-cy="nroDocumento"
                />
                <TextInput
                  nombreVariable="document_description"
                  text={formik.values.document_description}
                  variant="h6"
                  editing={false}
                  isLoading={isLoading}
                  formik={formik}
                  label="Nombre" // default nombreVariable
                  sxTextFieldProp={null}
                  // type='password' //default string
                  data-cy="nombre"
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent={"center"}
                spacing={10}
                sx={{px: 10}}
              >
                <Select
                  label="Categoria"
                  optionsState={[{name: "opcion1"}, {name: "opction2"}]}
                />
                <Select
                  label="Nivel de Confidencialidad"
                  optionsState={[
                    {name: "Confidencialidad 1"},
                    {name: "Confidencialidad 2"},
                  ]}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{p: 2}}>
            <Stack direction="column">
              <Typography variant="h6">Situación Física</Typography>
              <Stack direction="row">
                <Select
                  label="Ubicacion"
                  optionsState={[
                    {name: "Edificio central"},
                    {name: "Anexo I"},
                    {name: "Anexo II"},
                  ]}
                />
                <Select
                  label="Estado"
                  optionsState={[
                    {name: "Iniciado"},
                    {name: "En progreso"},
                    {name: "Escaneado"},
                  ]}
                />
              </Stack>
            </Stack>
          </Paper>
        </Stack>
        <Stack direction="column" justifyContent={'center'} alignItems={'center'} width={'10%'} spacing={3}>
          <Button variant='contained'>Ver</Button>
          <Button variant='contained'>Imprimir</Button>
          <Button variant='contained'>Editar</Button>
          <Button variant='contained'>Volver</Button>
        </Stack>
      </Stack>
    </>
  );
}

export default BodyDocumentForm;
