import React from "react";
import Navbar from "../components/Navbar";
import useForm from "../hooks/useForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Singup() {
  let history = useHistory();
  const sendData = (data) => {
    if (data.password === data.password_confirm) {
      delete data.password_confirm;
      axios
        .post("https://ca35951931f4.ngrok.io/signup", data)
        .then((response) => {
          if (response?.status === 201) {
            history.push("/");
          }
        })
        .catch((err) => alert(err.response.data?.message));
    } else {
      alert("Las contraseñas no corresponden.");
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(sendData, {});

  return (
    <form onSubmit={handleSubmit}>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                value={inputs.first_name}
                onChange={handleInputChange}
                className="form-control"
                name="first_name"
                id="first_name"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="">Apellidos</label>
              <input
                type="text"
                value={inputs.last_name}
                onChange={handleInputChange}
                className="form-control"
                name="last_name"
                id="last_name"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={inputs.email}
                onChange={handleInputChange}
                className="form-control"
                name="email"
                id="email"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="">Contraseña</label>
              <input
                type="text"
                value={inputs.password}
                onChange={handleInputChange}
                className="form-control"
                name="password"
                id="password"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <label htmlFor="">Confirma la contraseña</label>
              <input
                type="text"
                value={inputs.password_confirm}
                onChange={handleInputChange}
                className="form-control"
                name="password_confirm"
                id="password_confirm"
              />
            </div>
          </div>
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-dark">
              Iniciar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Singup;
