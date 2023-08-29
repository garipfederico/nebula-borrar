import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {putState} from "../../states/lotesState";
export default function SelectState({selectedValue, nroDoc}) {
  const dispatch = useDispatch();
  const [estado, setEstado] = React.useState(selectedValue);
  const {optionsState} = useSelector((state) => state.lotes);

  const handleChange = (event) => {
    const name = event.target.value;
    setEstado(event.target.value);
    dispatch(putState({name, nroDoc}));
  };

  // Array that have indexes numbers for each elements
  const arrayIndexes = Object.keys(optionsState);

  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth size="small" variant="standard">
        <InputLabel id="demo-simple-select-label">Cambiar estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={estado}
          label="Estado"
          onChange={handleChange}
        >
          {arrayIndexes.map((index) => {
            const {id, name} = optionsState[index];
            return (
              <MenuItem value={name} key={id}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
