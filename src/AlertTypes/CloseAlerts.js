import React from "react";
import Button from "@atlaskit/button";

export default function CloseAlerts(props) {
  const [alertsList, changeAlertsList] = React.useState();
  const [loading, changeLoading] = React.useState(true);

  const getAlerts = async () => {
    const response = await fetch("http://localhost:3001/api/alerts/close");
    const responsejson = await response.json();
    // console.log(responsejson);
    const alerts = await responsejson.data;
    changeAlertsList(alerts);
    changeLoading(false);
  };

  React.useEffect(() => {
    getAlerts();
  }, []);

  const deleteAlert = (alert) => {
    alert.close = true;
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(alert),
    };
    fetch(`http://localhost:3001/api/alerts/${alert.id}`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.success === 1) {
          window.location.reload(true);
        }
      });
    //   console.log(details);
  };

  return (
    <div>
      {loading ? (
        <div> Loading </div>
      ) : (
        <ul>
          Close
          {alertsList.map((alert, id) => (
            <div key={id}>
              <div key={id} style={{ display: "flex" }}>
                <div
                  style={{ width: "80%" }}
                  onClick={() => {
                    props.history.push(`/alertShow/${alert.id}`, {
                      alertId: alert.id,
                    });
                  }}
                >
                  <li key={id}>
                    <Button> #{alert.id} </Button>
                    <br />
                    <br />
                    <Button appearance="warning">
                      P{alert.priority_id}{" "}
                    </Button>{" "}
                    {alert.title}{" "}
                  </li>
                  <br />
                </div>
                <div key={id}>
                  <div>
                    <Button
                      onClick={() => {
                        deleteAlert(alert);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
