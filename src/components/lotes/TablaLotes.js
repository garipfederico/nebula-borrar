import {useEffect, useState} from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
// Reusables

// Components
import RowLote from "./RowLote";

// Redux
import {useSelector, useDispatch} from "react-redux";
import {getOptionsState, getDocuments} from "../../states/lotesState";
import { openAlertDialog } from "../../states/reusable/AlertDialogSlice";

// Data
import { responseStrings, weSorryMessage } from "../../data/responseStrings";

const columns = [
  {id: "nroDoc", label: "N° de Documento", minWidth: 100},
  {id: "operador", label: "Operador", minWidth: 100},
  {id: "fecha", label: "Fecha", minWidth: 20},
  {id: "estado", label: "Estado", minWidth: 50},
];

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const {results, isError} = useSelector((state) => state.lotes.documents);
  const documents = results || [];
  console.log("results", documents);
  // Adapt the  structure's data of the response from API to the frontend structure
  const transformData = documents.map((unDoc) => {
    console.log(unDoc.status)
    return {
      nroDoc: unDoc.id,
      operador: unDoc.internal_id,
      fecha: "12/04/2021",
      estado: unDoc.status,
    };
  });

  const documentos = transformData;

  const rows = documentos.map((unProducto) => {
    const {nroDoc, operador, fecha, estado} = unProducto;
    return {
      nroDoc,
      operador,
      fecha,
      estado,
    };
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getOptionsState());
    // dispatch(getDocuments());
  }, []);
 
  return (
    <Paper sx={{width: "100%", overflow: "hidden"}}>
      <TableContainer sx={{ overflowX: "auto"}} >
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <RowLote
                    key={row.nroDoc}
                    row={row}
                    columns={columns}
                    _id={row._id}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
