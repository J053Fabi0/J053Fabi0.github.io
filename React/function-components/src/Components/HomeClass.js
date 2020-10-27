import React from "react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      perfil: null,
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  render() {
    console.log("Render");
    return <div>{this.state.perfil === null ? <h1>Cargando</h1> : <h1>Hola</h1>}</div>;
  }
}
