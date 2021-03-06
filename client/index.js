//Entry point for client JS
// import "../public/style.css";

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
  <Provider store={store}>
    <div>Hello, the World is expanding everyday!</div>
  </Provider>,
  document.getElementById("app")
  //renders the rest of the app
);
