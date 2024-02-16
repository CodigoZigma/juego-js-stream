import { Juego } from "../juego";
import { ObjetoJuego, TObjetoJuegoSprite } from "../objetoJuego";

export class Ruedita extends ObjetoJuego {
  nuevax: number = 0;
  nuevay: number = 0;
  intervalo: number = 0;

  constructor(
    juego: Juego,
    imagen: string,
    anchoSprite: number,
    altoSprite: number,
    proporcion: number,
    margenSprite: number,
    sprites: TObjetoJuegoSprite,
    estadoActual: string
  ) {
    super(
      juego,
      0,
      0,
      30,
      imagen,
      anchoSprite,
      altoSprite,
      proporcion,
      margenSprite,
      0,
      0,
      sprites,
      estadoActual
    );
    this.y = Math.random() * (juego.alto - this.alto);
    this.x = Math.random() * (juego.ancho - this.ancho);
    this.nuevay = Math.random() * juego.alto;
    this.nuevax = Math.random() * juego.ancho;
    this.modificadorVelocidad = Math.floor(Math.random() * 3 + 1);
    this.intervalo = Math.floor(Math.random() * 200 + 50);
  }

  crearEstados() {
    this.estadosObjeto.crearEstado("volando");
  }

  actualizar(deltaTiempo?: number) {
    if (this.juego.contaFrames % this.intervalo == 0) {
      this.nuevay = Math.random() * (this.juego.alto - this.alto);
      this.nuevax = Math.random() * (this.juego.ancho - this.ancho);
    }
    this.dx = this.x - this.nuevax;
    this.dy = this.y - this.nuevay;
    this.x -= this.dx / 70;
    this.y -= this.dy / 70;
    super.actualizar();
  }
}
