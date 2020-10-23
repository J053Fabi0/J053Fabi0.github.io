import "./style/style.scss";
import Images from "./Images";
import Phrases from "./Phrases";
import "bootstrap";
import $ from "jquery";
import axios from "axios";
import TriviaGame from "./TriviaGame";

const numberOfQuestions = 10;
const useRegresiveCount = true;
const BASE_URL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&encode=url3986`;
let difficulty = "easy";
let categoryOfQuestions = "any";
let typeOfQuestions = "any";
let token = "";

// Declare the instances outside any other function, so that they keep their values throughout the different trivias
const images = new Images();
const phrases = new Phrases();

// Show the first forum
$("#collapseForm").collapse("show");

// Add events listeners to the difficulty buttons
["easyButton", "mediumButton", "hardButton", "anyButton"].forEach((id) => {
  document.getElementById(id).addEventListener("click", () => updateDificulty(id));
});

// Handle changes in the difficulty
function updateDificulty(id) {
  const button = document.getElementById(id);

  let status = "";
  if (button.id == "easyButton") status = "success";
  else if (button.id == "mediumButton") status = "warning";
  else if (button.id == "hardButton") status = "danger";
  else status = "primary";

  difficultyBadge.className = `badge badge-${status}`;
  difficultyBadge.innerText = button.innerText;
  difficulty = id.split("B")[0]; // Since the id is just the difficulty with the word Button,
  // just split it by "B" and get the first element

  // This update the color of all the tree buttons
  ["easyButton", "mediumButton", "hardButton", "anyButton"].forEach((tempId) => {
    const tempBtn = document.getElementById(tempId);

    if (tempBtn.id == id) tempBtn.classList.replace("btn-secondary", `btn-${status}`);
    else tempBtn.classList = "border border-dark btn btn-secondary btn-lg";
  });
}

// Set default valies for select inputs, and eventListeners
document.getElementById("typeOfQuestions").value = "any";
document.getElementById("categoryOfQuestions").value = "any";
document.getElementById("typeOfQuestions").addEventListener("input", ({ target }) => (typeOfQuestions = target.value));
document.getElementById("categoryOfQuestions").addEventListener("input", ({ target }) => (categoryOfQuestions = target.value));

document.getElementById("startTriviaButton").addEventListener("click", () => {
  const URL =
    `${BASE_URL}` +
    (difficulty != "any" ? `&difficulty=${difficulty}` : "") +
    (typeOfQuestions != "any" ? `&type=${typeOfQuestions}` : "") +
    (categoryOfQuestions != "any" ? `&category=${categoryOfQuestions}` : "");

  const button = document.getElementById("startTriviaButton");
  button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
  button.setAttributeNode(document.createAttribute("disabled"));

  function getToken() {
    return new Promise((resolve, reject) =>
      axios
        .get("https://opentdb.com/api_token.php?command=request")
        .then((res) => resolve(res.data.token))
        .catch((err) => reject(err))
    );
  }

  if (token === "")
    getToken()
      .then((newToken) => {
        token = newToken;
        startGame();
      })
      .catch((err) => handleErr(err));
  else startGame();

  function startGame() {
    axios
      .get(`${URL}&token=${token}`)
      .then((res) => {
        console.log(`${URL}&token=${token}`);
        switch (res.data.response_code) {
          case 0:
            startTrivia(res.data.results);
            break;

          case 1:
          case 4:
            document.getElementById("alerta_titulo").innerHTML = "Oh, no...";
            document.getElementById("alerta_mensaje").innerHTML =
              "We don't have enough questions for the specific options you choosed, either because you have already " +
              "answered all of the questions we had, or simply because our database isn't big enough yet. Sorry.<br><br>" +
              "Please try with some other options or reload the page if you want to answer the same questios again.";
            $("#alerta").modal();
            break;

          default:
            document.getElementById("alerta_titulo").innerHTML = "Oh, no...";
            document.getElementById(
              "alerta_mensaje"
            ).innerHTML = `There was an unknown error with code ${res.data.response_code}.`;
            $("#alerta").modal();
        }

        // Enable the startTrivia button just in case there was an error.
        enableStartButton();
      })
      .catch((err) => {
        enableStartButton();
        handleErr(err);
      });
    function enableStartButton() {
      window.setTimeout(() => {
        button.innerHTML = "Start the trivia!";
        button.removeAttribute("disabled");
      }, 100);
    }
  }
});

document.getElementById("leaveTriviaBtn").addEventListener("click", () => {
  $("#results").collapse("hide");
  $("#questions_0").collapse("hide");
  $("#questions_1").collapse("hide");
  $("#collapseForm").collapse("show");
});

function startTrivia(questions) {
  const triviaGame = new TriviaGame(questions, numberOfQuestions, images, phrases);

  triviaGame.startNewTrivia(useRegresiveCount);
}

function handleErr(err) {
  document.getElementById("alerta_titulo").innerHTML = "Oh, no...";
  document.getElementById("alerta_mensaje").innerHTML = "There was an unknown error.<br>" + err;
  $("#alerta").modal();
  console.log(err);
}
