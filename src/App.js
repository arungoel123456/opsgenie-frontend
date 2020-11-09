import React from "react";
import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   NavLink,
//   Switch,
// } from "react-router-dom";
// import Home from "./Home";
// import Signup from "./Signup";
// import Alert from "./Alert";
import PostloginNav from "./PostloginNav";
import PreloginNav from "./PreloginNav";

function App() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.jwt !== undefined) {
      setUserLoggedIn(true);
    }
  }, []);

  return <div>{userLoggedIn ? <PostloginNav /> : <PreloginNav />}</div>;
}

export default App;
