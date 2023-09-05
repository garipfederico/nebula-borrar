import React, {useEffect} from "react";
import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {useFormik} from "formik";

// Reusables
import { findValueByKey, transformArray } from "../../utils/transformBackData";
import useError from "../../hooks/useError";
import TextInput from "../../reusable/textInput/TextInput";
import DatePicker from "../../reusable/DatePicker";
import SelectString from "../../reusable/SelectString";
import SelectKeyValue from "../../reusable/SelectKeyValue";
import SubmitButton from "../../reusable/buttons/SubmitButton";
// Components

// Redux
import {useSelector, useDispatch} from "react-redux";
import {editOneDocument, putOneDocument} from "../../states/documentsState";

// Data
import documentSchema from "./documentSchema";
import {useNavigate} from "react-router-dom";

function BodyDocumentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {document, isError, response} = useSelector((state) => state.documents);
  const {editing, requestType, isLoading} = useSelector(
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
  console.log("all_document_locations ", all_document_locations);
  // const optionsLocation = all_document_locations.map(cadena => ({ name: cadena }));
  const optionsLocation = transformArray(all_document_locations, 'id', 'name')
console.log("optionsLocation ",optionsLocation )


  // const optionsLocation = all_document_locations?.map((aLocation) => {
  //   return {name: aLocation.name};
  // });

  console.log("isError ", isError);
  console.log("response ", response);
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
      locationDescription: "",
    },
    onSubmit: (values) => {
      if (requestType === "GET") {
        dispatch(editOneDocument());
      } else if (requestType === "PUT") {
        const id = document.data.id;
        console.log("id ", id);
        const editedDocument = formik.values;
        editedDocument.location = parseInt(formik.values.location);
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
    formik.setFieldValue('locationDescription', findValueByKey(optionsLocation,formik.values.location));
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
                <Box sx={{width:"70%", p:2}}   >
                  <DatePicker
                    value={formik.values.created_at || ""}
                    id="created_at"
                    name="created_at"
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
                <SelectString
                  label="Categoria"
                  formik={formik}
                  valueName={"document_type"}
                  optionsState={
                    allDocumentTypes
                    // [{name: "document"}, {name: "document2"}]
                  }
                  editing={editing}
                  isLoading={isLoading}
                />
                <SelectString
                  label="Nivel de Confidencialidad"
                  formik={formik}
                  valueName="confidentiality"
                  optionsState={
                    allConfidentialities
                    // [{name: "1"}, {name: "2"}]
                  }
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
              <Stack
                direction="row"
                spacing={15}
                justifyContent={"space-around"}
              >
                <Stack direction="column" spacing={2} width="40%">
                  <SelectKeyValue
                    selectedKey ={ formik.values.location }
                    label="Edificio"
                    options={optionsLocation}
                    formik={formik}
                    valueName="location"
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
          <Button variant="contained" data-cy={"ver"}>
            Ver
          </Button>
          <SubmitButton
            dataCy={"editar"}
            requestType={document.requestType}
            isLoading={isLoading} // suele podria se useSelector de redux o un useState
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
    </>
  );
}

export default BodyDocumentForm;
