import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextInput from "../../reusable/textInput/TextInput";
import SubmitButton from "../../reusable/buttons/SubmitButton";
import {Button, Stack} from "@mui/material";

function CustomTabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({formik, editing, isLoading}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const nth1StackStyle = {
    direction: "column",
    width:"30%",
    alignItems:"center",
    sx:{marginX: "auto", my:4},
    spacing:5
  }

  return (
    <Box sx={{width: "100%"}}>
      <Box sx={{borderBottom: 1, borderColor: "divider"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Crear Lote" {...a11yProps(0)} />
          <Tab label="Imprimir Lote" {...a11yProps(1)} />
          <Tab label="Imprimir Etiqueta" {...a11yProps(2)} />
          <Tab label="Imprimir Paso" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Stack
        {...nth1StackStyle}
          // direction="column"
          // width="30%"
          // alignItems="center"
          // sx={{marginX: "auto", my:4}}
          // spacing={5}
        >
          <TextInput
            nombreVariable="cajaId"
            text={formik.values.cajaId}
            variant="h6"
            editing={true}
            isLoading={isLoading}
            formik={formik}
            type='number'
          />
          <TextInput
            nombreVariable="cantidad"
            text={formik.values.cantidad}
            variant="h6"
            editing={editing}
            isLoading={isLoading}
            formik={formik}
          />
          <SubmitButton
            requestType="POST" // suele podria se useSelector de redux o un useState
            isLoading={false} // suele podria se useSelector de redux o un useState
            postOrPutTexts={["Crear e Imprimir", ""]}
            handleSubmit={() => formik.handleSubmit()}
          />
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Aca componente 2
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Aca componente 3
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Aca componente 4
      </CustomTabPanel>
    </Box>
  );
}
