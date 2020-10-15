import sadCatImage1 from "./images/sadCat1.png";
import sadCatImage2 from "./images/sadCat2.png";
import sadCatImage3 from "./images/sadCat3.png";
import sadCatImage4 from "./images/sadCat4.png";
import sadCatImage5 from "./images/sadCat5.png";
import sadCatImage6 from "./images/sadCat6.png";
import sadCatImage7 from "./images/sadCat7.png";
import sadCatImage8 from "./images/sadCat8.png";
import sadCatImage9 from "./images/sadCat9.png";
import sadCatImage10 from "./images/sadCat10.png";
import sadCatImage11 from "./images/sadCat11.png";
import sadCatImage12 from "./images/sadCat12.png";
import sadCatImage13 from "./images/sadCat13.png";
import sadCatImage14 from "./images/sadCat14.png";
import sadCatImage15 from "./images/sadCat15.png";
import sadCatImage16 from "./images/sadCat16.png";
import sadCatImage17 from "./images/sadCat17.png";
import sadCatImage18 from "./images/sadCat18.png";

import catImage1 from "./images/cat1.png";
import catImage2 from "./images/cat2.png";
import catImage3 from "./images/cat3.png";
import catImage4 from "./images/cat4.png";
import catImage5 from "./images/cat5.png";
import catImage6 from "./images/cat6.png";
import catImage7 from "./images/cat7.png";
import catImage8 from "./images/cat8.png";
import catImage9 from "./images/cat9.png";
import catImage10 from "./images/cat10.png";
import catImage11 from "./images/cat11.png";
import catImage12 from "./images/cat12.png";
import catImage13 from "./images/cat13.png";

class Images {
  constructor() {
    this.cats = [
      catImage1,
      catImage2,
      catImage3,
      catImage4,
      catImage5,
      catImage6,
      catImage7,
      catImage8,
      catImage9,
      catImage10,
      catImage11,
      catImage12,
      catImage13,
    ];
    this.sadCats = [
      sadCatImage1,
      sadCatImage2,
      sadCatImage3,
      sadCatImage4,
      sadCatImage5,
      sadCatImage6,
      sadCatImage7,
      sadCatImage8,
      sadCatImage9,
      sadCatImage10,
      sadCatImage11,
      sadCatImage12,
      sadCatImage13,
      sadCatImage14,
      sadCatImage15,
      sadCatImage16,
      sadCatImage17,
      sadCatImage18,
    ];
    this.sadCatsToUse = [...this.sadCats];
    this.catsToUse = [...this.cats];
  }

  /**
   * Returns an image of a happy or sad cat
   */
  catImage(sad) {
    // Select either sad cats or happy cats
    let catImagesToUse = sad ? this.sadCatsToUse : this.catsToUse;
    let catImages = sad ? this.sadCats : this.cats;

    // Refill the images to use in case they got empty
    if (catImagesToUse.length == 0) catImagesToUse = [...catImages];

    // Choose a random cat, and then delete it from the catsToUse array,
    // so that next time doesn't repeat
    const randomNumber = Math.floor(Math.random() * catImagesToUse.length);
    const catToUse = catImagesToUse[randomNumber];
    catImagesToUse.splice(randomNumber, 1);

    return catToUse;
  }
}

export default Images;
