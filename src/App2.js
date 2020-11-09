import React from "react";
import { Router, Route } from "react-router-dom";
import Home2 from "./Home2";

export default function App2(props) {
  return (
    <div>
      <Router></Router>

      <div>
        <Route path="/" exact component={Home2} />
      </div>
    </div>
  );
}
