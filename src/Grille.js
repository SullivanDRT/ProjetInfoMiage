import Chimiste from "./Chimiste.js";
import Enemie from "./Enemies.js";
import MouvementDirection from "./MouvementDirection.js";

export default class Grille {
  constructor(tailleGrille) {
    this.tailleGrille = tailleGrille;
    this.temperature = new Image();
    this.temperature.src = "../images/temperature.png";

    this.viscosite = new Image();
    this.viscosite.src = "../images/rayon-de-miel.png";

    this.mur = new Image();
    this.mur.src = "../images/mur.png";

    this.caseVide = new Image();
    this.caseVide.src = "../images/map/color.png";
  }

  //1 mur
  //0 rien
  //2 temperature
  // 3 viscocite
  // 4 chimiste
  // 6 enemies

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 4, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 6, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]


  draw(ctx) {
    for (let ligne = 0; ligne < this.map.length; ligne++) {
      for (let colonne = 0; colonne < this.map[ligne].length; colonne++) {
        let tile = this.map[ligne][colonne];
        let definitionCase;
        if (tile === 1) {
          definitionCase = this.mur;
        }
        if (tile === 2) {
          definitionCase = this.temperature;
        }
        if (tile === 3) {
          definitionCase = this.viscosite;
        }
        if (tile === 0) {
          definitionCase = this.caseVide;
        }
        this.#dessinerCase(
          ctx,
          colonne,
          ligne,
          this.tailleGrille,
          definitionCase
        );
      }
    }
  }
  #dessinerCase(ctx, colonne, ligne, tailleGrille, definitionCase) {
    ctx.drawImage(
      definitionCase,
      colonne * this.tailleGrille,
      ligne * this.tailleGrille,
      tailleGrille,
      tailleGrille
    );
  }

  setCanvasTaille(canvas) {
    canvas.width = this.map[0].length * this.tailleGrille;
    canvas.height = this.map.length * this.tailleGrille;
  }
  getChimiste(rapiditer) {
    for (let ligne = 0; ligne < this.map.length; ligne++) {
      for (let colonne = 0; colonne < this.map[ligne].length; colonne++) {
        let tile = this.map[ligne][colonne];
        if (tile === 4) {
          this.map[ligne][colonne] = 0;
          return new Chimiste(
            colonne * this.tailleGrille,
            ligne * this.tailleGrille,
            this.tailleGrille,
            rapiditer,
            this
          );
        }
      }
    }
  }
  getEnemies(rapiditer){
    const enemies = [];
    for (let ligne = 0; ligne < this.map.length; ligne++) {
      for (let colonne = 0; colonne < this.map[ligne].length; colonne++) {
        let tile = this.map[ligne][colonne];
        if (tile === 6) {
          this.map[ligne][colonne] = 0;
          enemies.push(new Enemie(
            colonne * this.tailleGrille,
            ligne * this.tailleGrille,
            this.tailleGrille,
            rapiditer,
            this
          ));
        }
      }
    }
    return enemies;

  }
  CollisionEnvironnement(x, y, direction) {
    if (
      Number.isInteger(x / this.tailleGrille) &&
      Number.isInteger(y / this.tailleGrille)
    ) {
      let ligne = 0;
      let colonne = 0;
      let prochaineLigne = 0;
      let prochaineColonne = 0;
      switch (direction) {
        case MouvementDirection.right:
          prochaineColonne = x + this.tailleGrille;
          colonne = prochaineColonne / this.tailleGrille;
          ligne = y / this.tailleGrille;
          break;
        case MouvementDirection.left:
          prochaineColonne = x - this.tailleGrille;
          colonne = prochaineColonne / this.tailleGrille;
          ligne = y / this.tailleGrille;
          break;
        case MouvementDirection.up:
          prochaineLigne = y - this.tailleGrille;
          ligne = prochaineLigne / this.tailleGrille;
          colonne = x / this.tailleGrille;
          break;
        case MouvementDirection.down:
          prochaineLigne = y + this.tailleGrille;
          ligne = prochaineLigne / this.tailleGrille;
          colonne = x / this.tailleGrille;
          break;
      }
      const tile = this.map[ligne][colonne];
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }

}
