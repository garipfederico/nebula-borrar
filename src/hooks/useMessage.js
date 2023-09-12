import React from "react";
import { SentimentDissatisfied } from '@mui/icons-material/';
// Redux
import {useDispatch} from "react-redux";
import {openAlertDialog} from "../states/reusable/AlertDialogSlice";

/**
 * Hook personalizado para mostrar mensajes y realizar acciones en función de isError y messageType.
 * @param {boolean} isError - Indica si se ha producido un error.
 * @param {string} messageType - Tipo de mensaje (puede ser 'noResults' u otros).
 * @param {function} actionToDispatch - Función que se ejecutará cuando se cancele la alerta.
 * @param {function} state - Función que proporciona el estado final o sea  el que tendremos al cerrar el mensaje.
 * @example 
 * import { resetState } from "../../states/documentsState";
 * const {messageType} = useSelector((state) => state.documents);
 * const dispatch = useDispatch();
 *  useMessage(isError, messageType, dispatch, resetState);
 */
function useMessage(isError, messageType, actionToDispatch, state) {
// function useMessage(isError, messageType ) {
  const dispatch = useDispatch();

  if (isError === false && messageType ==='noResults' ) {
    dispatch(
      openAlertDialog({
        icon: "SentimentDissatisfied",
        title: 'Sin resultados',
        content: 'No encontramos lo que buscabas.',
        open: false,
        actionCancelButton: () => {
            actionToDispatch(state());
        },
      })
    );
  }
}

export default useMessage;
