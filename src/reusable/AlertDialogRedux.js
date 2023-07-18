import {useDispatch, useSelector} from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Stack, Typography} from "@mui/material";
//Implementacion para useAlertContext (IGC)
// import useAlert from '../../hooks/useAlert'
import {closeAlertDialog} from "../states/reusable/AlertDialogSlice";

function AlertDialogRedux(props) {
  const dispatch = useDispatch();
  const {
    open,
    title,
    content,
    actionAcceptButton,
    textAcceptButton,
    textCancelButton,
    otherMessages,
  } = useSelector((state) => state.alertDialog);

  console.log("open ", open);

  const handleClose = () => {
    dispatch(closeAlertDialog());
  };

  const handleAcceptButton = () => {
    if(actionAcceptButton){
      actionAcceptButton()
    }
    handleClose();
  };

  const messages = otherMessages.map((aMessage, index) => (
    <Typography variant="b1" key={index}>{aMessage}</Typography>
  ));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          alignItems="center"
          aligntContent="center"
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <DialogContentText id="alert-dialog-description">
              {content}
              <Stack direction='column'>
              {messages}
              </Stack>

            </DialogContentText>
            {props.children}
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
          }}
        >
          {textCancelButton ? (
            <Button
              color="error"
              variant="contained"
              id="cancelarAlertDialog"
              onClick={handleClose}
              autoFocus
            >
              {textCancelButton}
            </Button>
          ) : null}
          <Button
            color="primary"
            variant="contained"
            id="aceptarAlertDialog"
            onClick={handleAcceptButton}
          >
            {textAcceptButton ? textAcceptButton : "Aceptar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogRedux;

/*
// Copiar para implementar

//Estados del AlertDialog a usar en el padre
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
// Evento que abre el dialogo
    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

// Componente a usar en el padre
<AlertDialog
                open={openAlertDialog}
                setOpen={setOpenAlertDialog}
                title={ 'Está por eliminar al cliente' + formik.values.nombre}
                content='¿Seguro desea eliminarlo?'
                buttonTextAccept='Borrar'
                buttonTextDeny='Cancelar'
                buttonActionAccept={deleteCliente}
            >
                <DeleteForeverIcon color="warning" fontSize="medium" />
</AlertDialog>

*/
