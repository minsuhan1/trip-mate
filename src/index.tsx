import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthContextProvider } from "./contexts/auth-context";
import GlobalStyle from "./styles/globalStyle";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

// redux-persist persistor
export const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PersistGate>
  </Provider>
);
