import React, {useEffect, useState} from "react";
import TitleCard from "../../reusable/card/TitleCard";
import Table from "../../reusable/table/Table";
import SearchBar from "../../reusable/searchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {getDocuments, getOneDocument} from "../../states/documentsState";
import {Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useParams} from "react-router-dom";
import DocumentForm from "./DocumentForm";

// The values of id of the columnsDefinition are the attributes
// of the JSON that come from the back.
const columnsDefinition = [
  {id: "id", label: "", minWidth: 0, hiddenValue: true},
  {id: "created_at", label: "Fecha", minWidth: 100},
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
  const {isError, isLoading, response, documents, count} = useSelector(
    (state) => state.documents
  );
  const [showForm, setShowForm] = useState(false);
  const {id: documentId} = useParams();

  useEffect(() => {
    if (documentId !== undefined) {
      setShowForm(true);
      dispatch(getOneDocument({id: documentId}));
    } else {
      setShowForm(false);
    }
  }, [documentId]);

  const handleSubmit = () => {
    console.log("Hola mundo");
  };

  return (
    <TitleCard title="Documentos" subtitle="Un subtitulo" width="80%">
      <Stack direction="column" spacing={2} width="90%" sx={{mb: 5}}>
        <SearchBar
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          icon={<SearchIcon />}
          size="small"
          buttonWidth="25%"
          inputFieldWidth="60%"
        />
        <Table
          columnsDefinition={columnsDefinition}
          columnKeyName={columnKeyName}
          dataTable={documents}
          isLoading={isLoading}
          isError={isError}
          count={count}
          response={response}
          reduxStateGetter={getDocuments}
        />
        {showForm ? <DocumentForm /> : null}
      </Stack>
    </TitleCard>
  );
}

export default Documents;
