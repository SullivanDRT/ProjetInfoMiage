const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function gameLoop() {
  console.log("test");
}

setInterval(gameLoop, 1000 / 75);
