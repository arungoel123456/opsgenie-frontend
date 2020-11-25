import React from "react";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  function login(event) {
    event.preventDefault();
    let user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(user),
    };

    fetch("http://localhost:3001/api/users/login", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.success === 1) {
          localStorage.setItem("jwt", response.token);
          localStorage.setItem("user", response.user.id);
          console.log(response);
          // props.history.push("/");
          window.location.href = "/alert";
        }
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <div>
          <label htmlFor="email"> Email </label>
          <input id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"> Password </label>
          <input id="password" type="password" />
        </div>

        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => {
          props.history.push("/");
          // <Redirect to exact path="/" />;
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
