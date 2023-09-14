import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {Stack} from "@mui/material";

// Reusables
import useError from "../../hooks/useError";
import TitleCard from "../../reusable/card/TitleCard";
import SearchForm from "./SearchForm";

// Components
import TablaLotes from "./TablaLotes";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {getDocuments} from "../../states/lotesState";

// Data
import loteSchema from "./loteValidationSchema";

function Lotes() {
  const dispatch = useDispatch();
  const {results} = useSelector((state) => state.lotes.documents);
  const {isError, response} = useSelector((state) => state.lotes);
  const [rowsPerPage, setRowsPerPage] = useState(() => 10);
  const batch = results[0].batch;

  useEffect(() => {
    dispatch(getDocuments({page:0, rowsPerPage}));
  }, []);

  useError(isError, response);

  const formik = useFormik({
    initialValues: {
      dateToSearch: "",
    },
    validationSchema: loteSchema.validationSchema,
    onSubmit: (dateToSearch) => {},
  });

  return (
    <TitleCard
      title="Lote"
      subtitle={"Consulta del Lote nro.:" + batch}
      width="80%"
    >
      <Stack direction="column" spacing={2} width="90%" sx={{mb: 5}}>
        {/* <SearchForm formik={formik} /> */}
        <TablaLotes 
          rowsPerPage = {rowsPerPage}
          setRowsPerPage = {setRowsPerPage}
        />
      </Stack>
    </TitleCard>
  );
}

export default Lotes;
