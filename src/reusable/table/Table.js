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
import Row from "./Row";
import {useSelector, useDispatch} from "react-redux";
import {getOptionsState, getDocuments} from "../../states/lotesState";
import {openAlertDialog} from "../../states/reusable/AlertDialogSlice";
import {responseStrings, weSorryMessage} from "../../utils/responseStrings";

export default function Tabla({
  columnsDefinition,
  idsColumnsComponentDefinition,
  columnsComponents,
  dataTable,
  idRow,
}) {
  const dispatch = useDispatch();
  const {results, isError} = useSelector((state) => state.lotes.documents);
  const documents = results || [];

  const rows = dataTable.map((unProducto) => {
    return {
      ...unProducto,
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
              {columnsDefinition.map((column) => (
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
                  <Row
                    key={row.numero}
                    row={row}
                    columnsDefinition={columnsDefinition || []}
                    idRow={idRow}
                    idsColumnsComponentDefinition={
                      idsColumnsComponentDefinition
                    }
                    columnsComponents={columnsComponents}
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
