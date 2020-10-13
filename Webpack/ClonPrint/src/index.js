import "./style/style.scss";

function init() {
  let data = "";
  for (let i = 1; i <= 48; i++) {
    if (i % 8 == 1) data = data + `<div class="columna">`;
    data =
      data +
      `
      <div class="imagen" style="background-image: url('./images/${i <= 9 ? "0" : ""}${i}.jpg');">
          <img src="./images/${i <= 9 ? "0" : ""}${i}.jpg" alt="" />
          <button class="guardar">Guardar</button>
          <div class="share_buttons">
              <button></button>
              <button></button>
          </div>
      </div>
    `;
    if (i % 8 == 0) data = data + `</div>`;
  }
  const main = document.querySelector("main");
  console.log(main);
  main.innerHTML = data;
}

// init();
