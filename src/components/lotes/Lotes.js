import React, { useEffect } from "react";
import TitleCard from "../../reusable/card/TitleCard";
import TablaLotes from "./TablaLotes";
import {useFormik} from "formik";
import loteSchema from "./loteValidationSchema";
import SearchForm from "./SearchForm";
import {Stack} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


function Lotes() {
  // const dispatch = useDispatch()
  const {results} = useSelector(state=>state.lotes.documents)
const batch = results[0].batch 
  console.log("results2 ",results[0].batch )  
// useEffect(())

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
      subtitle={ "Consulta del Lote nro.:" + batch } 
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
