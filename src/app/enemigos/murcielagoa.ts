import { Juego } from "../juego";
import { ObjetoJuego, TObjetoJuegoSprite } from "../objetoJuego";

export class Murcielagoa extends ObjetoJuego {
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
    this.velocidadX = Math.random() * 4 + 1;
    this.modificadorVelocidad = Math.floor(Math.random() * 3 + 1);
  }

  crearEstados() {
    this.estadosObjeto.crearEstado("volando");
  }
  actualizar(deltaTiempo?: number) {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    super.actualizar();
  }
}
