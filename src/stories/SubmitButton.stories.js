import SubmitButton from "../reusable/buttons/SubmitButton";
// export default {
//     title: 'Example/SubmitButton',
//     component: SubmitButton,
//     parameters: {
//         formik: 'formik'
//     },
// }

export default {
  title: "Example/SubmitButton",
  component: SubmitButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: "color"},
    requestType: {
      control: {
        type: "select",
        options: ["POST", "PUT", "GET"],
      },
    },
  },
  args: {
    textForTypeRequest: ["Hi", "Ho", "Let's go"],
  },
};

export const Primary = {
  args: {
    requestType: "POST",
    isLoading: true,
    handleSubmit: () => {},
  },
};

export const GetButtonForSearch = {
  args: {
    requestType: "GET", // Establecer el valor por defecto a 'POST'
  },
};
