export function convertirFormatoFecha(fechaOriginal) {
    const fecha = new Date(fechaOriginal);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1;
    const anio = fecha.getUTCFullYear();
    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;
    return fechaFormateada;
}

// Llamar a la función con una fecha original

// const fechaOriginal = "2023-08-18T14:49:43.873935Z";
// const fechaFormateada = convertirFormatoFecha(fechaOriginal);

// console.log(fechaFormateada); // Salida: "18/08/2023"

export function convertDateFieldObjectsArray(objectsArray, dateField) {
    const newArray = objectsArray.map(objeto => {
        const fechaOriginal = objeto[dateField];
        const fecha = new Date(fechaOriginal);
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth() + 1;
        const anio = fecha.getUTCFullYear();
        const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;
        
        return {
            ...objeto,
            [dateField]: fechaFormateada
        };
    });

    return newArray;
}

// // Ejemplo de array de objetos con fechas en el formato original
// const arrayDeObjetos = [
//     { id: 1, fecha: "2023-08-18T14:49:43.873935Z" },
//     { id: 2, fecha: "2023-07-10T09:30:00.000000Z" },
//     // ...
// ];

// // Llamar a la función para convertir las fechas
// const nuevoArray = convertirFormatoFechas(arrayDeObjetos, "fecha");

// console.log(nuevoArray);
