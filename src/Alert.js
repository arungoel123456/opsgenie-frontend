import React from "react";

export default function Alert(props) {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.jwt !== undefined) {
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <div>
      {!userLoggedIn ? (
        <div>
          {" "}
          <h1> Please Login First </h1>
        </div>
      ) : (
        <div>
          {" "}
          <h1> Alerts </h1>
          <button>Add Alert </button>
        </div>
      )}
    </div>
  );
}
