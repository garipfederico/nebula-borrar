import axios from 'axios';

const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

const auth = JSON.parse(localStorage.getItem('docu.auth'))
// console.info("auth.access ",auth.access )
// console.log('axiosBaseURL: user',user)
// El siguiente if se agrega, ya que si no esta logueado e intenta asignar el token 
// se queda la pantalla en blanco ya que no puede asignarlo
if(auth){
  axiosBase.defaults.headers.common['Authorization'] = 'Bearer ' + auth.access;
}


export default axiosBase;