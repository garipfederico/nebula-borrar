import React, {useEffect} from "react";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {useFormik} from "formik";

// Reusables
import TextInput from "../../reusable/textInput/TextInput";
import DatePicker from "../../reusable/DatePicker";
import SelectDocument from "../../reusable/SelectDocument";
import SubmitButton from "../../reusable/buttons/SubmitButton";
// Components

// Redux
import {useSelector, useDispatch} from "react-redux";
import {editOneDocument, putOneDocument} from "../../states/documentsState";

// Data
import documentSchema from "./documentSchema";

function BodyDocumentForm() {
  const dispatch = useDispatch();
  const {document} = useSelector((state) => state.documents);
  const {editing, requestType, isLoading} = useSelector(
    (state) => state.documents.document
  );
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
      console.log("Hola mundete");
      if (requestType === "GET") {
        dispatch(editOneDocument());
      } else if (requestType === "PUT") {
        dispatch(putOneDocument());
      }
      return values;
    },
    documentSchema,
  });

  useEffect(() => {
    formik.setValues(document.data);
  }, [document]);

  return (
    <>
      <Stack direction="row" justifyContent={"start"}>
        <Stack
          direction="column"
          width={"70vw"}
          spacing={5}
          sx={{margin: "auto"}}
        >
          <Paper sx={{p: 2}}>
            <Stack direction="column" spacing={4}>
              <Typography variant="h6">Datos del Documento Digital</Typography>
              <Stack direction="row" spacing={5}>

                <TextInput
                  nombreVariable="internal_id"
                  text={formik.values.internal_id}
                  variant="h6"
                  editing={editing}
                  isLoading={isLoading}
                  formik={formik}
                  label="Nro documento" // default nombreVariable
                  // sxTextFieldProp={null}
                  // type='password' //default string
                  data-cy="nroDocumento"
                />
                <TextInput
                  nombreVariable="document_description"
                  text={formik.values.document_description}
                  variant="h6"
                  editing={editing}
                  isLoading={isLoading}
                  formik={formik}
                  label="Nombre" // default nombreVariable
                  sxTextFieldProp={null}
                  // type='password' //default string
                  data-cy="nombre"
                />
                <Box width={"70%"}>
                  <DatePicker
                    value={formik.values.created_at || ""}
                    id="createdAt"
                    name="createdAt"
                    editable={editing}
                    onChange={formik.setFieldValue}
                    errorProp={
                      formik.touched.created_at &&
                      Boolean(formik.errors.created_at)
                    }
                    helperTextProp={
                      formik.touched.created_at && formik.errors.created_at
                    }
                    isLoading={isLoading}
                  />
                </Box>
              </Stack>
              <Stack
                direction="row"
                justifyContent={"center"}
                spacing={10}
                sx={{px: 10}}
              >
                <SelectDocument
                  label="Categoria"
                  formik={formik}
                  valueName="document_type"
                  optionsState={[{name: "document"}, {name: "document2"}]}
                  editing={editing}
                  isLoading={isLoading}
                />
                <SelectDocument
                  label="Nivel de Confidencialidad"
                  formik={formik}
                  valueName="confidentiality"
                  optionsState={[{name: "1"}, {name: "2"}]}
                  value={formik.values.confidentiality}
                  editing={editing}
                  isLoading={isLoading}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{p: 2}}>
            <Stack direction="column">
              <Typography variant="h6">Situación Física</Typography>
              <Stack direction="row" spacing={15} justifyContent={'space-around'}>
              <Stack direction="column" spacing={2} width='40%'>
                <SelectDocument
                  label="Edificio"
                  formik={formik}
                  valueName="confidenciality"
                  optionsState={[
                    {name: "Edificio central"},
                    {name: "Anexo I"},
                    {name: "Anexo II"},
                  ]}
                  editing={editing}
                  isLoading={isLoading}
                  />
                <SelectDocument
                  label="Piso"
                  formik={formik}
                  valueName="confidenciality"
                  optionsState={[
                    {name: "Oficina"},
                    {name: "Anexo I"},
                    {name: "Anexo II"},
                  ]}
                  editing={editing}
                  isLoading={isLoading}
                  />
                <SelectDocument
                  label="Oficina"
                  formik={formik}
                  valueName="confidenciality"
                  optionsState={[
                    {name: "Edificio central"},
                    {name: "Anexo I"},
                    {name: "Anexo II"},
                  ]}
                  editing={editing}
                  isLoading={isLoading}
                  />
                <SelectDocument
                  label="Estante"
                  formik={formik}
                  valueName="confidenciality"
                  optionsState={[
                    {name: "Edificio central"},
                    {name: "Anexo I"},
                    {name: "Anexo II"},
                  ]}
                  editing={editing}
                  isLoading={isLoading}
                  />
                <SelectDocument
                  label="Caja"
                  formik={formik}
                  valueName="confidenciality"
                  optionsState={[
                    {name: "Edificio central"},
                    {name: "Anexo I"},
                    {name: "Anexo II"},
                  ]}
                  editing={editing}
                  isLoading={isLoading}
                  />
                  </Stack>

                <Stack  width='50%'>
                <SelectDocument
                  label="Estado"
                  formik={formik}
                  valueName="status"
                  optionsState={[
                    {name: "inicializado"},
                    {name: "en progreso"},
                    {name: "escaneado"},
                  ]}
                  editing={editing}
                  isLoading={isLoading}
                />
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
        <Stack
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
          width={"10%"}
          spacing={3}
        >
          <Button variant="contained">Ver</Button>
          <SubmitButton
            requestType={document.requestType}
            isLoading={isLoading} // suele podria se useSelector de redux o un useState
            textForRequestType={["Editar", "", "Guardar"]}
            handleSubmit={formik.handleSubmit}
          />
          <Button variant="contained">Imprimir</Button>
          <Button variant="contained">Volver</Button>
        </Stack>
      </Stack>
    </>
  );
}

export default BodyDocumentForm;
