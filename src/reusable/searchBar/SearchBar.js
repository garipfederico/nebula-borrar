import React from "react";
import {useState} from "react";
import {Box, IconButton, Paper, Stack, TextField} from "@mui/material";
import {HighlightOff} from "@mui/icons-material/";
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
  setTextToSearch,
  handleCleanSearchInput
}) {
  return (
    <Paper sx={{p: 3}}>
      <Stack direction="row" justifyContent={"start"}>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <IconButton
          aria-label="delete"
          disabled={textToSearch === "" ? true : false}
          color="primary"
          onClick={handleCleanSearchInput}
          sx={{mr:8}}
        >
          <HighlightOff />
        </IconButton>

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
