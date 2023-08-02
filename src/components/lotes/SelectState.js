import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useDispatch, useSelector} from "react-redux";
import {putState, resetState} from "../../states/lotesState";
import {openAlertDialog} from "../../states/reusable/AlertDialogSlice";
import {responseStrings, weSorryMessage} from "../../utils/responseStrings";

export default function SelectState({selectedValue, nroLote}) {
  const dispatch = useDispatch();
  const [estado, setEstado] = React.useState(selectedValue);
  const {optionsState, isError, response} = useSelector((state) => state.lotes);
  const estadoAnteriorRef = React.useRef(selectedValue);

  const handleChange = (event) => {
    const status_name = event.target.value;
    // console.log('nroLote', nroLote)
    // console.log("estado ", estado);
    // console.log("estadoAnteriorRef.current ", estadoAnteriorRef.current);
    setEstado(event.target.value);
    dispatch(putState({status_name, nroLote}));
  };

  React.useEffect(() => {
    if (isError) {
      dispatch(
        openAlertDialog({
          icon: "error",
          title: weSorryMessage,
          content: responseStrings(response.status),
          otherMessages: ["Status: " + response.status],
          open: false,
          actionCancelButton: () => {
            dispatch(resetState());
          },
        })
      );
      setEstado(estadoAnteriorRef.current);
    }
  }, [isError, response.status]);

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
            const {id, status_name} = optionsState[index];
            return (
              <MenuItem value={status_name} key={id}>
                {status_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
