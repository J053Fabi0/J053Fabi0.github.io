class Game {
  constructor(countries) {
    this.countries = countries;
    this.isOk = false;
    this.selectedCountries = [];
  }

  /**
   * Generate one integer random number from 0 to length
   */
  generateRandomNumber(length = 1) {
    return Math.floor(Math.random() * length);
  }

  /**
   * Returns one random country
   */
  get oneCountry() {
    const random = this.generateRandomNumber(this.countries.length);
    return this.countries[random];
  }

  /**
   * Return tree random countries.
   */
  get choiceCountries() {
    for (var i = 0; i < 3; i++) {
      let pais;
      do {
        pais = this.oneCountry;
      } while (this.selectedCountries.includes(pais));
      this.selectedCountries.push(pais);
    }

    return this.selectedCountries;
  }

  /**
   * Returns the winner country
   */
  get winnerCounty() {
    return this.selectedCountries[this.generateRandomNumber(this.selectedCountries.length)];
  }

  /**
   * Start the game, reloading the data
   */
  start() {
    const banderas = document.querySelector(".flags");
    const countryName = document.querySelector("#country-name");
    banderas.innerHTML = "";
    const resultados = document.querySelector(".results");
    resultados.style.visibility = "hidden";

    const paises = this.choiceCountries;
    let correcto = this.winnerCounty;

    for (let i = 0; i < paises.length; i++) {
      var img = document.createElement("img");
      img.setAttribute("src", paises[i].flag); // Le agrega un atributo
      img.setAttribute("id", paises[i].translations.es); // Le agrega un atributo
      img.addEventListener("click", (element) => {
        // Añades el listener de cuando haces click
        if (resultados.style.visibility != "visible") {
          if (element.target.id == correcto.translations.es) {
            document.getElementById("population").innerHTML = "<b>Población:</b> " + correcto.population;

            document.getElementById("capital").innerHTML = "<b>Capital:</b> " + correcto.capital;

            resultados.style.visibility = "visible";
          } else {
            alert("Nope");
          }
        } else {
          window.location.reload(false);
        }
      });
      banderas.appendChild(img); // Añade la imágen a las banderas
    }

    correcto = paises[Math.floor(Math.random() * paises.length)]; // Selecciona un país al azar de los que hemos seleccionado
    countryName.innerHTML = correcto.translations.es; // Pone el countryName al título del país correcto
  }
}

export default Game;
