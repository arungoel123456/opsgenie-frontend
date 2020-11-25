import React from "react";

export default function AlertShow(props) {
  const [loading, setLoading] = React.useState(true);
  const [details, setDetails] = React.useState("");
  const [isUserAdmin, changeUser] = React.useState(false);
  const [priorityValue, changePriorityValue] = React.useState(2);
  const [pValue, changePValue] = React.useState(false);
  const [tValue, changeTValue] = React.useState(false);
  const [dValue, changeDValue] = React.useState(false);

  console.log("Alert Show");

  const getDetails = async () => {
    const response = await fetch(
      "http://localhost:3001/api/alerts/detail/" + props.match.params.id
    );
    const responsejson = await response.json();
    setDetails(responsejson.data[0]);

    if (responsejson.data[0].admin_id == localStorage.getItem("user")) {
      changeUser(true);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    getDetails();
    console.log("details: ", details);
    changeUser();
    setLoading(false);
  }, []);

  function submitChangePriority(event) {
    setDetails(
      { ...details },
      (details.priority_id = event.target.priority.value)
    );
    update();
  }

  function submitChangeTitle(event) {
    setDetails({ ...details }, (details.title = event.target.title.value));
    update();
  }

  function submitChangeDescription(event) {
    setDetails(
      { ...details },
      (details.description = event.target.description.value)
    );
    console.log(details);
    update();
  }

  function update() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(details),
    };
    fetch("http://localhost:3001/api/alerts/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        changeDValue(false);
        changeTValue(false);
        changePValue(false);
        if (response.success === 1) {
          window.location.reload(true);
        }
      });
    console.log(details);
  }

  return (
    <div>
      <h1>Alert Show</h1>
      {loading ? (
        <div> Loading </div>
      ) : (
        <div>
          {tValue ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitChangeTitle(event);
              }}
            >
              <input id="title" />
              <button type="submit"> ok </button>
            </form>
          ) : (
            <>
              {isUserAdmin ? (
                <>
                  <h2
                    onClick={() => {
                      changeTValue(true);
                    }}
                  >
                    Title : {details.title}{" "}
                  </h2>
                </>
              ) : (
                <h2>Title : {details.title} </h2>
              )}
            </>
          )}

          {dValue ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitChangeDescription(event);
              }}
            >
              <input id="description" />
              <button type="submit"> ok </button>
            </form>
          ) : (
            <>
              {isUserAdmin ? (
                <>
                  <h2
                    onClick={() => {
                      changeDValue(true);
                    }}
                  >
                    Description : {details.description}{" "}
                  </h2>
                </>
              ) : (
                <h2>Description : {details.description} </h2>
              )}
            </>
          )}

          {/* <h4>Description: {details.description} </h4> */}

          {pValue ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitChangePriority(event);
              }}
            >
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                className="modalInput"
                value={priorityValue}
                onChange={(option) => {
                  changePriorityValue(option.value);
                }}
              >
                <option value={1}>P1- Critical</option>
                <option value={2}>P2-High </option>
                <option value={3}>P3-Moderate </option>
                <option value={4}> P4-Low </option>
                <option value={5}>P5 -Informational </option>
              </select>
              <button type="submit"> OK </button>
            </form>
          ) : (
            <>
              <h4>Priority : P{details.priority_id} </h4>
              {isUserAdmin ? (
                <div>
                  <button
                    onClick={() => {
                      changePValue(true);
                    }}
                  >
                    {" "}
                    change{" "}
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
