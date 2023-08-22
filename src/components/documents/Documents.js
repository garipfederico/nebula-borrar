import React, {useEffect, useState} from "react";
import TitleCard from "../../reusable/card/TitleCard";
import Table from "../../reusable/table/Table";
import SearchBar from "../../reusable/searchBar/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {getDocuments} from "../../states/documentsState";
import {Stack} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// The values of id of the columnsDefinition are the attributes 
// of the JSON that come from the back.
const columnsDefinition = [
  {id: "created_at", label: "Fecha", minWidth: 100},
  {id: "internal_id", label: "Numero", minWidth: 100},
  {id: "document_description", label: "Nombre de documento", minWidth: 20},
];

// columnKeyName: Specifies which column of the columnsDefinition will be the key.
// to avoid warnings in the rendering of react tables.
// It remains as an improvement, that this will be a property in one of the
// columnsDefinition lines (and not a const outside) to then implement method inside table that in the iteration
//  verifies if it is a row with the specification columnsKeyName then will be added as index of a row.
const columnKeyName = "internal_id";

function Documents() {
  const {isError, isLoading, response, documents, count} = useSelector(
    (state) => state.documents
  );

  const handleSubmit = () => {
    console.log("Hola mundo");
  };

  return (
    <TitleCard title="Documentos" subtitle="Un subtitulo" width="80%">
      <Stack direction="column" spacing={2} width="90%" sx={{mb:5}}>
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
      </Stack>
    </TitleCard>
  );
}

export default Documents;
