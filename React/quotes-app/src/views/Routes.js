import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Singup from "./Singup";
import Login from "./Login";
import Quote from "./Quote";

const Logout = () => {
  window.localStorage.removeItem("token");
  return <Redirect to="/" />;
};

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/singup" exact component={Singup}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/quote" exact component={Quote}></Route>
        <Route path="/logout" exact component={Logout}></Route>
      </Switch>
    </Router>
  );
}

export default Routes;
