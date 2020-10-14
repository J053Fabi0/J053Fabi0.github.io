import "./style/style.scss";
import "bootstrap";
import $ from "jquery";
import axios from "axios";
import TriviaGame from "./TriviaGame";

(function () {
  const BASE_URL = "https://opentdb.com/api.php?amount=10&encode=url3986";
  let difficulty = "easy";
  let categoryOfQuestions = "any";
  let typeOfQuestions = "any";

  // Show the first forum
  $("#collapseForum").collapse("show");

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
      else tempBtn.classList = "btn btn-secondary btn-lg";
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

    axios
      .get(URL)
      .then((res) => {
        switch (res.data.response_code) {
          case 0:
            startTrivia(res.data.results);
            break;

          case 1:
            document.getElementById("alerta_titulo").innerHTML = "Oh, no...";
            document.getElementById("alerta_mensaje").innerHTML =
              "We don't have enough questions for the specific options you choosed.<br><br>" +
              "Please try with some other options.";
            $("#alerta").modal();
            break;

          default:
            document.getElementById("alerta_titulo").innerHTML = "Oh, no...";
            document.getElementById("alerta_mensaje").innerHTML = "There was an unknown error.";
            $("#alerta").modal();
        }

        // Enable the startTrivia button just in case there was an error.
        enableButton();
      })
      .catch((err) => {
        enableButton();
        handleErr(err);
      });

    function enableButton() {
      window.setTimeout(() => {
        button.innerHTML = "Start the trivia!";
        button.removeAttribute("disabled");
      }, 100);
    }
  });

  function startTrivia(questions) {
    console.log(questions);
    const triviaGame = new TriviaGame(questions);
    $("#collapseForum").collapse("hide");

    triviaGame.showRegresiveCount(true).then(() => {
      window.setTimeout(() => triviaGame.prepareNextQuestion(), 600);
    });
  }

  function handleErr(err) {
    document.getElementById("alerta_titulo").innerHTML = "Oh, no...";
    document.getElementById("alerta_mensaje").innerHTML = "There was an unknown error.<br>" + err;
    $("#alerta").modal();
    console.log(err);
  }
})();
