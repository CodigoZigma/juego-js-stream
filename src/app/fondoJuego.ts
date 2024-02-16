import { Juego } from "./juego";
import { ObjetoJuego, TObjetoJuegoSprite } from "./objetoJuego";

export class FondoJuego extends ObjetoJuego {
  constructor(
    juego: Juego,
    x: number,
    y: number,
    imagen: string,
    anchoSprite: number,
    altoSprite: number,
    margenSprite: number,
    sprites: TObjetoJuegoSprite,
    velocidad: number
  ) {
    super(
      juego,
      x,
      y,
      0,
      imagen,
      anchoSprite,
      altoSprite,
      0,
      margenSprite,
      0,
      9,
      sprites
    );
    this.modificadorVelocidad = velocidad;
  }
  actualizar() {
    this.velocidadX =
      this.modificadorVelocidad * this.juego.parametrosJuego.velocidadJuego;
    //Metodo #1
    if (this.x <= -this.ancho) this.x = 0;
    else this.x -= this.velocidadX;
    //Metodo #2
    // this.x = (this.velocidadX * -1 * framesJuego) % this.ancho;
  }

  dibujar(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.imagen as CanvasImageSource,
      this.x,
      this.y,
      this.ancho,
      this.alto
    );
    ctx.drawImage(
      this.imagen as CanvasImageSource,
      this.x + this.ancho,
      this.y,
      this.ancho,
      this.alto
    );
  }
}
