import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

try {
  const auth = JSON.parse(localStorage.getItem("docu.auth"));
  console.info("auth.access ", auth.access);
  if (auth) {
    axiosBase.defaults.headers.common["Authorization"] =
      "Bearer " + auth.access;
  }
} catch (e) {
  console.log('Error en axios base',e);
  if(e === "TypeError: auth is null"){
    console.log('No se encontro el registro de autenticacion')
  }
  // no encontro el archivo en 
}
// El siguiente if se agrega, ya que si no esta logueado e intenta asignar el token
// se queda la pantalla en blanco ya que no puede asignarlo

export default axiosBase;
