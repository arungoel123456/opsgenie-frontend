import React from "react";
import Modal, { ModalTransition, ScrollBehavior } from "@atlaskit/modal-dialog";
import "./incident.css";
import Button from "@atlaskit/button";

export default function Incident(props) {
  const [scrollBehaviour, setScrollBehaviour] = React.useState("inside");
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => {
    setIsOpen(false);
    changeResponderSearchBoxValue("");
    changeUserList([]);
  };
  const setScrollAndOpen = (newScroll) => {
    setScrollBehaviour(newScroll);
    requestAnimationFrame(() => setIsOpen(true));
  };

  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.jwt !== undefined) {
      setUserLoggedIn(true);
    }
  }, []);

  const [priorityValue, changePriorityValue] = React.useState(2);

  function makeIncident(event) {
    event.preventDefault();
    // console.log(event.target.priority.value);
    let incident = {
      title: event.target.title.value,
      description: event.target.description.value,
      priority_id: event.target.priority.value,
      responders: responderList,
      admin_id: localStorage.getItem("user"),
    };
    console.log(incident);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(incident),
    };
    fetch("http://localhost:3001/api/incidents/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.success === 1) {
          window.location.reload(true);
        }
      });
  }

  const [incidentsList, changeIncidentsList] = React.useState();
  const [loading, changeLoading] = React.useState(true);
  const [searchBoxValue, changeSearchBoxValue] = React.useState("");
  const getIncidents = async () => {
    const response = await fetch("http://localhost:3001/api/incidents/");
    const responsejson = await response.json();
    // console.log(responsejson);
    const incidents = await responsejson.data;
    changeIncidentsList(incidents);
    changeLoading(false);
  };

  const searchValueChange = async (value) => {
    changeLoading(true);
    const response = await fetch(
      "http://localhost:3001/api/incidents/" + value
    );
    const responsejson = await response.json();
    const incidents = await responsejson.data;
    changeIncidentsList(incidents);
    changeLoading(false);
    console.log("incidents : ", incidentsList);
  };

  //   let responderList = [];
  const [responderList, changeResponderList] = React.useState([]);

  const [userList, changeUserList] = React.useState([]);
  const [responderLoading, changeResponderLoading] = React.useState(false);
  const [
    responderSearchBoxValue,
    changeResponderSearchBoxValue,
  ] = React.useState("");
  const responderSearchBoxValueChanged = async (value) => {
    changeResponderLoading(true);
    const response = await fetch(
      "http://localhost:3001/api/users/search/" + value
    );
    const responsejson = await response.json();
    if (responsejson.data === undefined) {
      changeUserList([]);
    } else {
      changeUserList(responsejson.data);
    }

    changeResponderLoading(false);
  };

  React.useEffect(() => {
    getIncidents();
  }, []);
  React.useEffect(() => {
    console.log(responderList);
  }, [responderList]);

  const closer = (incident) => {
    alert.close = true;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(incident),
    };
    fetch(
      `http://localhost:3001/api/incidents/close/${incident.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success === 1) {
          window.location.reload(true);
        }
      });
    //   console.log(details);
  };

  const acknowledge = (incident) => {
    console.log(incident);
    incident.ack = !incident.ack;
    console.log(incident);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(incident),
    };
    fetch(
      `http://localhost:3001/api/incidents/acknowledge/${incident.id}`,
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
      {!userLoggedIn ? (
        <div>
          {" "}
          <h1> Please Login First </h1>
        </div>
      ) : (
        <div>
          <div className="secondaryHeader">
            <span className="pageHeading"> Incidents </span>
            <Button
              appearance="primary"
              id="addIncidentButton"
              onClick={() => {
                changeResponderList([]);
                setScrollAndOpen("inside-wide");
              }}
            >
              Add Incident
            </Button>
            <br></br>
            <br></br>

            <div>
              <input
                type="text"
                className="searchBox"
                value={searchBoxValue}
                onChange={(event) => {
                  changeSearchBoxValue(event.target.value);
                  searchValueChange(event.target.value);
                }}
              />
            </div>
          </div>

          <ModalTransition>
            {isOpen && (
              <Modal
                actions={[{ text: "Close", onClick: close }]}
                onClose={close}
                heading="Add Incident"
                scrollBehavior={scrollBehaviour}
                height={600}
              >
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    makeIncident(event);
                  }}
                >
                  <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" className="modalInput" />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="description">Description</label>
                    <input
                      id="description"
                      type="text"
                      className="modalInput"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="priority">Priority</label>
                    <select
                      id="priority"
                      className="modalInput"
                      value={priorityValue}
                      onChange={(option) => {
                        console.log(option);
                        console.log(option.value);
                        changePriorityValue(option.value);
                      }}
                    >
                      <option value={1}>P1- Critical</option>
                      <option value={2}>P2-High </option>
                      <option value={3}>P3-Moderate </option>
                      <option value={4}> P4-Low </option>
                      <option value={5}>P5 -Informational </option>
                    </select>
                  </div>
                  <br />
                  <div>
                    <div>
                      {responderList.map((responder, id) => (
                        <span key={id}> {responder.firstName} </span>
                      ))}
                    </div>
                    <div>
                      Responders :{" "}
                      <input
                        type="text"
                        className="modalInput"
                        value={responderSearchBoxValue}
                        onChange={(event) => {
                          changeResponderSearchBoxValue(event.target.value);
                          responderSearchBoxValueChanged(event.target.value);
                        }}
                      />
                    </div>
                    <div>
                      {responderLoading ? (
                        <div> </div>
                      ) : (
                        <div>
                          {userList.map((user, id) => (
                            <li
                              key={id}
                              onClick={() => {
                                changeResponderList([
                                  ...responderList,
                                  { id: user.id, firstName: user.firstName },
                                ]);
                                changeResponderSearchBoxValue("");
                                responderSearchBoxValueChanged("");
                              }}
                            >
                              {user.firstName}{" "}
                            </li>
                          ))}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <br />

                  <div>
                    <input type="submit" value="Add" />
                  </div>
                </form>
              </Modal>
            )}
          </ModalTransition>

          <div>
            {loading ? (
              <div> Loading </div>
            ) : (
              <ul type="none">
                {incidentsList.map((incident, id) => (
                  <div key={id}>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{ width: "80%" }}
                        key={id}
                        onClick={() => {
                          //   console.log(props);
                          props.history.push(`/incidentShow/${incident.id}`, {
                            incidentId: incident.id,
                          });
                        }}
                      >
                        <li key={id}>
                          <Button> #{incident.id} </Button>
                          <br />
                          <br />
                          <Button appearance="warning">
                            P{incident.priority_id}{" "}
                          </Button>{" "}
                          {incident.title}{" "}
                        </li>
                        <br />
                      </div>
                      <div key={id}>
                        <Button
                          onClick={() => {
                            acknowledge(incident);
                          }}
                        >
                          {" "}
                          {incident.ack ? (
                            <span>UnAck</span>
                          ) : (
                            <span>Ack</span>
                          )}{" "}
                        </Button>
                        <br />
                        <br />
                        {incident.close ? (
                          <></>
                        ) : (
                          <div>
                            <Button
                              onClick={() => {
                                closer(incident);
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
        </div>
      )}
    </div>
  );
}
