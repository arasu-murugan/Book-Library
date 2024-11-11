import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
