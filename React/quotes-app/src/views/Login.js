import React from "react";
import useForm from "../hooks/useForm";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  let history = useHistory();
  const sendData = (data) =>
    axios
      .post("https://ca35951931f4.ngrok.io/login", data)
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("token", res.data.token);
        history.push("/");
      })
      .catch((err) => alert(err.response.data?.message));

  const { inputs, handleSubmit, handleInputChange } = useForm(sendData, {});

  return (
    <form onSubmit={handleSubmit}>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input type="type" value={inputs.email} onChange={handleInputChange} name="email" className="form-control" />
          </div>
        </div>
        <div className="col-md-10">
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input type="type" value={inputs.password} onChange={handleInputChange} name="password" className="form-control" />
          </div>
        </div>
        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-dark">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
