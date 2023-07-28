import {call, put, takeEvery} from "redux-saga/effects";
import {
  postCrearLoteSuccess,
  postCrearLoteFail,
} from "../states/etiquetasState";
import axios from "axios";
import axiosBase from "../utils/axiosBase";
import MockAdapter from "axios-mock-adapter";
import {jsPDF} from "jspdf";
import {mockLabelData, mockImagesLabelData} from "./mockLabelData";

const firstURL = process.env.REACT_APP_BASE_URL + "/api/label/create-bulk/";
let secondURL = ""; // Will be obtained from the first response.

// If in mock mode this function will execute the API interceptor calls and
// return a response with objects from the mockLabelData file.
const catchRequestIfMockedModeOn = (secondUrl, body) => {
  if (process.env.REACT_APP_ENVIRONMENT_TYPE === "mocked") {
    console.log("Executing in mocked mode");
    var mock = new MockAdapter(axios);
    if (!secondURL) {
      mock.onPost(firstURL, body).reply(200, {...mockLabelData});
    } else {
      mock.onGet(secondURL).reply(200, {...mockImagesLabelData});
    }
  } else {
    console.log("Executing in dev mode");
  }
  return;
};
// Generate a pdf with the labels from an array of images
const ImagesToPdf = (images) => {
  const handleGeneratePDF = () => {
    try {
      const width = 4; // Width of the page (see unit below)
      const height = 2; // Height of the page
      const margin = 0.1; // Margin from border page to the image
      var pdf = new jsPDF({
        orientation: "landscape",
        unit: "in",
        format: [width, height],
      });

      Object.values(images).forEach((image, index) => {
        if (index !== 0) {
          // Add a new page for each image, except the first
          // that is already created
          pdf.addPage(); 
        }
        // Add an image in the created page with format
        pdf.addImage(
          image,
          "PNG",
          margin, // This is a coordinate x
          margin, // This is a coordinate y
          width - 2 * margin, // This will reduce the image width size to fit in 
          height - 2 * margin  // This will reduce the image height size to fit in
        );
      });
    } catch (e) {
      console.log('An error occurs when ',e);
    }
    return pdf;
  };
  return handleGeneratePDF();
};

function* workPostLabelsFetch(action) {
  const { ExpedientNumber, quantity} = action.payload;
  try {
    const body = {
      code: ExpedientNumber,
      number: quantity,
      bar_code_image: "string", // esto va aca? a que imagen corresponderia
      area: 0, // Traer de usuario, corregir para que al usuario lo levante del storage
      user: 0, // idem
    };

    //First call to the API
    catchRequestIfMockedModeOn(null, body);
    const firstResponse = yield call(axios.post, firstURL, body);
    console.log("firstResponse ", firstResponse);
    const newLabels = yield firstResponse.data;
    console.log("Bulk information successfully generated");
    secondURL = yield newLabels.imagen_etiquetas_url;
    console.log("secondURL of first call", secondURL);
    catchRequestIfMockedModeOn(secondURL);

    // Second call to the API
    const secondResponse = yield call(axios.get, secondURL);
    const images = secondResponse.data;
    console.log("Labels Images successfully downloaded");
    yield put(postCrearLoteSuccess(images));

    // PDF generation
    const pdf = yield call(ImagesToPdf, images);
    try {
      pdf.autoPrint({variant: "non-conform"});
      pdf.save("etiquetas_0to" + cantidad + ".pdf");
      const pdfURL = yield pdf.output("datauristring");
      console.log("Pdf generated correctly");
    } catch (error2) {
      console.log("An issue occurs when generating the pdf file", error2);
    }
  } catch (error) {
    yield put(postCrearLoteFail(error));
  }
}

function* etiquetaSaga() {
  yield takeEvery("etiquetas/postCrearLote", workPostLabelsFetch);
}

export default etiquetaSaga;
