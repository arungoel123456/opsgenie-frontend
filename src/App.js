import React from "react";
import "./App.css";
import PostloginNav from "./PostloginNav";
import PreloginNav from "./PreloginNav";
import { BrowserRouter as Router } from "react-router-dom";

function App(props) {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.jwt !== undefined) {
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="mainBox">
        {userLoggedIn ? <PostloginNav /> : <PreloginNav />}
      </div>
    </Router>
  );
}

export default App;
