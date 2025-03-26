import Chimiste from "./Chimiste.js";
import ChangementCouleur from "./ChangementCouleur.js";
import Dephasage from "./Dephasage.js";
import MouvementDirection from "./MouvementDirection.js";
import Temperature from "./Temperature.js";
import Viscosite from "./Viscosite.js";

export default class Grille {
  constructor(tailleGrille, map) {
    this.map = map;
    this.tailleGrille = tailleGrille;
    this.temperature = new Image();
    this.temperature.src = "../images/logoTemperature.png";

    this.viscosite = new Image();
    this.viscosite.src = "../images/rayon-de-miel.png";

    this.mur = new Image();
    this.mur.src = "../images/mur2.png";

    this.caseVide = new Image();
    this.caseVide.src = "../images/case2.png";

    this.chimiste = null;
  }

  //1 mur
  //0 rien
  //2 temperature
  // 3 viscocite
  // 4 chimiste
  // 6 enemies

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
    if (this.chimiste === null) {
      for (let ligne = 0; ligne < this.map.length; ligne++) {
        for (let colonne = 0; colonne < this.map[ligne].length; colonne++) {
          let tile = this.map[ligne][colonne];
          if (tile === 4) {
            this.map[ligne][colonne] = 0;
            this.chimiste = new Chimiste(
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
    return this.chimiste;
  }
  getEnemies(rapiditer) {
    const enemies = [];
    for (let ligne = 0; ligne < this.map.length; ligne++) {
      for (let colonne = 0; colonne < this.map[ligne].length; colonne++) {
        let tile = this.map[ligne][colonne];
        if (tile === 6) {
          this.map[ligne][colonne] = 0;
          enemies.push(new ChangementCouleur(
            colonne * this.tailleGrille,
            ligne * this.tailleGrille,
            this.tailleGrille,
            rapiditer,
            this
          ));
        }
        if (tile === 7) {
          this.map[ligne][colonne] = 0;
          enemies.push(new Dephasage(
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
  getTemperature() {
    const temperature = [];
    for (let ligne = 0; ligne < this.map.length; ligne++) {
      for (let colonne = 0; colonne < this.map[ligne].length; colonne++) {
        let tile = this.map[ligne][colonne];
        if (tile === 2) {
          this.map[ligne][colonne] = 0;
          temperature.push(
            new Temperature(
              colonne * this.tailleGrille,
              ligne * this.tailleGrille,
              this.tailleGrille,
              this
            )
          );
        }
      }
    }
  }
  creerAleatoireTemperature() {
    let temperature;
    let position = this.tirerCaseAleatoire();
    temperature = new Temperature(
      position[0] * this.tailleGrille,
      position[1] * this.tailleGrille,
      this.tailleGrille,
      this
    );
    return temperature;
  }
  creerAleatoireViscosite() {
    let viscosite;
    let position = this.tirerCaseAleatoire();
    viscosite = new Viscosite(
      position[0] * this.tailleGrille,
      position[1] * this.tailleGrille,
      this.tailleGrille,
      this
    );
    return viscosite;
  }
  tirerCaseAleatoire() {
    let aleatoireX = Math.floor(Math.random() * this.map.length);
    let aleatoireY = Math.floor(Math.random() * this.map[aleatoireX].length);


    let tile = this.map[aleatoireX][aleatoireY];

    if (tile === 0) {
      return [aleatoireY, aleatoireX];
    } else {
      return this.tirerCaseAleatoire();
    }
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
