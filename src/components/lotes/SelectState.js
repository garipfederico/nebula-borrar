import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useDispatch, useSelector} from "react-redux";
import {patchState, resetState} from "../../states/lotesState";
import {openAlertDialog} from "../../states/reusable/AlertDialogSlice";
import {responseStrings, loSentimos} from "../../utils/responseStrings";
export default function SelectState({selectedValue}) {
  const dispatch = useDispatch();
  const [estado, setEstado] = React.useState(selectedValue);
  const {optionsState, isError, response} = useSelector((state) => state.lotes);
  const estadoAnteriorRef = React.useRef(selectedValue);

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log("estado ", estado);
    console.log("estadoAnteriorRef.current ",estadoAnteriorRef.current )
    setEstado(event.target.value);
    dispatch(patchState(event.target.value));
   
  };
  
  React.useEffect(() => {
    if (isError) {
      dispatch(
        openAlertDialog({
          icon: "error",
          title: loSentimos,
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

  const arrayIterator = Object.keys(optionsState);

  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cambiar estado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={estado}
          label="Estado"
          onChange={handleChange}
        >
          {arrayIterator.map((unaKey, index) => {
            return (
              <MenuItem value={unaKey} key={index}>
                {optionsState[unaKey]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
