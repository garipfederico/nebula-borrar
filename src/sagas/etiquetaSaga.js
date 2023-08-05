import {call, put, takeEvery} from "redux-saga/effects";
import MockAdapter from "axios-mock-adapter";
// Redux States
import {
  postCrearLoteSuccess,
  postCrearLoteFail,
  postCrearLoteReset,
} from "../states/etiquetasState";
// Librerias propias
import axiosBase from "../utils/axiosBase";
import {ImagesToPdf} from "../utils/pdfUtilities";
// Data
import {mockLabelData, mockImagesLabelData} from "./mockLabelData";

// const firstURL = process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/";
const firstURL = process.env.REACT_APP_BASE_URL + "/api/label/";
let secondURL = ""; // Will be obtained from the first response.

// If in mock mode this function will execute the API interceptor calls and
// return a response with objects from the mockLabelData file.

function* requestManager(apiCallFunction, anUrl, anObject = null) {
  console.log("anUrl ",anUrl )
  let request = {}
  if (process.env.REACT_APP_ENVIRONMENT_TYPE === "mocked") {
    var mock = new MockAdapter(axiosBase);
    console.log("Executing in mocked mode");
    mock.onGet(firstURL, anObject).reply(200, {...mockLabelData});
    mock.onGet(secondURL).reply(200, {...mockImagesLabelData});
    request = yield call(apiCallFunction, anUrl, anObject)
    mock.restore()
  } else {
    console.log("Executing in dev mode");
    request = yield call(apiCallFunction, anUrl, anObject)
  }
return request;
}

function* workPostLabelsFetch(action) {
  const {expedientNumber, quantity} = action.payload;
  try {
    const body = {
      code: expedientNumber,
      number: quantity,
      bar_code_image: "string", // esto va aca? a que imagen corresponderia. TERRMINAR EN DEV MODE
      area: "1231", // Traer de usuario, corregir para que al usuario lo levante del storage
      user: 0, // idem
    };

    //First call to the API
    console.log("First call to the API");
    // interceptRequestIfMockedModeOn(null, body);
    const firstResponse = yield requestManager(axiosBase.get, firstURL, body)
    // const firstResponse = yield call(axiosBase.get, firstURL, body);
    console.log("firstResponse: ", firstResponse);
    // const newLabels = yield firstResponse;
    const newLabels = yield firstResponse.data;
    console.log("newLabels: ", newLabels);
    console.log("Bulk information successfully generated");
    // secondURL = yield newLabels.bar_code_image;  // Esta segun la Swagger
    secondURL = yield newLabels.imagen_etiquetas_url; // Esta segun la contrato
    console.log("SecondURL of first call", secondURL);

    // Second call to the API
    // interceptRequestIfMockedModeOn(secondURL);
    const secondResponse = yield requestManager(axiosBase.get, secondURL)
    console.log("Second call to the API");
    // const secondResponse = yield call(axiosBase.get, secondURL);
    console.log("SecondResponse ", secondResponse);
    const images = secondResponse.data;
    console.log("Labels Images successfully downloaded");
    yield put(postCrearLoteSuccess(images));

    // PDF generation
    console.log("Starting PDF generation");
    const pdf = yield call(ImagesToPdf, images);
    try {
      setTimeout(() => {
        pdf.autoPrint({variant: "non-conform"});
        pdf.save("etiquetas_0to" + quantity + ".pdf");
        const pdfURL = pdf.output("datauristring");
        console.log("PDF generated correctly");
        // yield put(postCrearLoteReset())
      }, 2000); // 3000 milisegundos = 3 segundos de retraso

      // pdf.autoPrint({variant: "non-conform"});
      // pdf.save("etiquetas_0to" + quantity + ".pdf");
      // const pdfURL = yield pdf.output("datauristring");
      // console.log("PDF generated correctly");
      // // yield put(postCrearLoteReset())
    } catch (error) {
      console.log(
        "An issue occurs creating the tab navigator with the pdf file",
        error
      );
    }
  } catch (error) {
    yield put(postCrearLoteFail(error));
  }
}

function* etiquetaSaga() {
  try {
    yield takeEvery("etiquetas/postCrearLote", workPostLabelsFetch);
  } finally {
    // mock.restore();
  }
}

export default etiquetaSaga;
