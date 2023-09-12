import * as yup from "yup";
const haveMaxTXT = (number) =>
  "Este campo tiene como maximo " + number + "caracteres";
const requiredTXT = "Este campo es obligatorio";
const mustBeStringTXT = "Este campo debe ser de texto";
const currentDate = new Date();

const validationSchema = yup.object({
  // Nro documento
  internalId: yup
    .number()
    .typeError("Los caracteres deben ser de tipo numéricos")
    .required(requiredTXT)
    .max(999999999999, haveMaxTXT(12))
    .positive("Debe ser un valor positivo"),
  // Nombre
  documentDescription: yup
    .string()
    // .typeError("Los caracteres deben ser de tipo numéricos")
    .required(requiredTXT)
    .max(250, haveMaxTXT(250)),
  // Categoria
  documentType: yup.string().required(),
  // Nivel de confidencialidad
  confidentiality: yup.string().required(),

  // Estado
  status: yup.string().required(),

  // Fecha
  createdAt: yup
    .date()
    .typeError("Seleccione una fecha valida")
    .required("La fecha es obligatoria")
    .max(currentDate, "La fecha no puede ser posterior a la fecha actual"),
});
const documentSchema = {
  validationSchema,
};

export default documentSchema;
