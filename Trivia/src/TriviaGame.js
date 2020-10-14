import $ from "jquery";

class TriviaGame {
  constructor(questions) {
    this.questions = questions;
    this.points = 0;
    this.streak = 0;
    this.currentQuestion = 0;
    this.correctBtn;
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

  _getMotivationalPhrase(won) {
    const winnerPhrases = [
      "You're the best!",
      "Well done!",
      "Amazing!",
      "Excellent!",
      "Cool!",
      "Nice! Hard work always pays off!",
      "Congrats!",
      "Good Effort!",
      "You're getting good at this!",
    ];
    const looserPhrases = [
      "Don't worry, making mistakes helps you learn!",
      "Don't give up!",
      "Nice try!",
      "Even when you're wrong, you're still learning!",
      "Try harder!",
      "You can do it!",
      "Mistakes are the best way to learn!",
    ];

    if (won) return winnerPhrases[Math.floor(Math.random() * winnerPhrases.length)];
    else return looserPhrases[Math.floor(Math.random() * looserPhrases.length)];
  }

  showRegresiveCount(skipCount = false) {
    return new Promise((resolve) => {
      if (skipCount) return resolve();

      $("#regresiveCount").modal();
      window.setTimeout(() => {
        document.getElementById("timeToTrivia").innerText = "Steady";
        window.setTimeout(() => {
          document.getElementById("timeToTrivia").innerText = "Go!";
          window.setTimeout(() => {
            resolve();
            $("#regresiveCount").modal("hide");
          }, 800);
        }, 1000);
      }, 1200);
    });
  }

  get scrambledAnswers() {
    const thisQuestion = this.thisQuestion;
    const answers = this._shuffleArray([...thisQuestion.incorrect_answers]);

    // This insert the correct answer in a random position, and also save that position
    // to correctBtn
    const randomPos = Math.floor(Math.random() * 4);
    this.correctBtn = `answerBtn_${randomPos}`;
    answers.slice(randomPos, thisQuestion.correct_answer);

    return answers.map((value) => decodeURIComponent(value));
  }

  get thisQuestion() {
    return this.questions[this.currentQuestion];
  }

  setEventListenersToBtns() {
    for (let i = 0; i < 4; i++)
      document.getElementById(`answerBtn_${i}`).addEventListener("click", (btn) => this.questionAnswered(btn));
  }

  questionAnswered(btn) {
    if (btn.target.id == this.correctBtn) {
      const points = this.points;
      this.points = points + 100 + this.streak * 10;
      this.streak++;
    } else {
      this.streak = 0;
    }

    this.updatePoints();
    this.markCorrectAnswer(btn.target.id);

    window.setTimeout(() => {
      document.getElementById("motivationalPhrase").innerText = this._getMotivationalPhrase(btn.target.id == this.correctBtn);
      $("#motivationalModal").modal();
      window.setTimeout(() => {
        $("#motivationalModal").modal("hide");
        this.showNextQuestion();
      }, 2000);
    }, 200);
  }

  markCorrectAnswer(idOfClickedBtn) {
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById(`answerBtn_${i}`);

      let color;
      if (btn.id == this.correctBtn) color = "success";
      else if (btn.id == idOfClickedBtn) color = "danger";
      else color = "secondary";

      btn.className = `btn btn-block option-btn btn-${color}`;
    }
  }

  restoreColorOfBtns() {
    for (let i = 0; i < 4; i++) document.getElementById(`answerBtn_${i}`).className = "btn btn-block option-btn btn-info";
  }

  showNextQuestion() {
    $("#questions").collapse("hide");

    if (this.currentQuestion >= 10) this.gameEnded();
    else
      window.setTimeout(() => {
        this.prepareNextQuestion();
        $("#questions").collapse("show");
      }, 400);
  }

  updatePoints() {
    document.getElementById("points").innerText = this.points;
    document.getElementById("streak").innerText = this.streak;
  }

  prepareNextQuestion() {
    const thisQuestion = this.thisQuestion;
    const difficulty = thisQuestion.difficulty;
    const questionText = document.getElementById("questionText");
    // this.setEventListenersToBtns();
    this.restoreColorOfBtns();

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
      for (let i = 0; i < 4; i++) document.getElementById(`answerBtn_${i}`).innerText = scrambledAnswers[i];
    } else {
      document.getElementById("answerBtn_0").innerText = "True";
      document.getElementById("answerBtn_1").innerText = "False";
    }

    // Increase the currentQuestion, so the next time I call this method, it loads the next question
    this.currentQuestion++;
  }

  gameEnded() {}
}

export default TriviaGame;
