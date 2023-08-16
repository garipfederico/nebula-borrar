import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Skeleton, TableCell, TableRow} from "@mui/material";

function Row({
  columnsDefinition,
  columnKeyName,
  row,
  isLoading
}) {
  const navigate = useNavigate();
  const idRow = row[columnKeyName]

  const handleClick = (idRow) => {
    console.log(idRow)
    // navigate("./" + idRow, {state: {editing: true}});
    navigate("./" + idRow);
  };
  


  // {/* <Skeleton >{value}</Skeleton> */}
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={idRow}>
      {columnsDefinition.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align} onClick={()=>handleClick(idRow)} sx={{cursor: "pointer"}}>
            {isLoading ? 
              (<Skeleton />)
            : 
              (value)
            }
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default Row;
