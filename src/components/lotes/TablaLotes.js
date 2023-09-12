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
import {getOptionsState} from "../../states/lotesState";

// Data
import {convertDateFieldObjectsArray} from "../../utils/timeISOtoDDMMYYYY";

const columns = [
  {id: "nroDoc", label: "N° de Documento", minWidth: 100},
  {id: "fecha", label: "Fecha", minWidth: 20},
  {id: "descripcion", label: "Descripción del documento", minWidth: 20},
  {id: "estado", label: "Estado", minWidth: 50},
];

// Hacer un navigate al id o sea al id de python
// El internal_id es para mostrar en el front
// Debo pasar una columna o un parametro id para poder hacer la solicitud al back
// con el id

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const {results} = useSelector((state) => state.lotes.documents);
  const documents = results || [];
  // Adapt the  structure's data of the response from API to the frontend structure
  const transformData = documents.map((unDoc) => {
    return {
      id: unDoc.id,
      nroDoc: unDoc.internal_id,
      fecha: unDoc.created_at,
      descripcion: unDoc.document_description,
      estado: unDoc.status,
    };
  });

  const ArrayDateFieldFormatted = convertDateFieldObjectsArray(
    transformData,
    "fecha"
  );

  const documentos = ArrayDateFieldFormatted;
  const rows = documentos.map((unProducto) => {
    const {id, nroDoc, fecha, descripcion, estado} = unProducto;
    return {
      id,
      nroDoc,
      fecha,
      descripcion,
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
  }, []);

  return (
    <Paper sx={{width: "100%", overflow: "hidden"}}>
      <TableContainer sx={{overflowX: "auto"}}>
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
                    id={row.id}
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
