import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/auth-context";
import GlobalStyle from "./styles/globalStyle";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { LoadingContextProvider } from "./contexts/loading-context";

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
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </AuthContextProvider>
    </PersistGate>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();
