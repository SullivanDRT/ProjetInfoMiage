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
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

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
        if(tile === 3){
          definitionCase = this.viscosite;
        }
        if(tile === 0){
          definitionCase = this.caseVide;
        }
        this.#dessinerCase(ctx, colonne, ligne, this.tailleGrille, definitionCase);
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
}
