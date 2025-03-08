export default class Enemie {
  constructor(x, y, tailleGrille, velociter, grille) {
    this.x = x;
    this.y = y;
    this.tailleGrille = tailleGrille;
    this.velociter = velociter;
    this.grille = grille;

    this.image = new Image();
    this.image.src = "../images/enemie1.png";
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.tailleGrille,
      this.tailleGrille
    );
  }
}
