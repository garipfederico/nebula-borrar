import {call, put, takeEvery} from "redux-saga/effects";
import {
  postCrearLoteSuccess,
  postCrearLoteFail,
} from "../states/etiquetasState";
import axiosBase from "../utils/axiosBase";

function* workPostLabelsFetch() {
  console.log('hola mundo')
  try {
    const body = {
      code: "string",
      number: 0,
      bar_code_image: "string",
      area: 0,
      user: 0,
    };
    const newLabels = yield call(axiosBase.post, body);
    yield put(postCrearLoteSuccess({newLabels}));
  } catch (e) {
    yield put(postCrearLoteFail());
  }
  // const newLabels = yield call(() => axiosBase.post(body))

  // yield aca lo usamos como un await
  // const cats = yield call(() => fetch('https://api.thecatapi.com/v1/breeds'));
  // const formattedCats = yield cats.json();
  // const formattedCatsShortened = formattedCats.slice(0,10);

  // Sí, put en Redux Saga es similar a dispatch en Redux.
  // Ambos se utilizan para despachar acciones y actualizar el estado de la aplicación.
  // yield put(postCrearLote(formattedCatsShortened));
}
// 4.1>

// Aca empezaria la explicacion de todo
function* etiquetaSaga() {
  // cats es el nombre del createSlice.name
  // getCatsFetch es el nombre del reducer
  yield takeEvery("etiquetas/postCrearLote", workPostLabelsFetch);
}

export default etiquetaSaga;
