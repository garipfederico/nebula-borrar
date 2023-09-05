/**
 * Transforma un array de objetos en un nuevo array de objetos con propiedades "key" y "value".
 *
 * @param {Array} arr - El array de objetos original.
 * @param {string} keyName - El nombre de la propiedad que se utilizará como "key" en el nuevo objeto.
 * @param {string} valueName - El nombre de la propiedad que se utilizará como "value" en el nuevo objeto.
 * @returns {Array} Un nuevo array de objetos con propiedades "key" y "value".
 *
 * @example
 * // Ejemplo de uso:
 * const arrayDeObjetos = [
 *   { nombre: 'Juan', edad: 30 },
 *   { nombre: 'María', edad: 25 },
 *   { nombre: 'Carlos', edad: 35 }
 * ];
 *
 * const nuevoArray = transformArray(arrayDeObjetos, 'nombre', 'edad');
 *
 * // El resultado será un nuevo array de objetos con propiedades "key" y "value".
 * // [
 * //   { key: 'Juan', value: 30 },
 * //   { key: 'María', value: 25 },
 * //   { key: 'Carlos', value: 35 }
 * // ]
 */
export function transformArray(arr, keyName, valueName) {
  arr = arr || [{[keyName]: '', [valueName]:''}]
    return arr.map(item => {
      return {
        key: item[keyName],
        value: item[valueName]
      };
    });
  }
  
  
  export function findValueByKey(array, key) {
    console.log("key ",key )
    console.log("array ",array )
    array = array || [{key:'', value:''}];
    key = key || null
    for (let i = 0; i < array.length; i++) {
      console.log(parseInt(array[i].key))
      console.log(key)
      console.log(parseInt(array[i].key) === key)
      if (parseInt(array[i].key) === key) {
        return array[i].value.toString(); // Asegura que siempre se devuelve un valor como cadena.
      }
    }
    return null;
  }