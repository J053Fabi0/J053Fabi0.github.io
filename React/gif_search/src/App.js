import React from "react";
import axios from "axios";

import "./App.css";

import ImageCard from "./components/ImageCard";
import SearchCard from "./components/SearchCard";

class App extends React.Component {
  state = {
    results: [],
  };

  emitSearch = (search) => {
    if (search)
      axios
        .get(`https://api.giphy.com/v1/gifs/search?limit=10&q=${search}&api_key=iQyUMTk7WJgZcRGRZhG7xahQf204WwGs`)
        .then(({ data }) => this.setState({ results: data.data }));
  };

  componentWillMount() {
    // Este no se ocupa, porque si algo falla aquí, no se pintará nada
    console.log("Antes de que se ejecute render.");
  }

  componentDidMount() {
    console.log("Después de render.");
  }

  // this.state para manejar el estado interno del componente
  // this.props para obtener las propiedades qeu nos pasa el componente padre
  render() {
    console.log("Render");
    return (
      <div className="App">
        <SearchCard emitSearch={this.emitSearch} />
        <div className="grid-cards">
          {this.state.results.map(({ images }) => (
            <ImageCard url={images.fixed_width.url} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
