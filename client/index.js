//Entry point for client JS
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
  <Provider store={store}>
    <div>Hello, the World is expanding</div>
  </Provider>,
  document.getElementById("app")
  //renders the rest of the app
);
