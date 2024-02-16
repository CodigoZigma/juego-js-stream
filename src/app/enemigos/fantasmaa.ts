import { Juego } from "../juego";
import { ObjetoJuego, TObjetoJuegoSprite } from "../objetoJuego";

export class Fantasmaa extends ObjetoJuego {
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
    // this.y = Math.random() * (juego.alto - this.alto);
    // this.x = Math.random() * (juego.ancho - this.ancho);
    this.velocidadX = Math.random() * 4 + 1;
    this.modificadorVelocidad = Math.floor(Math.random() * 3 + 1);
    this.angulo = 0;
    this.velocidadAngulo = Math.random() * 0.5 + 0.5;
    this.curvatura = Math.random() * 200 + 50;
  }

  crearEstados() {
    this.estadosObjeto.crearEstado("volando");
  }

  actualizar(deltaTiempo?: number) {
    this.x =
      (this.juego.ancho * 0.5 - this.ancho * 0.5) *
        Math.sin((this.angulo * Math.PI) / 90) +
      this.juego.ancho * 0.5 -
      this.ancho * 0.5;
    this.y =
      (this.juego.alto * 0.5 - this.alto * 0.5) *
        Math.cos((this.angulo * Math.PI) / 270) +
      this.juego.alto * 0.5 -
      this.alto * 0.5;
    this.angulo += this.velocidadAngulo;
    if (this.x + this.ancho < 0) this.x = this.juego.ancho;
    super.actualizar();
  }
}
