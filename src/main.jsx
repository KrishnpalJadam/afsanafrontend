import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Home from "./authtication/Home.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <Home /> */}
    <App />
  </BrowserRouter>
);
