import React, {useEffect} from "react";
import TitleCard from "../../reusable/card/TitleCard";
import TablaLotes from "./TablaLotes";
import {useFormik} from "formik";
import loteSchema from "./loteValidationSchema";
import SearchForm from "./SearchForm";
import {Box, Stack} from "@mui/material";

function Lotes() {
  const formik = useFormik({
    initialValues: {
      dateToSearch: "",
    },
    validationSchema: loteSchema.validationSchema,
    onSubmit: (dateToSearch) => {
      console.log("Hola submit");
      console.log(dateToSearch);
    },
  });

  return (
    <TitleCard
      title="Lotes"
      subtitle="Un subtitulo"
      width="80%"
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
