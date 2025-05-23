import MouvementDirection from "./MouvementDirection.js";

export default class Chimiste {
  constructor(x, y, tailleGrille, rapiditer, grille) {
    this.x = x;
    this.y = y;
    this.tailleGrille = tailleGrille;
    this.rapiditer = rapiditer;
    this.grille = grille;
    this.mouvementDirectionActuelle = null;
    this.requeteDirectionMouvement = null;

    this.premierMouvement = false;
    document.addEventListener("keydown", this.#keydown);
    let controlButtons = document.getElementsByClassName('controlButton');
    for (let button of controlButtons) {
      button.onclick = this.#buttonclick;
    }
    this.#ChargeImageChimiste();
  }

  draw(ctx, pause) {
    if (!pause) {
      this.#mouvement();
    }
    ctx.drawImage(
      this.packChimisteImage[this.packChimisteImageIndex],
      this.x,
      this.y,
      this.tailleGrille,
      this.tailleGrille
    );
  }
  #ChargeImageChimiste() {
    const chimisteImage1 = new Image();
    chimisteImage1.src = "../images/personnage2.png";
    // le reste des images
    this.packChimisteImage = [chimisteImage1];

    this.packChimisteImageIndex = 0;
  }

  #keydown = (event) => {
    // up
    if (event.keyCode == 38) {
      if (this.mouvementDirectionActuelle == MouvementDirection.down)
        this.mouvementDirectionActuelle = MouvementDirection.up;
      this.requeteDirectionMouvement = MouvementDirection.up;
      this.premierMouvement = true;
    }
    // down
    if (event.keyCode == 40) {
      if (this.mouvementDirectionActuelle == MouvementDirection.up)
        this.mouvementDirectionActuelle = MouvementDirection.down;
      this.requeteDirectionMouvement = MouvementDirection.down;
      this.premierMouvement = true;
    }
    // left
    if (event.keyCode == 37) {
      if (this.mouvementDirectionActuelle == MouvementDirection.right)
        this.mouvementDirectionActuelle = MouvementDirection.left;
      this.requeteDirectionMouvement = MouvementDirection.left;
      this.premierMouvement = true;
    }
    // right
    if (event.keyCode == 39) {
      if (this.mouvementDirectionActuelle == MouvementDirection.left)
        this.mouvementDirectionActuelle = MouvementDirection.right;
      this.requeteDirectionMouvement = MouvementDirection.right;
      this.premierMouvement = true;
    }
  };

  #buttonclick = (event) => {
    let button = event.target;
    // up
    if (button.id === "up") {
      if (this.mouvementDirectionActuelle == MouvementDirection.down)
        this.mouvementDirectionActuelle = MouvementDirection.up;
      this.requeteDirectionMouvement = MouvementDirection.up;
      this.premierMouvement = true;
    }
    // down
    if (button.id === "down") {
      if (this.mouvementDirectionActuelle == MouvementDirection.up)
        this.mouvementDirectionActuelle = MouvementDirection.down;
      this.requeteDirectionMouvement = MouvementDirection.down;
      this.premierMouvement = true;
    }
    // left
    if (button.id === "left") {
      if (this.mouvementDirectionActuelle == MouvementDirection.right)
        this.mouvementDirectionActuelle = MouvementDirection.left;
      this.requeteDirectionMouvement = MouvementDirection.left;
      this.premierMouvement = true;
    }
    // right
    if (button.id === "right") {
      if (this.mouvementDirectionActuelle == MouvementDirection.left)
        this.mouvementDirectionActuelle = MouvementDirection.right;
      this.requeteDirectionMouvement = MouvementDirection.right;
      this.premierMouvement = true;
    }
  };

  getPositionChimiste() {
    return [this.y / this.tailleGrille, this.x / this.tailleGrille];
  }

  #mouvement() {
    const posChimiste = this.getPositionChimiste();
    if (this.mouvementDirectionActuelle !== this.requeteDirectionMouvement) {
      if (
        Number.isInteger(posChimiste[0]) &&
        Number.isInteger(posChimiste[1])
      ) {
        if (
          !this.grille.CollisionEnvironnement(
            this.x,
            this.y,
            this.requeteDirectionMouvement
          )
        )
          this.mouvementDirectionActuelle = this.requeteDirectionMouvement;
      }
    }
    if (
      this.grille.CollisionEnvironnement(
        this.x,
        this.y,
        this.mouvementDirectionActuelle
      )
    ) {
      return;
    }
    switch (this.mouvementDirectionActuelle) {
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
