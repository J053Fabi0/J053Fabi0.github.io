// Reglas de React
// 1.- El archivo de mi componente tiene que ir Capitalizado
// 2.- SIEMPRE importar dependencia de React
// 3.- La clase/función, debe llamarse igual que el archivo
import React from "react";
import "./Counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initCount || 0,
    };
  }
  // El state se va a encargar de modificar el DOM por mí
  // React detecta cambios en el state y los pone en la UI
  // No debe llamarse de otra forma.

  render() {
    // className es lo mismo que class, solo que class
    // es una palabra resevada en JS.
    return (
      <div className="container-main">
        <div className="counter-buttons">
          <h5>{this.state.count}</h5>
          {/* Las llaves en JSX representan código de JSX */}
          {/* this.setState es el único que puede cambiar el estado */}
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>Agregar</button>
          <button onClick={() => this.setState({ count: this.state.count - 1 })}>Disminuir</button>
        </div>
      </div>
    );
  }
}

export default Counter;
