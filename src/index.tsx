import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthContextProvider } from "./contexts/auth-context";
import GlobalStyle from "./styles/globalStyle";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <GlobalStyle />
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>
);
