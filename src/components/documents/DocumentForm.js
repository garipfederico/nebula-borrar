import React from "react";

// Reusables
import DialogForm from "../../reusable/dialogs/DialogForm";

// Components
import BodyDocumentForm from "./BodyDocumentForm";

// Redux
// Data

export default function DocumentForm() {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <DialogForm 
        navigateOnClose="/documents" 
        title="Edicion de documento"
        >
        <BodyDocumentForm />
      </DialogForm>
    </>
  );
}
