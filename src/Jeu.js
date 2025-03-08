import Grille from "./Grille.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tailleGrille = 50;
const rapiditer = 2;
const grille = new Grille(tailleGrille);
const chimsite = grille.getChimiste(rapiditer);
const enemies = grille.getEnemies(rapiditer);
function gameLoop() {
  grille.draw(ctx);
  chimsite.draw(ctx);
  enemies.forEach((enemie) => enemie.draw(ctx));
}

grille.setCanvasTaille(canvas);

setInterval(gameLoop, 1000 / 75);
