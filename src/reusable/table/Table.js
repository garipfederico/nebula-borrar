import useError from "../../hooks/useError";
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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Tabla({
  columnsDefinition,
  dataTable,
  columnKeyName,
  isLoading,
  isError,
  response,
  count,
  reduxStateGetter
  // page,
  // rowsPerPage,
  // handleChangePage,
  // handleChangeRowsPerPage
}) {
  const dispatch = useDispatch();
  useError(isError, response);


  const [page, setPage] = useState(()=>0);
  const [rowsPerPage, setRowsPerPage] = useState(()=>10);
  
  useEffect(() => {
    dispatch(reduxStateGetter({page, rowsPerPage}));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

useEffect(()=>{
  dispatch(reduxStateGetter({page, rowsPerPage}))
},[page, rowsPerPage])



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
              {dataTable
              .map((row, index) => { 
                return (
                  <Row
                    key={index}
                    columnKeyName={columnKeyName}
                    row={row}
                    columnsDefinition={columnsDefinition || []}
                    isLoading={isLoading}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      labelRowsPerPage="Documentos por pagina"
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={count} // ESTE TIENE QUE VENIR DEL BACK
        rowsPerPage={rowsPerPage}
        page={page} // este valor miltiplicado por las rowPerPage + 1 dan el numero inicial o sea ->1-10 of 10. ES AUTOMATICO
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // Page = Pagina
        // Limit = rowsPerPage
        // Offset = Page * Limit  
      />
    </Paper>
  );
}
