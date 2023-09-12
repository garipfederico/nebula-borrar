import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function useAlert( isError, messageType ) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isError && messageType ==='noResults') {
      console.log("isError ",isError )
      console.log("messageType ",messageType )
      // Mostrar la alerta si isError es true o si response está vacío
      setShowAlert(true);
    } else {
      console.log("isError ",isError )
      console.log("messageType ",messageType )
      // Ocultar la alerta si isError es false y response no está vacío
      setShowAlert(false);
    }
  }, [isError, messageType]);

  if (!showAlert) {
    return null; // No mostrar nada si no se debe mostrar la alerta
  }

  return (
    <Alert severity="warning">
      <AlertTitle>Sin resultados</AlertTitle>
      Tu búsqueda no arrojó ningún resultado. Por favor, intenta con otros términos de búsqueda.
    </Alert>
  );
}

export default useAlert;
