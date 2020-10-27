import React from "react";

class SearchBar extends React.Component {
  state = {
    search: "",
  };

  render() {
    return (
      <div className="search-bar">
        <input
          onChange={(event) => {
            // onChange se ejecuta cada vez que el usuario modifica algo en el input
            // onChange recibe un callback con el evento y así saber el valor del input
            // cada vez que el usuario teclea algo en el input, lo guardamos en el estado
            this.setState({ search: event.target.value });
          }}
          placeholder="Search"
          name="search"
          className="search-input"
        />
        <button onClick={() => this.props.emitSearch(this.state.search)} className="search-button">
          Buscar
        </button>
      </div>
    );
  }
}

export default SearchBar;
