import Grille from "./Grille.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tailleGrille = 40;

const grille = new Grille(tailleGrille);

function gameLoop() {
  grille.draw(ctx);
}

grille.setCanvasTaille(canvas);

setInterval(gameLoop, 1000 / 75);
