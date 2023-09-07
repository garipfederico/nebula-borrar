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
 
/**
 * Busca un valor por clave en un array de objetos y devuelve el valor correspondiente.
 *
 * @param {Array} array - El array de objetos en el que se realizará la búsqueda.
 * @param {string|number|null} key - La clave que se utilizará para buscar el valor.
 * @returns {string|null} El valor correspondiente a la clave o null si no se encuentra.
 * @throws {Error} Lanza un error si se produce una excepción durante la búsqueda.
 *
 * @example
 * // Ejemplo de uso:
 * const array = [
 *   { key: '1', value: 'Valor 1' },
 *   { key: '2', value: 'Valor 2' },
 *   { key: '3', value: 'Valor 3' },
 * ];
 *
 * const keyValue = findValueByKey(array, '2');
 * console.log(keyValue); // Devolverá 'Valor 2'
 */
  export function findValueByKey(array, key) {
    try{

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
    }catch(e){
      throw new Error({message:'La funcion findValueByKey esta arrojando un error'})
    }

    return null;
  }