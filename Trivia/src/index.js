import "./style/style.scss";
import "bootstrap";
import $ from "jquery";

(function () {
  // Show the first forum
  $("#collapseForum").collapse("show");

  // Handle changes in the difficulty range input
  $("#difficulty").on("input change", function (object) {
    const difficultyBadge = document.getElementById("difficultyBadge");
    difficultyBadge.className = `badge badge-${
      object.target.value == 1 ? "success" : object.target.value == 2 ? "warning" : "danger"
    }`;
    difficultyBadge.innerText = object.target.value == 1 ? "Easy" : object.target.value == 2 ? "Medium" : "Hard";
  });
})();
