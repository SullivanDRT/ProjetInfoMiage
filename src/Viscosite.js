export default class Viscosite {
  constructor(x, y, tailleGrille, grilleMap) {
    this.x = x;
    this.y = y;
    this.tailleGrille = tailleGrille;
    this.grilleMap = grilleMap;
    this.image = new Image();
    this.image.src = "../images/rayon-de-miel.png";
    this.points = 30;
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
  CollisionAvecChimiste(chimsite) {
    const taille = this.tailleGrille / 2;
    if (
      this.x < chimsite.x + taille &&
      this.x + taille > chimsite.x &&
      this.y < chimsite.y + taille &&
      this.y + taille > chimsite.y
    ) {
      return true;
    }
    return false;
  }
}
