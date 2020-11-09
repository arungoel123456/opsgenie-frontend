import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Home";

export default function PreloginNav() {
  return (
    <div>
      <Router>
        <NavLink to="/">Home</NavLink>

        <div>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
