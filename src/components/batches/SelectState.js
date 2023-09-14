import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {putState} from "../../states/batchesState";

export default function SelectState({selectedValue, id, page, rowsPerPage}) {
  const dispatch = useDispatch();
  const [estado, setEstado] = React.useState(selectedValue);
  const {optionsState} = useSelector((state) => state.batches);

  const handleChange = (event) => {
    const name = event.target.value;
    setEstado(event.target.value);
    dispatch(putState({name, id, page, rowsPerPage}));
  };

  // Array that have indexes numbers for each elements
  const arrayIndexes = Object.keys(optionsState);
  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth size="small" variant="standard">
        <InputLabel id="demo-simple-select-label" key={id}>Cambiar estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={estado}
          label="Estado"
          onChange={handleChange}
        >
          {arrayIndexes.map((index) => {
            const {name} = optionsState[index];       
            return (
              <MenuItem value={name} key={index}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
