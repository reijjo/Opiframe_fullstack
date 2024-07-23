import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import contactReducer, { AppState } from "./reducers/contactReducer.tsx";
import { AnyAction, Store, createStore } from "redux";
import { Provider } from "react-redux";

const store: Store<AppState, AnyAction> = createStore(contactReducer);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
