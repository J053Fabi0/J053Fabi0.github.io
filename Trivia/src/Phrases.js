class Phrases {
  constructor() {
    this.winnerPhrases = [
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
    this.looserPhrases = [
      "Don't worry, making mistakes helps you learn!",
      "Don't give up!",
      "Nice try!",
      "Even when you're wrong, you're still learning!",
      "Try harder!",
      "You can do it!",
      "Mistakes are the best way to learn!",
    ];
    this.looserPhrasesToUse = [...this.looserPhrases];
    this.winnerPhrasesToUse = [...this.winnerPhrases];
  }

  /**
   * Returns a motivation phrase, depending if he won or not
   */
  getMotivationalPhrase(won) {
    // Select either winner phrases or looser phrases
    let phrasesToUse = won ? this.winnerPhrasesToUse : this.looserPhrasesToUse;
    let phrases = won ? this.winnerPhrases : this.looserPhrases;

    // Refill the phrases to use in case they got empty
    if (phrasesToUse.length == 0) phrasesToUse = [...phrases];

    // Choose a random phrase, and then delete it from the phrasesToUse array,
    // so that next time doesn't repeat
    const randomNumber = Math.floor(Math.random() * phrasesToUse.length);
    const phraseToUse = phrasesToUse[randomNumber];
    phrasesToUse.splice(randomNumber, 1);

    return phraseToUse;
  }
}

export default Phrases;
