import React from "react";
import Modal, { ModalTransition, ScrollBehavior } from "@atlaskit/modal-dialog";
import "./Alert.css";
import Button from "@atlaskit/button";
import {
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import AllAlerts from "./AlertTypes/AllAlerts";
import CloseAlerts from "./AlertTypes/CloseAlerts";
import OpenAlerts from "./AlertTypes/OpenAlerts";
import AckAlerts from "./AlertTypes/AckALerts";

import UnAck from "./AlertTypes/UnAck";
import AlertShow from "./AlertShow";

export default function Alert(props) {
  const [scrollBehaviour, setScrollBehaviour] = React.useState("inside");
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
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

  function makeAlert(event) {
    event.preventDefault();
    console.log(event.target.priority.value);
    let alert = {
      title: event.target.title.value,
      description: event.target.description.value,
      priority_id: event.target.priority.value,
      responders: responderList,
      admin_id: localStorage.getItem("user"),
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(alert),
    };
    fetch("http://localhost:3001/api/alerts/", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        if (response.success === 1) {
          //   window.location.reload(true);
          props.history.push("/alert");
          //   window.location.href = "/alert";
        }
      });
  }

  const [alertsList, changeAlertsList] = React.useState();
  const [loading, changeLoading] = React.useState(true);
  const [searchBoxValue, changeSearchBoxValue] = React.useState("");
  const getAlerts = async () => {
    const response = await fetch("http://localhost:3001/api/alerts/");
    const responsejson = await response.json();
    // console.log(responsejson);
    const alerts = await responsejson.data;
    changeAlertsList(alerts);
    changeLoading(false);
  };

  const searchValueChange = async (value) => {
    changeLoading(true);
    const response = await fetch("http://localhost:3001/api/alerts/" + value);
    const responsejson = await response.json();
    const alerts = await responsejson.data;
    changeAlertsList(alerts);
    changeLoading(false);
    // console.log("alerts : ", alertsList);
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

  //   React.useEffect(() => {
  //     getAlerts();
  //   }, []);
  //   React.useEffect(() => {
  //     console.log(responderList);
  //   }, [responderList]);

  //   const closer = (alert) => {
  //     alert.close = true;
  //     const requestOptions = {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },

  //       body: JSON.stringify(alert),
  //     };
  //     fetch(`http://localhost:3001/api/alerts/close/${alert.id}`, requestOptions)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         if (response.success === 1) {
  //           window.location.reload(true);
  //         }
  //       });
  //     //   console.log(details);
  //   };

  //   const acknowledge = (alert) => {
  //     console.log(alert);
  //     alert.ack = !alert.ack;
  //     console.log(alert);
  //     const requestOptions = {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },

  //       body: JSON.stringify(alert),
  //     };
  //     fetch(
  //       `http://localhost:3001/api/alerts/acknowledge/${alert.id}`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((response) => {
  //         if (response.success === 1) {
  //           window.location.reload(true);
  //         }
  //       });
  //   };

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
          <div className="secondaryHeader">
            <span className="pageHeading"> Alerts </span>
            <Button
              appearance="primary"
              id="addAlertButton"
              onClick={() => {
                changeResponderList([]);
                setScrollAndOpen("inside-wide");
              }}
            >
              Add Alert
            </Button>

            <br></br>
            <br></br>
            <div className="">
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
                heading="Add Alert"
                scrollBehavior={scrollBehaviour}
                height={600}
              >
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    makeAlert(event);
                  }}
                >
                  <div>
                    <label htmlFor="title">Title</label>
                    <br />
                    <input id="title" type="text" className="modalInput" />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="description">Description</label>
                    <br />
                    <input
                      id="description"
                      type="text"
                      className="modalInput"
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="priority">Priority</label>
                    <br />
                    <select
                      id="priority"
                      value={priorityValue}
                      className="modalInput"
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
                      Responders : <br />
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
                  <br></br>
                  <div>
                    <input type="submit" value="Add" />
                  </div>
                </form>
              </Modal>
            )}
          </ModalTransition>
          {/* <div>
            {loading ? (
              <div> Loading </div>
            ) : (
              <ul>
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
                          {alert.ack ? (
                            <span>UnAck</span>
                          ) : (
                            <span>Ack</span>
                          )}{" "}
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
          </div> */}
          {/* <AllAlerts {...props} />
          <CloseAlerts {...props} />
          <OpenAlerts {...props} />
          <AckAlerts {...props} />
          <UnAck {...props} /> */}
          <Router>
            <div className="alerts-box">
              <div className="alerts-link-box">
                <NavLink
                  to="/alert"
                  style={{ "margin-left": "4%", color: "blue" }}
                >
                  All
                </NavLink>
                <br></br>
                <br></br>
                <NavLink
                  to="/alert/open"
                  style={{ "margin-left": "4%", color: "blue" }}
                >
                  Open
                </NavLink>
                <br></br>
                <br></br>
                <NavLink
                  to="/alert/close"
                  style={{ "margin-left": "4%", color: "blue" }}
                >
                  Close
                </NavLink>
                <br></br>
                <br></br>
                <NavLink
                  to="/alert/ack"
                  style={{ "margin-left": "4%", color: "blue" }}
                >
                  Acked
                </NavLink>
                <br></br>
                <br></br>
                <NavLink
                  to="/alert/unack"
                  style={{ "margin-left": "4%", color: "blue" }}
                >
                  Un'Acked
                </NavLink>
                {/* <Link to="/alert/ack">Check</Link> */}
              </div>

              <div className="alerts-main-box">
                <Switch>
                  <Route exact path="/alert" component={AllAlerts} />
                  <Route path="/alert/open" component={OpenAlerts} />
                  <Route path="/alert/close" component={CloseAlerts} />
                  <Route path="/alert/ack" component={AckAlerts} />
                  <Route path="/alert/unack" component={UnAck} />
                  <Route path="/alertShow/:id" component={AlertShow} />
                </Switch>
              </div>
            </div>
          </Router>
        </div>
      )}
    </div>
  );
}
