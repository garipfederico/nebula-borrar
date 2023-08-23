import Table from "../reusable/table/Table";
export default {
  title: "Example/Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
//     handleSubmit: {
//       type: { name: 'function', required: true }, // Indica que se espera una función
//       description: 'Función que gestiona el metodo deseado. Suele ser formik.handlesubmit',
//     },
//     requestType: {
//       control: {
//         type: "select",
//         options: ["POST", "PUT", "GET"],
//       },
//       description: 'Tipo de solicitud que disparará el boton'
//     },
//     textForRequestType:{
//       description: 'Texto del boton correspondiente al metodo elegido. Se corresponde con RequestType.'
//     }
  },
  args: {
    columnsDefinition : [
        {id: "created_at", label: "Fecha", minWidth: 100},
        {id: "internal_id", label: "Numero", minWidth: 100},
        {id: "document_description", label: "Nombre de documento", minWidth: 20},
      ],
    columnKeyName : "internal_id",
    dataTable : [
        {created_at : '04/04/2023', internal_id : "0001", document_description: "Documento de prueba 1" },
        {created_at : '14/05/2023', internal_id : "0002", document_description: "Documento de prueba 2" },
        {created_at : '15/06/2023', internal_id : "0003", document_description: "Documento de prueba 3" },
    ],
    isError: false,
    count: 10,
    response:{},
    reduxStateGetter:{}
    // requestType: "GET",
    // textForRequestType: ["Buscar", "Crear", "Guardar"],
    // handleSubmit: ()=>{'Una funcion'},
  },
};

export const Primary = {
  args: {
    // requestType: "POST",
    isLoading: true,
    // handleSubmit: ()=>'Una',
  },
};