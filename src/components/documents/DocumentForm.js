import React, {useEffect} from "react";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {useFormik} from "formik";

// Reusables
import { mapAttributesArrayToKeyValueArray} from "../../utils/transformBackData";
import useError from "../../hooks/useError";
import TextInput from "../../reusable/textInput/TextInput";
import DatePicker from "../../reusable/DatePicker";
import SelectString from "../../reusable/SelectString";
import SelectKeyValue from "../../reusable/SelectKeyValue";
import SubmitButton from "../../reusable/buttons/SubmitButton";
// Components
import DialogForm from "../../reusable/dialogs/DialogForm";

// Redux
import {useSelector, useDispatch} from "react-redux";
import {
  editOneDocument,
  putOneDocument,
  resetState,
} from "../../states/documentsState";

// Data
import documentSchema from "./documentSchema";
import {useNavigate} from "react-router-dom";

function DocumentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const {document, showForm} = useSelector(
    (state) => state.documents
  );
  const {editing, isError, response, requestType, isLoading} = useSelector(
    (state) => state.documents.document
  );
  const {all_document_types, all_confidentialities, all_document_locations} =
    document.data;
  const allDocumentTypes = all_document_types.map((aType) => {
    return {name: aType.type};
  });
  const allConfidentialities = all_confidentialities?.map(
    (aConfidentiality) => {
      return {name: aConfidentiality.level};
    }
  );
  const optionsLocation = mapAttributesArrayToKeyValueArray(all_document_locations, "id", "name");

  useError(isError, response);
  const formik = useFormik({
    initialValues: {
      internal_id: null,
      document_description: "",
      document_type: "",
      confidentiality: "",
      status: "",
      created_at: "",
      location: "",
      locationDescription: "", // Valor agregado, no viene del back
    },
    onSubmit: (values) => {
      if (requestType === "GET") {
        dispatch(editOneDocument());
      } else if (requestType === "PUT") {
        const id = document.data.id;
        const editedDocument = formik.values;
        dispatch(
          putOneDocument({id, editedDocument, navigate, url: "/documents"})
        );
      }
      return values;
    },
    documentSchema,
  });

  useEffect(() => {
    formik.setValues(document.data);    
  }, [document]);

  useEffect(() => {
    setOpen(showForm);
    if (showForm === false) {
      dispatch(resetState({}));
    }
  }, [showForm]);

  return (
    <DialogForm
      navigateOnClose="/documents"
      title="Edicion de documento"
      open={open}
      setOpen={setOpen}
    >
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
                  isLoading={isLoading}
                  nombreVariable="internal_id"
                  text={formik.values.internal_id}
                  variant="h6"
                  editing={false}
                  formik={formik}
                  label="Nro documento"
                />
                <TextInput
                  isLoading={isLoading}
                  nombreVariable="document_description"
                  text={formik.values.document_description}
                  variant="h6"
                  editing={false}
                  formik={formik}
                  label="Nombre" 
                  sxTextFieldProp={null}
                  data-cy="nombre"
                />
                <Box sx={{width: "70%", p: 0}}>
                <DatePicker
                  value={formik.values.created_at || ""}
                  id="created_at"
                  name="created_at"
                  editable={false}
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
                <SelectString
                  label="Categoria"
                  formik={formik}
                  valueName={"document_type"}
                  options={
                    allDocumentTypes
                  }
                  editing={editing}
                  isLoading={isLoading}
                />
                <SelectString
                  label="Nivel de Confidencialidad"
                  formik={formik}
                  valueName="confidentiality"
                  options={
                    allConfidentialities
                  }
                  editing={editing}
                  isLoading={isLoading}
                />
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{p: 2}}>
            <Stack direction="column">
              <Typography variant="h6">Situación Física</Typography>
              <Stack
                direction="row"
                spacing={15}
                justifyContent={"center"}
                sx={{px: 10}}
              >
                <Stack direction="column" spacing={2} width="40%" padding={2}>
                  <Box>
                    <SelectKeyValue
                      label="Edificio"
                      valueName="location"
                      selectedValue={formik.values.locationDescription}
                      options={optionsLocation}
                      formik={formik}
                      editing={editing}
                      isLoading={isLoading}
                    />
                  </Box>
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
          <Button variant="contained" data-cy={"ver"}>
            Ver
          </Button>
          <SubmitButton
            dataCy={"editar"}
            requestType={document.requestType}
            isLoading={isLoading} 
            textForRequestType={["Editar", "", "Guardar"]}
            handleSubmit={formik.handleSubmit}
          />
          <Button variant="contained" data-cy={"imprimir"}>
            Imprimir
          </Button>
          <Button variant="contained" data-cy={"volver"}>
            Volver
          </Button>
        </Stack>
      </Stack>
    </DialogForm>
  );
}
export default DocumentForm;
