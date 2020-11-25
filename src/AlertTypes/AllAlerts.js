import React from "react";
import Button from "@atlaskit/button";

export default function AllAlerts(props) {
  const [alertsList, changeAlertsList] = React.useState();
  const [loading, changeLoading] = React.useState(true);

  const getAlerts = async () => {
    const response = await fetch("http://localhost:3001/api/alerts/");
    const responsejson = await response.json();
    // console.log(responsejson);
    const alerts = await responsejson.data;
    changeAlertsList(alerts);
    changeLoading(false);
  };

  React.useEffect(() => {
    getAlerts();
  }, []);

  const closer = async (alert) => {
    alert.close = true;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(alert),
    };
    const response = await fetch(
      `http://localhost:3001/api/alerts/close/${alert.id}`,
      requestOptions
    );
    const responsejson = await response.json();
    console.log(responsejson);
  };

  const acknowledge = (alert) => {
    // console.log(alert);
    alert.ack = !alert.ack;
    console.log(alert);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(alert),
    };
    fetch(
      `http://localhost:3001/api/alerts/acknowledge/${alert.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success === 1) {
          window.location.reload(true);
        }
      });
  };

  return (
    <div>
      {loading ? (
        <div> Loading </div>
      ) : (
        <ul>
          All
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
                  <Button
                    onClick={() => {
                      acknowledge(alert);
                    }}
                  >
                    {" "}
                    {alert.ack ? <span>UnAck</span> : <span>Ack</span>}{" "}
                  </Button>
                  <br />
                  <br />
                  {alert.close ? (
                    <></>
                  ) : (
                    <div>
                      <Button
                        onClick={() => {
                          closer(alert);
                          const newAlertList = [
                            ...alertsList.slice(0, id),
                            { ...alert, close: true },
                            ...alertsList.slice(id + 1),
                          ];
                          console.log("newALertList: ", newAlertList);
                          changeAlertsList(newAlertList);
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
