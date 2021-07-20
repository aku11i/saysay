import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import "./global.css";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
