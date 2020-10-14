import $ from "jquery";
import axios from "axios";

class TriviaGame {
  constructor(questions) {
    this.questions = questions;
    this.points = 0;
    this.currentQuestion = 0;
    this.correctAnswer;
  }

  _shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  showRegresiveCount(skipCount = false) {
    return new Promise((resolve) => {
      if (skipCount) return resolve();

      $("#regresiveCount").modal();
      window.setTimeout(() => {
        document.getElementById("timeToTrivia").innerText = "2";
        window.setTimeout(() => {
          document.getElementById("timeToTrivia").innerText = "1";
          window.setTimeout(() => {
            $("#regresiveCount").modal("hide");
            resolve();
          }, 1000);
        }, 1000);
      }, 1200);
    });
  }

  get scrambledAnswers() {
    const thisQuestion = this.thisQuestion;
    const answers = [...thisQuestion.incorrect_answers];
    answers.push(thisQuestion.correct_answer);
    return this._shuffleArray(answers).map((value) => decodeURIComponent(value));
  }

  get thisQuestion() {
    return this.questions[this.currentQuestion];
  }

  setEventListenersToBtns() {
    for (let i = 0; i < 4; i++) {
      document.getElementById(`answerBtn_${i}`).addEventListener("click", (btn) => {
        console.log(btn.target.innerText == this.correctAnswer);
      });
    }
  }

  showNextQuestion() {
    $("#questions").collapse("show");
  }

  prepareNextQuestion() {
    const thisQuestion = this.thisQuestion;
    const difficulty = thisQuestion.difficulty;
    const questionText = document.getElementById("questionText");
    this.setEventListenersToBtns();

    this.correctAnswer = decodeURIComponent(thisQuestion.correct_answer);

    // Se the badge that says the difficulty of the current question
    const hardnessOfQuestion = document.getElementById("hardnessOfQuestion");
    hardnessOfQuestion.className = `badge badge-${
      difficulty == "easy" ? "success" : difficulty == "medium" ? "warning" : "danger"
    }`;
    hardnessOfQuestion.innerText = this._capitalizeFirstLetter(difficulty);

    document.getElementById("categoryOfQuestion").innerText = decodeURIComponent(thisQuestion.category);

    // Set the current number of question to the index
    const numberOfQuestion = document.getElementById("numberOfQuestion");
    numberOfQuestion.innerHTML = this.currentQuestion + 1;

    // Show the question in the title
    questionText.innerText = decodeURIComponent(thisQuestion.question);

    // Hide the last row if the question is boolean
    document.getElementById("answersRow_1").style.display = thisQuestion.type == "multiple" ? "flex" : "none";

    // Assign the text to each button
    if (thisQuestion.type == "multiple") {
      const scrambledAnswers = this.scrambledAnswers;
      for (let i = 0; i < 4; i++) {
        document.getElementById(`answerBtn_${i}`).innerText = scrambledAnswers[i];
      }
    } else {
      document.getElementById("answerBtn_0").innerText = "True";
      document.getElementById("answerBtn_1").innerText = "False";
    }

    // Increase the currentQuestion, so the next time I call this method, it loads the next question
    this.currentQuestion++;

    this.showNextQuestion();
  }
}

export default TriviaGame;
