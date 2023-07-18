import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  open: false,
  title: "",
  content: "",
  actionAcceptButton: "",
  textAcceptButton: "",
  textCancelButton: "",
  otherMessages: [""],
};

 /**
 * @example
 * import {
  closeAlertDialog,
  openAlertDialog,
} from "../redux/reusables/AlertDialogSlice";
 * 
 * dispatch(
        openAlertDialog({
          title: "Ha ocurrido un error",
          content: "Lo sentimos ha ocurrido un error",
          textCancelButton: "Cerrar",
          otherMessages: [
            "Message: " + errorRequest?.message,
            "Name:" + errorRequest?.name,
            "Code: " + errorRequest?.code,
          ]
        })
      )     
 **/

export const alertDialogSlice = createSlice({
  name: "alertDialog",
  initialState,
  reducers: {
    openAlertDialog: (state, action) => {
      const pay = action.payload
      state.open = true;
      state.actionAcceptButton = pay.actionAcceptButton;
      state.textAcceptButton = pay.textAcceptButton;
      state.textCancelButton = pay.textCancelButton;
      state.title = pay.title;
      state.content = pay.content;
      state.otherMessages = pay.otherMessages
        ? pay.otherMessages
        : [""];
    },
    closeAlertDialog: () => initialState,
  },
});

// export const {handleShow, resetState} = alertDialogSlice.actions;
export const {closeAlertDialog, openAlertDialog} = alertDialogSlice.actions;

export default alertDialogSlice.reducer;
