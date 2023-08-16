import React from "react";
import TitleCard from "../../reusable/card/TitleCard";
import Table from "../../reusable/table/Table";
import { Button } from "@mui/material";

// el id de las columnsDefinition tienen que ser las mismas que las 
// que las key de los objetos que vienen del back o de las
//  que tengamos en dataTable
// el campo id de columns se usa para 
const columnsDefinition = [
  {id: "fecha", label: "Fecha", minWidth: 100},
  {id: "numero", label: "Numero", minWidth: 100},
  {id: "nombre", label: "Nombre de documento", minWidth: 20},
];
// esto vendria desde redux-saga
const dataTable = [
  {fecha: "09/02/2022", numero: "030", nombre: "Multa Juan", } ,
  {fecha: "17/04/2023", numero: "025", nombre: "Vencimiento Pedro", },
  {fecha: "17/04/2023", numero: "026", nombre: "Mora Manuel", },
  {fecha: "17/04/2023", numero: "022", nombre: "Multa Federico", },
  {fecha: "17/04/2023", numero: "027", nombre: "Mora Jorge", },
  {fecha: "17/04/2023", numero: "020", nombre: "Vencimiento Emilio", },
  {fecha: "17/04/2023", numero: "021", nombre: "Mora Gustavo", },
  {fecha: "17/04/2023", numero: "023", nombre: "Mora Alejandra", },
];
// Especifica cual de los valores de dataTable sera la key
const idRowDefinition = 'numero'

function Documents() {
  return (
    <TitleCard title="Documentos" subtitle="Un subtitulo" width="80%">
      <Table 
        columnsDefinition={columnsDefinition}
        idsColumnsComponentDefinition={['estado']}
        columnsComponents = {[<Button onClick={(event)=>{console.log(event)}}>Hola</Button>]}
        dataTable={dataTable}
        idRow = {idRowDefinition}
         />
    </TitleCard>
  );
}

export default Documents;
