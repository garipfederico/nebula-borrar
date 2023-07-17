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
import RowProducto from "./RowProducto";
import {useSelector, useDispatch} from "react-redux";

const columns = [
  {id: "id", label: "ID", minWidth: 50},
  {id: "cantidad", label: "Cantidad", minWidth: 100},
  {id: "estado", label: "Estado", minWidth: 100},
  {id: "otraFuncionalidad", label: "otraFuncionalidad", minWidth: 20},
];

export default function StickyHeadTable() {

  // const productos = useSelector((state) => state.misProductos.productos);
  const productos = [
    // {marca:'honda',modelo: 'fit', id:'876'},
    // {marca:'renault',modelo: '12', id:'280'},
    {id:32423, cantidad:120, estado:'Subido', otraFuncionalidad:'holamundo'},
    {id:32422, cantidad:12, estado:'scaneado', otraFuncionalidad:'holamundo'},
    {id:32422, cantidad:12, estado:'scaneado', otraFuncionalidad:'holamundo'},
    {id:32422, cantidad:12, estado:'scaneado', otraFuncionalidad:'holamundo'},
    {id:32422, cantidad:12, estado:'scaneado', otraFuncionalidad:'holamundo'},
    {id:32422, cantidad:12, estado:'scaneado', otraFuncionalidad:'holamundo'},
  ]
  const rows = productos.map((unProducto) => {
    const {id, cantidad, estado, otraFuncionalidad} = unProducto;
    return {
      // marca,
      // modelo,
      // _id,
      id, cantidad, estado, otraFuncionalidad
    };
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    // dispatch(getMyProductos());
  }, [dispatch]);

  return (
    <Paper sx={{width: "100%", overflow: "hidden"}}>
      <TableContainer sx={{maxHeight: "75vh"}}>
        <Table stickyHeader aria-label="sticky table">
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
                  <RowProducto row={row} columns={columns} _id={row._id} />
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
