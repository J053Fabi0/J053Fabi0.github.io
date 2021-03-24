import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/scss/bootstrap.scss";
import Routes from "./views/Routes";
import Navbar from "./components/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
