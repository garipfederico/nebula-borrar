import axios from "axios";

const axiosBaseObject = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


// axiosBaseObject.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const setAxiosToken = () => {
  const authJSON = localStorage.getItem("docu.auth");
  if (authJSON) {
    const auth = JSON.parse(authJSON);
    axiosBaseObject.defaults.headers.common["Authorization"] =
      "Bearer " + auth.access;
  } else {
    console.log("authJson is null??");
    console.log("authJSON ", authJSON);
  }
};

// TODO: Analizar si esta funcion puede ser eliminada, ya que en base a modificaciones
// podria ser obsoleta.
const axiosBaseFunc = () => {
  try {
    setAxiosToken();
  } catch (e) {
    console.log("Error en axios base", e);
    if (e === "TypeError: auth is null") {
      console.log("No se encontro el registro de autenticacion");
    }
  }
  return axiosBaseObject;
};

const axiosBase = axiosBaseFunc();

export default axiosBase;
