import "./style/main.scss";
import Game from "./Game";
import axios from "axios";

async function init() {
  try {
    const response = await axios.get("https://restcountries.eu/rest/v2/all");
    const game = new Game(response.data);
    game.start();
  } catch (err) {
    console.log(err);
  }
}

init();
