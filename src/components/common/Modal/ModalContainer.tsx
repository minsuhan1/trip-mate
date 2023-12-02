import React from "react";
import { createPortal } from "react-dom";

function ModalContainer({ children }: { children: React.ReactNode }) {
  return createPortal(<>{children}</>, document.getElementById("modal")!);
}

export default ModalContainer;
