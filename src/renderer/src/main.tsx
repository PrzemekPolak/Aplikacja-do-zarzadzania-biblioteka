import ReactDOM from "react-dom/client";
import "./index.css";
import { Store } from "./store/Store";
import { Router } from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Store>
    <Router />
  </Store>
);