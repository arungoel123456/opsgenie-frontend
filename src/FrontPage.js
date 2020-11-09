import React from "react";
import Signup from "./Signup";

export default function FrontPage(props) {
  return (
    <div>
      <div>
        <h1>Welcome to Opsgenie</h1>
      </div>

      <div>
        <Signup history={props.history} />
      </div>
    </div>
  );
}
