import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/auth-context";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <GlobalStyle />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
