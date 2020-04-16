import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import dummyComponent from "./dummyComponent";

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <NavLink to="/">Home||</NavLink>
          <NavLink to="/dummyComponent">dummyComponent</NavLink>
        </nav>
      </div>
      <Switch>
        <Route exact path="/dummyComponent" component={dummyComponent} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div id="mainpage">
                <h2>This is a header!</h2>
                <div>Hello, the World is expanding everyday!</div>
                <p>One day there was a moogle that...</p>
              </div>
            );
          }}
        />
        <Route>
          <h2>Oh no! Page not found!</h2>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
