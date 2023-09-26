import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthContextProvider } from "./contexts/auth-context";
import GlobalStyle from "./styles/globalStyle";
import { Provider } from "react-redux";
import { store } from "./store/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
);
