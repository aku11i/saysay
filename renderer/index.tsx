import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./global.css";
import { App } from "./App";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
