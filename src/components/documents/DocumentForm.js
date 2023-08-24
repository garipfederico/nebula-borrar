import React from "react";

// Reusables
import DialogForm from "../../reusable/dialogs/DialogForm";

// Components
import BodyDocumentForm from "./BodyDocumentForm";

// Redux
// Data

export default function DocumentForm() {
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
