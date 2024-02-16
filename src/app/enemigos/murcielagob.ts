import { Juego } from "../juego";
import { ObjetoJuego, TObjetoJuegoSprite } from "../objetoJuego";

export class Murcielagob extends ObjetoJuego {
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
    //this.x = Math.random() * (juego.ancho - this.ancho);
    this.x = juego.ancho;
    this.velocidadX = Math.random() * 4 + 1;
    this.modificadorVelocidad = Math.floor(Math.random() * 3 + 1);
    this.angulo = Math.random() * 2;
    this.velocidadAngulo = Math.random() * 0.2;
    this.curvatura = Math.random() * 5;
  }

  crearEstados() {
    this.estadosObjeto.crearEstado("volando");
  }

  actualizar(deltaTiempo?: number) {
    this.x -= this.velocidadX;
    //if (this.x + this.ancho < 0) this.x = juego.ancho;
    if (this.x + this.ancho < 0) this.borrar = true;
    this.y += this.curvatura * Math.sin(this.angulo);
    this.angulo += this.velocidadAngulo;
    super.actualizar();
  }
}
