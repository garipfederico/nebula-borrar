import React from "react";
import {useState} from "react";
import {Paper, Stack, TextField} from "@mui/material";
import SubmitButton from "../buttons/SubmitButton";

function SearchBar({
  isLoading,
  handleSubmit,
  icon,
  size,
  buttonWidth,
  inputFieldWidth,
}) {
  const [inputSearch, setInputSearch] = useState("");
  return (
    <Paper sx={{p: 3}}>
      <Stack direction="row" justifyContent={"space-around"}>
        <TextField
          sx={inputFieldWidth ? {width: inputFieldWidth} : null}
          id="inputSearch"
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
          size={size}
          // label='Buscar'
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
