import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Reusables
import useAlert from "../../hooks/useAlert";
import useError from "../../hooks/useError";
import SearchBar from "../../reusable/searchBar/SearchBar";
import Table from "../../reusable/table/Table";
import TitleCard from "../../reusable/card/TitleCard";

// Components
import DocumentForm from "./DocumentForm";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {
  getDocuments,
  getOneDocument,
  searchDocuments,
  oneDocumentCancel,
} from "../../states/documentsState";

// Data
import {convertDateFieldObjectsArray} from "../../utils/timeISOtoDDMMYYYY";
// The values of id of the columnsDefinition are the attributes
// of the JSON that come from the back.
const columnsDefinition = [
  {id: "id", label: "", minWidth: 0, hiddenValue: true},
  {id: "created_at", label: "Fecha", minsWidth: 100},
  {id: "internal_id", label: "Numero", minWidth: 100},
  {id: "document_description", label: "Nombre de documento", minWidth: 20},
];

// columnKeyName: Specifies which column of the columnsDefinition will be the key.
// to avoid warnings in the rendering of react tables.
// Also is used to navigate (actualDirection/columnKeyName) when a row is clicked.
// It remains as an improvement, that this will be a property in one of the
// columnsDefinition lines (and not a const outside) to then implement method inside table that in the iteration
//  verifies if it is a row with the specification columnsKeyName then will be added as index of a row.
const columnKeyName = "id";

function Documents() {
  const dispatch = useDispatch();
  const {
    isError,
    isLoading,
    response,
    documents,
    count,
    messageType,
    showForm,
  } = useSelector((state) => state.documents);
  const [textToSearch, setTextToSearch] = useState("");
  const {id: documentId} = useParams();
  const [rowsPerPage, setRowsPerPage] = useState(() => 10);


const handleDocumentRequest = () => {
  if (documentId !== undefined) {
    dispatch(getOneDocument({id: documentId}));
  } else {
    dispatch(oneDocumentCancel());
    dispatch(getDocuments({page: 0, rowsPerPage}));
  }
}

  useEffect(() => {
    handleDocumentRequest()
  }, []);

  useEffect(() => {
   handleDocumentRequest()
  }, [documentId]);

  const documentsDateConverted = convertDateFieldObjectsArray(
    documents,
    "created_at"
  );

  const handleSubmit = () => {
    dispatch(searchDocuments({textToSearch}));
  };

  const handleCleanSearchInput = () => {
    setTextToSearch("");
    dispatch(getDocuments({page: 0, rowsPerPage}));
  };

  const alert = useAlert(isError, messageType);
  useError(isError, response);
  return (
    <TitleCard title="Documentos" subtitle="Un subtitulo" width="80%">
      <Stack direction="column" spacing={2} width="90%" sx={{mb: 5}}>
        <SearchBar
          textToSearch={textToSearch}
          setTextToSearch={setTextToSearch}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          icon={<SearchIcon />}
          size="small"
          buttonWidth="25%"
          inputFieldWidth="60%"
          handleCleanSearchInput={handleCleanSearchInput}
        />
        {alert}
        <Table
          columnsDefinition={columnsDefinition}
          columnKeyName={columnKeyName}
          dataTable={documentsDateConverted}
          isLoading={isLoading}
          isError={isError}
          count={count}
          response={response}
          reduxStateGetter={getDocuments}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        {showForm ? <DocumentForm /> : null}
      </Stack>
    </TitleCard>
  );
}

export default Documents;
