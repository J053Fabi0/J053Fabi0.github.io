import "./App.css";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <Home saludo="Hola" cmp={<p>R</p>} />
    </div>
  );
}

export default App;
