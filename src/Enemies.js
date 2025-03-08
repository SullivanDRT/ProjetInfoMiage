import MouvementDirection from "./MouvementDirection.js";

export default class Enemie {
  constructor(x, y, tailleGrille, rapiditer, grilleMap) {
    this.x = x;
    this.y = y;
    this.tailleGrille = tailleGrille;
    this.rapiditer = rapiditer;
    this.grilleMap = grilleMap;
    this.image = new Image();
    this.image.src = "../images/enemie1.png";
    this.mouvementDirection = Math.floor(
      Math.random() * Object.keys(MouvementDirection).length
    );
    this.directionTempsParDefaut = this.#random(15, 50);
    this.directionTemps = this.directionTempsParDefaut;
  }
  draw(ctx, pause) {
    if (!pause) {
      this.#move();
      this.#changeDirection();
      console.log("Données", this.x, this.y);
    }
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.tailleGrille,
      this.tailleGrille
    );
  }
  CollisionAvecChimiste(chimsite) {
    const taille = this.tailleGrille / 2;
    if (
      this.x < chimsite.x + taille &&
      this.x + taille> chimsite.x &&
      this.y < chimsite.y + taille &&
      this.y + taille > chimsite.y
    ) {
      return true;
    }
    return false;
  }
  #move() {
    if (
      !this.grilleMap.CollisionEnvironnement(
        this.x,
        this.y,
        this.mouvementDirection
      )
    ) {
      switch (this.mouvementDirection) {
        case MouvementDirection.up:
          this.y -= this.rapiditer;
          break;
        case MouvementDirection.down:
          this.y += this.rapiditer;
          break;
        case MouvementDirection.left:
          this.x -= this.rapiditer;
          break;
        case MouvementDirection.right:
          this.x += this.rapiditer;
          break;
      }
    }
  }
  #changeDirection() {
    this.directionTemps--;
    let nouvelleDirection = null;
    if (this.directionTemps == 0) {
      this.directionTemps = this.directionTempsParDefaut;
      nouvelleDirection = Math.floor(
        Math.random() * Object.keys(MouvementDirection).length
      );
    }

    if (
      nouvelleDirection != null &&
      this.mouvementDirection != nouvelleDirection
    ) {
      if (
        Number.isInteger(this.x / this.tailleGrille) &&
        Number.isInteger(this.y / this.tailleGrille)
      ) {
        if (
          !this.grilleMap.CollisionEnvironnement(
            this.x,
            this.y,
            nouvelleDirection
          )
        ) {
          this.mouvementDirection = nouvelleDirection;
        }
      }
    }
  }
  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
