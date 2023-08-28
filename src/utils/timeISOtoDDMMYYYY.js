export function convertirFormatoFecha(fechaOriginal) {
    const date = new Date(fechaOriginal);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    return formattedDate;
}

// Llamar a la función con una fecha original

// const fechaOriginal = "2023-08-18T14:49:43.873935Z";
// const fechaFormateada = convertirFormatoFecha(fechaOriginal);

// console.log(fechaFormateada); // Salida: "18/08/2023"

export function convertDateFieldObjectsArray(objectsArray, dateField) {
    const newArray = objectsArray.map(object => {
        const originalDate = object[dateField];
        const date = new Date(originalDate);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        
        return {
            ...object,
            [dateField]: formattedDate
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
