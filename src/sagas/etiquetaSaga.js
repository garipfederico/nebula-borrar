import {call, put, takeEvery} from "redux-saga/effects";
import {
  postCrearLoteSuccess,
  postCrearLoteFail,
} from "../states/etiquetasState";
import axios from "axios";
import axiosBase from "../utils/axiosBase";
import MockAdapter from "axios-mock-adapter";

import {jsPDF} from "jspdf";

import {mockLabelData} from "./mockLabelData";
import {mockImagesLabelData} from "./mockLabelData";

const ImagesToPdf = (imagenes) => {
  const handleGeneratePDF = () => {
    try {
      const width = 4;
      const height = 2;
      const margin = 0.1;
      var pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [width, height],
      });

      Object.values(imagenes).forEach((image, index) => {
        if (index !== 0) {
          pdf.addPage(); // Agrega una nueva página para cada imagen excepto la primera
        }
        pdf.addImage(
          image,
          "PNG",
          margin,
          margin,
          width - 2 * margin,
          height - 2 * margin
        );
      });
    } catch (e) {
      console.log(e);
    }

    return pdf;
  };
  return handleGeneratePDF();
};
function* workPostLabelsFetch(action) {
  var mock = new MockAdapter(axios);
  const {numeroDeExpediente, cantidad} = action.payload;
  try {
    const body = {
      code: numeroDeExpediente,
      number: cantidad,
      bar_code_image: "string", // esto va aca? a que imagen corresponderia
      area: 0, // Traer de usuario, corregir para que al usuario lo levante del storage
      user: 0, // idem
    };
    const firstUrl = process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/";
    mock.onPost(firstUrl, body).reply(200, {...mockLabelData});
    mock
      .onGet("BASEURL?etiquetas_id=1,2,3,4,5")
      .reply(200, {...mockImagesLabelData});

    //First call
    const firstResponse = yield call(
      axios.post,
      process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/",
      body
    );
    const newLabels = firstResponse.data;
    console.log("Bulk information successfully generated");
    const labelsURL = newLabels.imagen_etiquetas_url;

    // Second call
    const secondResponse = yield call(axios.get, labelsURL);
    const imagenes = secondResponse.data;
    console.log("Labels Images successfully downloaded");
    yield put(postCrearLoteSuccess(imagenes));

    // PDF generation
    const pdf = yield call(ImagesToPdf, imagenes);
    try {
      pdf.autoPrint({variant: "non-conform"});
      pdf.save("etiquetas_0to" + cantidad + ".pdf");
      const pdfURL = yield pdf.output("datauristring");
      console.log("Pdf generado correctamente");
    } catch (error2) {
      console.log("Problemas en la generacion de archivo pdf", error2);
    }
  } catch (error) {
    yield put(postCrearLoteFail(error));
  }
}

function* etiquetaSaga() {
  yield takeEvery("etiquetas/postCrearLote", workPostLabelsFetch);
}

export default etiquetaSaga;
