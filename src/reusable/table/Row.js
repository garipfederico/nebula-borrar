import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Edit} from "@mui/icons-material";
import {Skeleton, TableCell, TableRow} from "@mui/material";

function Row({
  columnsDefinition,
  idsColumnsComponentDefinition,
  columnsComponents,
  key,
  row,
  idRow,
}) {
  const isLoading = useSelector((state) => state.lotes.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEdit = (idProducto) => {
    idProducto.stopPropagation();
    navigate("./" + idRow, {state: {editing: true}});
  };


  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.nroLote}>
      {columnsDefinition.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {isLoading ? (
              <Skeleton />
            )  : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default Row;
