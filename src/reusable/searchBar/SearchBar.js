import React from "react";
import {useState} from "react";
import {Paper, Stack, TextField} from "@mui/material";
// Reusables
import SubmitButton from "../buttons/SubmitButton";

function SearchBar({
  isLoading,
  handleSubmit,
  icon,
  size,
  buttonWidth,
  inputFieldWidth,
  textToSearch,
  setTextToSearch
}) {

  return (
    <Paper sx={{p: 3}}>
      <Stack direction="row" justifyContent={"space-around"}>
        <TextField
          sx={inputFieldWidth ? {width: inputFieldWidth} : null}
          id="textToSearch"
          name="textToSearch"
          value={textToSearch}
          onChange={(e) => {
            setTextToSearch(e.target.value);
          }}
          size={size}
          label="Buscar un documento"
        />
        <SubmitButton
          requestType={"GET"}
          textForRequestType={["Buscar"]}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          icon={icon}
          size={size}
          width={buttonWidth}
        />
      </Stack>
    </Paper>
  );
}

export default SearchBar;
