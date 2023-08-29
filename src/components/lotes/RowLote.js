import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DeleteForever, Edit} from "@mui/icons-material";
import {IconButton, Skeleton, TableCell, TableRow} from "@mui/material";
import SelectState from "./SelectState";

// import {setRequestTypeDelete, setRequestTypePut} from '../../redux/store/misProductosState'

function RowLote({key, row, columns, _id}) {
  const isLoading = useSelector((state) => state.lotes.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("row.estado ", row.estado);
  const handleEdit = (idProducto) => {
    idProducto.stopPropagation();
    // dispatch(setRequestTypePut())
    navigate("./" + _id, {state: {editing: true}});
  };

  const handleGet = () => {
    // navigate("./" + _id, {state: {editing: false}});
  };

  const activateAlert = (e) => {
    e.stopPropagation();
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.nroDoc}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align} onClick={handleGet}>
            {isLoading ? (
              <Skeleton />
            ) : column.id === "accion" ? (
              <>
                <IconButton onClick={handleEdit}>
                  <Edit color="secondary" />
                </IconButton>
                <IconButton onClick={activateAlert}>
                  <DeleteForever color="warning" />
                </IconButton>
              </>
            ) : column.id === "estado" ? (
              <>
                <SelectState
                  selectedValue={row.estado || ""}
                  nroDoc={row.nroDoc}
                />
              </>
            ) : column.format && typeof value === "number" ? (
              column.format(value)
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default RowLote;
