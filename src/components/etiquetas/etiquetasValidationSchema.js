import * as yup from "yup";
const tieneComoMaxTXT = (number) =>
  "Este campo tiene como maximo " + number + "caracteres";
const obligatorioTXT = "Este campo es obligatorio";
const debeSerStringTXT = "Este campo debe ser de texto";

const validationSchema = yup.object({
    cajaId: yup.number().required(obligatorioTXT).max(12, tieneComoMaxTXT(2)).positive("Debe ser un valor positivo"),
  cantidad: yup.number().required(obligatorioTXT).max(5, tieneComoMaxTXT(5)).positive("Debe ser un valor positivo"),
  })
const etiquetasSchema = {
  validationSchema,
};

export default etiquetasSchema;
