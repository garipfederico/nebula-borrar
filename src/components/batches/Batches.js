import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {Stack} from "@mui/material";

// Reusables
import useError from "../../hooks/useError";
import TitleCard from "../../reusable/card/TitleCard";
import SearchForm from "./SearchForm";

// Components
import BatchesTable from "./BatchesTable";

// Redux
import {useDispatch, useSelector} from "react-redux";
import {getDocuments, resetState} from "../../states/batchesState";

// Data
import batchesSchema from "./batchesValidationSchema";

function Batches() {
  const dispatch = useDispatch();
  const {results} = useSelector((state) => state.batches.documents);
  const {isError, response} = useSelector((state) => state.batches);
  const [rowsPerPage, setRowsPerPage] = useState(() => 10);
  const batch = results[0].batch;

  useEffect(() => {
    dispatch(getDocuments({page: 0, rowsPerPage}));
  }, []);

  useError(isError, response);

  const formik = useFormik({
    initialValues: {
      dateToSearch: "",
    },
    validationSchema: batchesSchema.validationSchema,
    onSubmit: (dateToSearch) => {},
  });

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, []);

  return (
    <TitleCard
      title="Lote"
      subtitle={"Consulta del Lote nro.:" + batch}
      width="80%"
    >
      <Stack direction="column" spacing={2} width="90%" sx={{mb: 5}}>
        {/* <SearchForm formik={formik} /> */}
        <BatchesTable
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Stack>
    </TitleCard>
  );
}

export default Batches;
