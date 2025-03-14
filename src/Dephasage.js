import MouvementDirection from "./MouvementDirection.js";
import * as PlusCourtChemin from "./PlusCourtChemin.js";
export default class Dephasage {
  constructor(x, y, tailleGrille, rapiditer, grilleMap) {
    this.x = x;
    this.y = y;
    this.tailleGrille = tailleGrille;
    this.rapiditer = rapiditer;
    this.grilleMap = grilleMap;
    this.image = new Image();
    this.image.src = "../images/ennemie2.png";
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

  getnbCaseCouloirAdjacente(){
    let nbCaseCouloirAdjacente = 0;
    for ( let direction of Object.values(MouvementDirection)) {
        if (!this.grilleMap.CollisionEnvironnement(
          this.x,
          this.y,
          direction
        )) {
          nbCaseCouloirAdjacente ++;
        }
    }
    return nbCaseCouloirAdjacente;
  }

  getDirectionVersChimiste(positionArrive) {
    // creation de la matrice innondation
    let liste = [positionArrive];
    let positionDepart = [this.y / this.tailleGrille, this.x / this.tailleGrille];
    let calque = PlusCourtChemin.creationCalque(this.grilleMap.map, positionArrive);
    if (calque[positionArrive[0]][positionArrive[1]] === -1){
      return [];
    }
    while (positionArrive !== positionDepart) {
      let posMini = positionArrive;
      let voisins = PlusCourtChemin.getVoisins(calque, positionArrive[0], positionArrive[1]);
      for (let voisin of voisins) {
        if (calque[voisin[0]][voisin[1]] + 1 == calque[voisin[0]][voisin[1]]){
          posMini = voisin;
        }
        liste.push(posMini);
        positionArrive = posMini;
    
      }
    liste.pop();
    let destination = liste[0];
    if (destination[0] < positionDepart[0]) {
      return 0;
    }
    if (destination[0] > positionDepart[0]) {
      return 1;
    }
    if (destination[1] < positionDepart[1]) {
      return 2;
    }
    if (destination[1] > positionDepart[1]) {
      return 3;
    }
    
    
    } 
  }

  #changeDirection() {
    this.directionTemps--;
    if(
      Number.isInteger(this.x / this.tailleGrille) &&
      Number.isInteger(this.y / this.tailleGrille)
    ) {
        if(
          this.getnbCaseCouloirAdjacente() >= 3 ||
           this.grilleMap.CollisionEnvironnement(this.x, this.y, this.mouvementDirection) 
          ) {
            let posChimiste = this.grilleMap.getChimiste(2).getPositionChimiste();
            if(
              !(Number.isInteger(posChimiste) &&
              Number.isInteger(posChimiste))
            ) {
                posChimiste[0] = parseInt(posChimiste[0]);
                posChimiste[1] = parseInt(posChimiste[1]);
            }

            this.mouvementDirection = this.getDirectionVersChimiste(posChimiste);
          }
    }
  }

  #random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
