export const responseStrings = (status) => {
  return status === 403
    ? "No tiene permisos o no está autenticado"
    : status === 404
    ? "Recurso no encontrado"
    : status === 500
    ? "Error en el servidor"
    : "Estado de respuesta no reconocido";
};

export const weSorryMessage = "Lo sentimos ha ocurrido un error";
