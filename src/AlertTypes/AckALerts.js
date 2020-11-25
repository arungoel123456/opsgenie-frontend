import React from "react";
import Button from "@atlaskit/button";

export default function AckAlerts(props) {
  const [alertsList, changeAlertsList] = React.useState();
  const [loading, changeLoading] = React.useState(true);

  const getAlerts = async () => {
    const response = await fetch("http://localhost:3001/api/alerts/ack");
    const responsejson = await response.json();
    // console.log(responsejson);
    const alerts = await responsejson.data;
    changeAlertsList(alerts);
    changeLoading(false);
  };

  React.useEffect(() => {
    getAlerts();
  }, []);

  const closer = (alert) => {
    alert.close = true;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(alert),
    };
    fetch(`http://localhost:3001/api/alerts/close/${alert.id}`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
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
          Ack
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
                  {alert.close ? (
                    <></>
                  ) : (
                    <div>
                      <Button
                        onClick={() => {
                          closer(alert);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  )}
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
