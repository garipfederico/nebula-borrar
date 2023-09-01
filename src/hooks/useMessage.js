import React from "react";
import { SentimentDissatisfied } from '@mui/icons-material/';
// Redux
import {useDispatch} from "react-redux";
import {openAlertDialog} from "../states/reusable/AlertDialogSlice";

/**
 * 
 * @param {*} isError 
 * @param {*} messageType 
 * @param {*} actionToDispatch 
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
