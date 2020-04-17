import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import dummyComponent from "./dummyComponent";
import animeComponent from "./animeComponent";
import Moving from "./Moving";

const Routes = () => {
  return (
    <Router>
      <nav id="navBar">
        <NavLink to="/">Home|| </NavLink>
        <NavLink to="/dummyComponent">Component|| </NavLink>
        <NavLink to="/animeComponent">Animation|| </NavLink>
        <NavLink to="/Moving">Moving</NavLink>
      </nav>

      <Switch>
        <Route exact path="/Moving" component={Moving} />
        <Route exact path="/animeComponent" component={animeComponent} />
        <Route exact path="/dummyComponent" component={dummyComponent} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div id="mainpage">
                <img id="Moogle" src="Moogle-v1.png" />
                <div className="mainContent">
                  <h2>KUPO!</h2>
                  <div>Hello ku, the World is expanding everyday kupo!</div>
                  <p>But in the meantime, this site is construction kupo!...</p>
                </div>
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
