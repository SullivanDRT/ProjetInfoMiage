import Grille from "./Grille.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tailleGrille = 50;
const rapiditer = 2;
const rapiditerEnemie = 2;
const grille = new Grille(tailleGrille);
const chimsite = grille.getChimiste(rapiditer);
const enemies = grille.getEnemies(rapiditerEnemie);

const gameOverSong = new Audio("../songs/gameOver.mp3");
let joueUneFoisStp = false;
let gameOver = false;
let gameWin = false;

let temps = 300;

let affichage = document.getElementById("affichage");

let chronoLance = false;
let chrono;

function gameLoop() {
  grille.draw(ctx);
  chimsite.draw(ctx, pause());
  enemies.forEach((enemie) => enemie.draw(ctx, pause()));
  if (checkGameOver()) {
    return;
  }
  if (!chronoLance && chimsite.premierMouvement) {
    chronoLance = true;
    chrono = setInterval(decremente, 1000);
  }
  checkWin();
}

grille.setCanvasTaille(canvas);

setInterval(gameLoop, 1000 / 75);

function pause() {
  return !chimsite.premierMouvement || gameOver || gameWin;
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = estPerdu();
  }
  if (gameOver) {
    if (!joueUneFoisStp) {
      joueUneFoisStp = true;
      gameOverSong.play();
    }
    afficherDefaite();
  }
}

function checkWin() {
  if (temps == 0) {
    gameWin = true;
    afficherVictoire();
  }
}

function estPerdu() {
  return enemies.some((enemie) => enemie.CollisionAvecChimiste(chimsite));
}

function decremente() {
  temps--;
  affichage.innerHTML = temps;
}
