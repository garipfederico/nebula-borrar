import React, { useEffect } from "react";
import TitleCard from "../../reusable/card/TitleCard";
import Table from "../../reusable/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../states/documentsState";

// The id of the columnsDefinition has to be the same as 
// the ids of the key of the objects that come from the back
const columnsDefinition = [
  {id: "fecha", label: "Fecha", minWidth: 100},
  {id: "internal_id", label: "Numero", minWidth: 100},
  {id: "document_description", label: "Nombre de documento", minWidth: 20},
];

// columnKeyName: Especifica cual columna de la columnsDefinition sera la key
// Queda como mejora, que esto sea una propiedad en una de las
// columnsDefinition para luego implementar metodo adentro de table

  const columnKeyName = 'internal_id'

  function Documents() {
    const dispatch = useDispatch()
    const {isError, isLoading, response} = useSelector((state) => state.documents)
    const dataTable = useSelector((state) => state.documents.documents) || []
    useEffect(()=>{
      dispatch(getDocuments({}))
    },[])

    

  return (
    <TitleCard title="Documentos" subtitle="Un subtitulo" width="80%">
      <Table 
        columnsDefinition={columnsDefinition}
        dataTable={dataTable}
        columnKeyName = {columnKeyName}
        isLoading = {isLoading}
        isError = {isError}
        response = {response}
         />
    </TitleCard>
  );
}

export default Documents;
