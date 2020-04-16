//Entry point for client JS
// import "../public/style.css";

import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
  <Provider store={store}>
    <h2>This is a header!</h2>
    <div>Hello, the World is expanding everyday!</div>
    <p>One day there was a moogle that...</p>
  </Provider>,
  document.getElementById("app")
  //renders the rest of the app
);
