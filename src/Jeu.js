import Grille from "./Grille.js";
import { Facile, Moyen, Difficile } from "./Niveau.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tailleGrille = 50;
let rapiditer = 2;
let rapiditerEnemie = 1;
let temps = 0;
let map = [];
let rapiditerBarre;

const niveau = localStorage.getItem("difficulter");
setNiveau(niveau);

function setNiveau(niveau) {
  switch (niveau) {
    case "facile":
      temps = Facile.temps;
      rapiditer = Facile.rapiditer;
      rapiditerEnemie = Facile.rapiditerEnemie;
      map = Facile.map;
      rapiditerBarre = Facile.rapiditerBarre;
      break;
    case "moyen":
      temps = Moyen.temps;
      rapiditer = Moyen.rapiditer;
      rapiditerEnemie = Moyen.rapiditerEnemie;
      map = Moyen.map;
      rapiditerBarre = Moyen.rapiditerBarre;
      break;
    case "difficile":
      temps = Difficile.temps;
      rapiditer = Difficile.rapiditer;
      rapiditerEnemie = Difficile.rapiditerEnemie;
      map = Difficile.map;
      rapiditerBarre = Difficile.rapiditerBarre;
      break;
  }
}

const grille = new Grille(tailleGrille, map);
const chimsite = grille.getChimiste(rapiditer);
const enemies = grille.getEnemies(rapiditerEnemie);
const gameOverSong = new Audio("../songs/gameOver.mp3");
let temperature = grille.creerAleatoireTemperature();
let joueUneFoisStp = false;
let gameOver = false;
let gameWin = false;

let affichage = document.getElementById("affichage");

let chronoLance = false;
let chrono;
let temperatureBar

let progressBar = document.getElementById("progressBar");
let pourcentage = 0;

function gameLoop() {
  grille.draw(ctx);
  chimsite.draw(ctx, pause());
  enemies.forEach((enemie) => enemie.draw(ctx, pause()));
  temperature.draw(ctx);
  if (!chronoLance && chimsite.premierMouvement) {
    chronoLance = true;
    chrono = setInterval(decremente, 1000);
    temperatureBar = setInterval(miseAJourProgressBar, 1000);
  }
  checkItems();
  checkReapparitionTemp();
  checkGameOver();
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
    clearInterval(chrono);
    clearInterval(temperatureBar);
    afficherDefaite();
  }
}

function checkWin() {
  if (temps == 0) {
    gameWin = true;
    clearInterval(chrono);
    clearInterval(temperatureBar);
    afficherVictoire();
  }
}

function checkItems() {
  if (temperature.CollisionAvecChimiste(chimsite)) {
    temperature = grille.creerAleatoireTemperature();
    if (pourcentage < 30) {
      console.log(pourcentage - temps.points);
      pourcentage = 0;
    } else {
      pourcentage -= 30;
    }
  }
}

function estPerdu() {
  return (
    enemies.some((enemie) => enemie.CollisionAvecChimiste(chimsite)) ||
    pourcentage >= 100
  );
}

function decremente() {
  temps--;
  affichage.innerHTML = temps;
}

function miseAJourProgressBar() {
  pourcentage += rapiditerBarre;
  progressBar.style.height = `${pourcentage}%`;
  progressBar.setAttribute(`aria-valuenow`, pourcentage);
}

function checkReapparitionTemp() {
  if (temperature === null) {
    temperature = grille.creerAleatoireTemperature();
  }
}
