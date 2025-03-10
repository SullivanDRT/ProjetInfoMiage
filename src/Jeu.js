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
let temperature = grille.creerAleatoireTemperature();
let joueUneFoisStp = false;
let gameOver = false;
let gameWin = false;

let temps = 300;

let affichage = document.getElementById("affichage");

let chronoLance = false;
let chrono;

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
    setInterval(miseAJourProgressBar, 1000);
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
    afficherDefaite();
  }
}

function checkWin() {
  if (temps == 0) {
    gameWin = true;
    afficherVictoire();
  }
}

function checkItems() {
    if (temperature.CollisionAvecChimiste(chimsite)) {
      temperature = null;
      if (pourcentage < 30) {
        console.log(pourcentage - temps.points);
        pourcentage = 0;
      } else {
        pourcentage -= temp.points;
      }
      return false;
    }
    return true;
  };

function estPerdu() {
  return (
    enemies.some((enemie) => enemie.CollisionAvecChimiste(chimsite)) ||
    pourcentage == 100
  );
}

function decremente() {
  temps--;
  affichage.innerHTML = temps;
}

function miseAJourProgressBar() {
  pourcentage++;
  progressBar.style.height = `${pourcentage}%`;
  progressBar.setAttribute(`aria-valuenow`, pourcentage);
}

function checkReapparitionTemp(){
  if(temperature === null){
    temperature = grille.creerAleatoireTemperature();
  }
}
