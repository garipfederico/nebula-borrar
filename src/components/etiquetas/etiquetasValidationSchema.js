import * as yup from "yup";
const tieneComoMaxTXT = (number) =>
  "Este campo tiene como maximo " + number + "caracteres";
const obligatorioTXT = "Este campo es obligatorio";
const debeSerStringTXT = "Este campo debe ser de texto";

const validationSchema = yup.object({
  numeroDeExpediente: yup
    .number()
    .typeError('Los caracteres deben ser de tipo numéricos')
    .required(obligatorioTXT)
    .max(999999999999, tieneComoMaxTXT(12))
    .positive("Debe ser un valor positivo"),
    cantidad: yup
    .number()
    .typeError('Los caracteres deben ser de tipo numéricos')
    .required(obligatorioTXT)
    .max(99999, tieneComoMaxTXT(5))
    .positive("Debe ser un valor positivo"),
});
const etiquetasSchema = {
  validationSchema,
};

export default etiquetasSchema;
