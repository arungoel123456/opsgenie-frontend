import React from "react";
import FrontPage from "./FrontPage";
export default function Home(props) {
  // const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  // React.useEffect(() => {
  //   if (localStorage.jwt !== undefined) {
  //     setUserLoggedIn(true);
  //   }
  // }, []);

  return (
    <div>
      {/* <div>{userLoggedIn ? <Home /> : <FrontPage />}</div> */}
      <FrontPage />
    </div>
  );
}
