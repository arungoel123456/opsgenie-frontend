import React from "react";

export default function GetUsers(props) {
  let responderList = [];
  const [userList, changeUserList] = React.useState([]);
  const [responderLoading, changeResponderLoading] = React.useState(true);

  const responderSearchBoxValueChanged = async (value) => {
    changeResponderLoading(true);
    const response = await fetch(
      "http://localhost:3001/api/users/search/" + value
    );
    const responsejson = await response.json();
    changeUserList(responsejson.results);
    changeResponderLoading(false);
  };

  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}
