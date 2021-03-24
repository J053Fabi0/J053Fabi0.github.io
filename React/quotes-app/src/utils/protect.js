import React from "react";
import { Redirect } from "react-router-dom";

const protect = (Component) => {
  const token = window.localStorage.getItem("token");
  return (props) => (token ? <Component {...props} /> : <Redirect to="/" />);
};

export default protect;
