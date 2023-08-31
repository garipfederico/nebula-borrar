import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {useNavigate} from "react-router-dom";
import {Paper, Stack, Typography} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogForm({
  children,
  navigateOnClose,
  title,
  subtitle,
}) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    if (navigateOnClose) {
      navigate(navigateOnClose);
    }
  };

  return (
    <div>
      <Stack>
        <Dialog
          fullWidth={true}
          maxWidth={"100vw"}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <Paper
            elevation={6}
            sx={{
              width: "90%",
              height: "90px",
              position: "relative",
              marginX: "auto",
              top: "5px",
              zIndex: 255,
              background: "linear-gradient(90deg, #67BF6B, #4BA64F)",
              paddingLeft: 2,
            }}
          >
            <Stack
              height="100%"
              direction="column"
              justifyContent="center"
              alignItems="start"
            >
              <Typography color="white" variant={"h6"} textAlign={"end"}>
                {title}
              </Typography>

              <Typography color="white" variant={"caption"} textAlign={"end"}>
                {subtitle}
              </Typography>
            </Stack>
          </Paper>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </div>
  );
}
