import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Alert from "./Alert";

export default function PostloginNav() {
  return (
    <div>
      <Router>
        <NavLink to="/alert">Alert</NavLink>
        <button
          onClick={() => {
            localStorage.removeItem("jwt");
            window.location.reload(true);
          }}
        >
          {" "}
          Sign Out{" "}
        </button>

        <div>
          <Switch>
            <Route path="/" exact component={Alert} />
            <Route path="/alert" component={Alert} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
