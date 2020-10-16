import $ from "jquery";

class TriviaGame {
  constructor(questions, numberOfQuestions, images, phrases) {
    this.questions = questions;
    this.points = 0;
    this.streak = 0;
    this.longestStreak = 0;
    this.corectAnswered = 0;
    this.currentQuestion = 0;
    this.numberOfQuestions = numberOfQuestions;
    this.correctBtn;
    this.phrases = phrases;
    this.images = images;
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
      document.getElementById("timeToTrivia").innerText = "Ready";
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
    answers.splice(randomPos, 0, thisQuestion.correct_answer);

    return answers.map((value) => decodeURIComponent(value));
  }

  get thisQuestion() {
    return this.questions[this.currentQuestion];
  }

  setEventListenersToBtns() {
    for (let i = 0; i < 4; i++) {
      // Because it's hard to remove event listeners from old session, I simply create a clon of the button and
      // replace it with the old button, efectively removing any event listener
      const old_button = document.getElementById(`answerBtn_${i}`);
      const new_button = old_button.cloneNode(true);
      old_button.parentNode.replaceChild(new_button, old_button);

      // Add event listener
      document.getElementById(`answerBtn_${i}`).addEventListener("click", (btn) => this.questionAnswered(btn));
    }
  }

  disableBtns() {
    for (let i = 0; i < 4; i++) document.getElementById(`answerBtn_${i}`).setAttributeNode(document.createAttribute("disabled"));
  }

  enableBtns() {
    for (let i = 0; i < 4; i++) document.getElementById(`answerBtn_${i}`).removeAttribute("disabled");
  }

  questionAnswered(btn) {
    this.disableBtns();
    if (btn.target.id == this.correctBtn) {
      const points = this.points;
      this.points = points + 100 + this.streak * 10;
      this.streak++;
      this.corectAnswered++;
    } else {
      this.streak = 0;
    }
    this.longestStreak = this.streak > this.longestStreak ? this.streak : this.longestStreak;

    this.updatePoints();
    this.markCorrectAnswer(btn.target.id);

    // Show the motivational phrase
    window.setTimeout(() => {
      document.getElementById("motivationalPhrase").innerText = this.phrases.getMotivationalPhrase(
        btn.target.id == this.correctBtn
      );
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

  startNewTrivia() {
    $("#results").collapse("hide");
    $("#collapseForum").collapse("hide");
    this.updatePoints();
    this.setEventListenersToBtns();
    this.showRegresiveCount().then(() => {
      this.showNextQuestion();
    });
  }

  showNextQuestion() {
    $("#questions").collapse("hide");

    if (this.currentQuestion >= this.numberOfQuestions) this.gameEnded();
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
    this.restoreColorOfBtns();
    this.enableBtns();

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
      this.correctBtn = thisQuestion.correct_answer == "True" ? "answerBtn_0" : "answerBtn_1";
    }

    console.log(this.correctBtn);

    // Increase the currentQuestion, so the next time I call this method, it loads the next question
    this.currentQuestion++;
  }

  gameEnded() {
    $("#results").collapse("show");
    const resultsTitle = document.getElementById("resultsTitle");
    const finalPoints = document.getElementById("finalPoints");
    const longestStreak = document.getElementById("longestStreak");
    const corectAnswered = document.getElementById("numberOfCorrectAnswers");
    const startAgainBtn = document.getElementById("startAgain");
    const resultsImage = document.getElementById("resultsImage");

    resultsTitle.innerText =
      this.corectAnswered >= 5 ? "\u{1F389} Congrats! \u{1F973}" : "Oh, well... At least you tried, right?";

    resultsImage.src = this.images.catImage(this.corectAnswered <= 5);

    finalPoints.innerText = this.points;
    longestStreak.innerText = this.longestStreak;
    corectAnswered.innerText = this.corectAnswered;

    startAgainBtn.addEventListener("click", () => this.showFirstForm());
  }

  showFirstForm() {
    $("#results").collapse("hide");
    $("#questions").collapse("hide");
    $("#collapseForum").collapse("show");
  }
}

export default TriviaGame;
