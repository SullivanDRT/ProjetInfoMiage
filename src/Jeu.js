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
if(mobilecheck()){
  document.getElementsByClassName('controlButtons')[0].style.display = 'flex';
  canvas.style.height = "500px";
  canvas.style.width = "auto";
}

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
      document.getElementById("viscosite").style.display = "block";
      rapiditerBarre = Moyen.rapiditerBarre;
      break;
    case "difficile":
      temps = Difficile.temps;
      rapiditer = Difficile.rapiditer;
      rapiditerEnemie = Difficile.rapiditerEnemie;
      map = Difficile.map;
      document.getElementById("viscosite").style.display = "block";
      rapiditerBarre = Difficile.rapiditerBarre;
      break;
  }
}

const grille = new Grille(tailleGrille, map);
const chimsite = grille.getChimiste(rapiditer);
const enemies = grille.getEnemies(rapiditerEnemie);
const gameOverSong = new Audio("../songs/gameOver.mp3");
let temperature = grille.creerAleatoireTemperature();
let viscosite = grille.creerAleatoireViscosite();

let joueUneFoisStp = false;
let gameOver = false;
let gameWin = false;

let affichage = document.getElementById("affichage");

let chronoLance = false;
let chrono;
let temperatureBar
let ViscositeBar

let progressBarTemp = document.getElementById("progressBarTemp");
let progressBarViscosite = document.getElementById("progressBarViscosite");
let pourcentageTemp = 0;
let pourcentageVisc = 0;

function gameLoop() {
  grille.draw(ctx);
  chimsite.draw(ctx, pause());
  enemies.forEach((enemie) => enemie.draw(ctx, pause()));
  temperature.draw(ctx);
  if(niveau === "moyen" || niveau === "difficile") {
    viscosite.draw(ctx);
  }
  if (!chronoLance && chimsite.premierMouvement) {
    chronoLance = true;
    chrono = setInterval(decremente, 1000);
    temperatureBar = setInterval(miseAJourProgressBarTemp, 1000);
    if(niveau === "moyen" || niveau === "difficile") {
      ViscositeBar = setInterval(miseAJourProgressBarVisc, 500);
    }
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
    if(niveau === "moyen" || niveau === "difficile") {
    clearInterval(ViscositeBar);
    }
    afficherDefaite();
  }
}

function checkWin() {
  if (temps == 0) {
    gameWin = true;
    clearInterval(chrono);
    clearInterval(temperatureBar);
    if(niveau === "moyen" || niveau === "difficile") {
      clearInterval(ViscositeBar);
    }
    afficherVictoire();
  }
}

function checkItems() {
  if (temperature.CollisionAvecChimiste(chimsite)) {
    temperature = grille.creerAleatoireTemperature();
    if (pourcentageTemp < 30) {
      pourcentageTemp = 0;
    } else {
      pourcentageTemp -= 30;
    }
  }
  if(niveau === "moyen" || niveau === "difficile") {
    if (viscosite.CollisionAvecChimiste(chimsite)) {
      viscosite = grille.creerAleatoireViscosite();
      if (pourcentageTemp < 30) {
        pourcentageVisc = 0;
      } else {
        pourcentageVisc -= 30;
      }
    }

  }

}

function estPerdu() {
  return (
    enemies.some((enemie) => enemie.CollisionAvecChimiste(chimsite)) ||
    pourcentageTemp >= 100 ||
    pourcentageVisc >= 100
  );
}

function decremente() {
  temps--;
  affichage.innerHTML = temps;
}

function miseAJourProgressBarTemp() {
  pourcentageTemp += rapiditerBarre;
  progressBarTemp.style.height = `${pourcentageTemp}%`;
  progressBarTemp.setAttribute(`aria-valuenow`, pourcentageTemp);
  
}

function miseAJourProgressBarVisc() {
  pourcentageVisc += rapiditerBarre;
  progressBarViscosite.style.height = `${pourcentageVisc}%`;
  progressBarViscosite.setAttribute(`aria-valuenow`, pourcentageVisc);
  
}

function checkReapparitionTemp() {
  if (temperature === null) {
    temperature = grille.creerAleatoireTemperature();
  }
}


function mobilecheck() {
  return document.getElementsByTagName('html')[0].clientHeight < 900 || document.getElementsByTagName('html')[0].clientWidth < 900;
};