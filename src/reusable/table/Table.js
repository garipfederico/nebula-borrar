import {useEffect, useState} from "react";
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
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

export default function Tabla({
  columnsDefinition,
  dataTable,
  columnKeyName,
  isLoading,
  isError,
  response,
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage
}) {

  const [rows, setRows] = useState([])
  

  useEffect(()=>{

    setRows( dataTable.map((aRow) => {
      return {
        ...aRow,
      };
    })
    )
    
  },[])

  useError(isError, response);
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
