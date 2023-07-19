import axios from 'axios';

const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

const user = JSON.parse(localStorage.getItem('user'))
// console.log('axiosBaseURL: user',user)
// El siguiente if se agrega, ya que si no esta logueado e intenta asignar el token 
// se queda la pantalla en blanco ya que no puede asignarlo
if(user){
  axiosBase.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
}


export default axiosBase;