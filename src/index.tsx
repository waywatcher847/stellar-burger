import React from "react";
import "./index.css";
import App from "./components/App/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./services/store";
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
