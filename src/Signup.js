import React from "react";

export default function Signup(props) {
  const [number, setNumber] = React.useState("");
  console.log(props);
  function signup(event) {
    event.preventDefault();
    console.log(event.target.firstName.value);
    let user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      number: event.target.number.value,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(user),
    };
    fetch("http://localhost:3001/api/users/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.success === 1) {
          localStorage.setItem("jwt", response.token);
          localStorage.setItem("user", response.data.insertId);
          // window.location.reload(true);
          window.location.href = "/alert";
        }
      });
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={signup}>
        <div>
          <label htmlFor="firstName"> First Name </label>
          <input id="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName"> Last Name </label>
          <input id="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email"> Email </label>
          <input id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"> Password </label>
          <input id="password" type="password" />
        </div>

        <div>
          <label htmlFor="number"> Number </label>
          <input
            id="number"
            value={number}
            onChange={(event) =>
              setNumber(event.target.value.replace(/\D/, ""))
            }
          />
        </div>
        <button type="submit">SIGN UP</button>
      </form>
      <button
        onClick={() => {
          console.log(props);
          props.history.push("/login");
        }}
      >
        Login
      </button>
    </div>
  );
}
