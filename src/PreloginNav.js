import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from "./App";
import FrontPage from "./FrontPage";
import Login from "./Login";

export default function PreloginNav() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    console.log("useEffect");
    if (localStorage.jwt !== undefined) {
      setUserLoggedIn(true);
    }
  });
  return (
    <div>
      {/* <Router> */}
      <NavLink to="/">Home</NavLink>

      <div>
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
      {/* </Router> */}
    </div>
  );
}
