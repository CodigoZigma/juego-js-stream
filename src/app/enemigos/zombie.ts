import { ManejadorEntrada } from "../inputHanlder";
import { Juego } from "../juego";
import { ObjetoJuego, TObjetoJuegoSprite } from "../objetoJuego";

export class Zombie extends ObjetoJuego {
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
      80,
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
    this.y = juego.alto - this.alto - juego.alturaPiso;
    this.x = juego.ancho;
    this.velocidadX = Math.random() * 4 + 1;
    this.modificadorVelocidad = Math.floor(Math.random() * 3 + 1);
  }

  crearEstados() {
    this.estadosObjeto.crearEstado("corriendo");
  }

  actualizar(deltaTiempo?: number) {
    this.x -= this.velocidadX;
    //if (this.x <= -this.ancho) this.x = juego.ancho;
    if (this.x <= -this.ancho) this.borrar = true;
    super.actualizar();
  }
}
