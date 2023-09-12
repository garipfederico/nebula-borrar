import {Outlet} from "react-router-dom";
import AlertDialogRedux from "./reusable/AlertDialogRedux";
import SnackbarRedux from "./reusable/SnackbarRedux";
import { Box } from "@mui/material";
// TODO eliminar implementaciones de Alert, snackbar sin redux

export default function AppLayout() {
  return (
    <>
    <Box id='separadorInferior' sx={{paddingBottom:4}}>
      <Outlet />
      <AlertDialogRedux />
      <SnackbarRedux />
    </Box>
    </>
  );
}
