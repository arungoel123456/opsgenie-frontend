import React from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Alert from "./Alert";
import AlertShow from "./AlertShow";
import Incident from "./Incident";
import IncidentShow from "./IncidentShow";
import "./PostloginNav.css";
import Button from "@atlaskit/button";
import { createBrowserHistory as history } from "history";

export default function PostloginNav(props) {
  console.log("post Login nav");
  return (
    <div>
      {/* <Router> */}
      <div className="header" style={{ height: "50px" }}>
        <NavLink
          to="/alert"
          appearance="link"
          style={{ "margin-left": "10%", color: "blue" }}
        >
          Alert
        </NavLink>

        <NavLink to="/incident" style={{ "margin-left": "4%", color: "blue" }}>
          Incident
        </NavLink>

        <Button
          appearance="subtle"
          style={{ "margin-left": "67%" }}
          onClick={() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            // props.history.pop();
            // window.location.reload(true);
            // history.push("/");
            window.location.href = "/";
          }}
        >
          {" "}
          Sign Out{" "}
        </Button>
      </div>

      <div>
        <Switch>
          <Route path="/" exact component={Alert} />
          <Route path="/alert" component={Alert} />
          {/* <Route path="/alertShow/:id" component={AlertShow} /> */}
          <Route path="/incident" component={Incident} />
          <Route path="/incidentShow/:id" component={IncidentShow} />
        </Switch>
      </div>
      {/* </Router> */}
    </div>
  );
}
