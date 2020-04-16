//Entry point for client JS
// import "../public/style.css";

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./Components/Routes";

ReactDom.render(
  <Provider store={store}>
    <Routes />
  </Provider>,

  document.getElementById("app")
  //renders the rest of the app
);
