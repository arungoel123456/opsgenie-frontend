import React from "react";
import Signup from "./Signup";
import "./FrontPage.css";
import logo from "./opsgenie-thumb.png";

export default function FrontPage(props) {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.jwt !== undefined) {
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <div className="welcomePage">
      <div className="welcomeLogo">
        <div>
          <h1>Welcome to Opsgenie</h1>
          <img
            src={logo}
            style={{ "margin-left": "200px", "margin-top": "76px" }}
          />
        </div>
      </div>

      <div className="getIn">
        <Signup history={props.history} />
      </div>
    </div>
  );
}
