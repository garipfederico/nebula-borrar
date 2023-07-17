import { call, put, takeEvery } from 'redux-saga/effects'  
import { postCrearLote } from '../states/etiquetasState'

function* workGetEtiquetasFetch(){
    // yield aca lo usamos como un await
    const cats = yield call(() => fetch('https://api.thecatapi.com/v1/breeds'));
    const formattedCats = yield cats.json();
    const formattedCatsShortened = formattedCats.slice(0,10);

    // Sí, put en Redux Saga es similar a dispatch en Redux. 
// Ambos se utilizan para despachar acciones y actualizar el estado de la aplicación.
    // yield put(postCrearLote(formattedCatsShortened));
}
// 4.1>

// Aca empezaria la explicacion de todo
function* etiquetaSaga(){
    // cats es el nombre del createSlice.name
    // getCatsFetch es el nombre del reducer
    yield takeEvery('etiquetas/postCrearLote', workGetEtiquetasFetch);

}



export default etiquetaSaga