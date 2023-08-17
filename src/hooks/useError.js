import React from "react";
import {useDispatch} from "react-redux";
import {openAlertDialog} from "../states/reusable/AlertDialogSlice";
import {weSorryMessage, responseStrings} from "../data/responseStrings";

function useError(isError, response) {
  const dispatch = useDispatch();
  if (isError) {
    dispatch(
      openAlertDialog({
        icon: "error",
        title: weSorryMessage,
        content: responseStrings(response.status),
        otherMessages: ["Status: " + response.status],
        open: false,
        actionCancelButton: () => {
          //   dispatch(resetState());
        },
      })
    );
  }
}

export default useError;
