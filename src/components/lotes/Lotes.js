import React, {useEffect} from "react";
import {useFormik} from "formik";
import {Stack} from "@mui/material";

// Reusables
import useError from "../../hooks/useError"
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
  const { results } = useSelector((state) => state.lotes.documents);
  const {isError, response } = useSelector((state) => state.lotes);
  const batch = results[0].batch;
  
  useEffect(() => {
    dispatch(getDocuments());
  }, []);

  useError(isError, response)

  const formik = useFormik({
    initialValues: {
      dateToSearch: "",
    },
    validationSchema: loteSchema.validationSchema,
    onSubmit: (dateToSearch) => {
      console.log(dateToSearch);
    },
  });

  return (
    <TitleCard
      title="Lote"
      subtitle={"Consulta del Lote nro.:" + batch}
      width="50%"
      sx={{index: 3}}
    >
      <Stack
        direction={{xs: "column", lg: "row"}}
        wrap="wrap"
        justifyContent={"center"}
        spacing={5}
      >
        {/* <SearchForm formik={formik} /> */}
        <TablaLotes />
      </Stack>
    </TitleCard>
  );
}

export default Lotes;
